import { IwidgetResponse } from './../../../Courses/Core/interface/iwidget-response';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetWidgetsService } from '../../../Courses/Core/service/get-widgets.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-widget-coupan',
  standalone: true,
  imports: [NgxEchartsModule , TranslateModule],
  templateUrl: './widget-coupan.component.html',
  styleUrls: ['./widget-coupan.component.scss' , "../../../Courses/Components/widget-courses/widget-courses.component.scss"]
})
export class WidgetCoupanComponent  implements OnInit {
    private subscription: Subscription = new Subscription();
  
    @Input() showInfo = false;
  
      private _GetWidgetsService = inject(GetWidgetsService);
      dataWidgets: IwidgetResponse = {} as  IwidgetResponse;
  
    chartOptions :any= {
      // title: {
      //   text: 'My Chart Title',
      //   left: 'left',
      //   textStyle: { color: '#333', fontSize: 13 }
      // },
      tooltip: { 
        trigger: 'axis',
        formatter: (params: any) => ` ${params[0].value}` // يعرض فقط قيمة Y
      },
      grid: { left: '-20px', right: '-15px', top: '25%', bottom: '20%' },
      responsive: true,
      xAxis: {
        data: [] as string[], 
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { fontSize: 8, color: '#333', rotate: 0 }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: true },
        splitLine: { show: false }
      },
      series: [
        {
          type: 'line',
          data: [] as number[],
          smooth: true,
          showSymbol: false, 
          lineStyle: { color: '#4A90E2', width: 2 },
          areaStyle: { color: 'rgba(74, 144, 226, 0.2)' }
        }
      ],
      dataZoom: [
        {
          type: 'inside',  
          xAxisIndex: 0,   
          filterMode: 'none',
          minSpan: 5, 
        },
        {
          type: 'inside',
          xAxisIndex: 0,
     
          minSpan: 5, 
          zoomLock: false,
          rangeMode: ['value', 'percent'], // يجعل التحكم أفضل
        }
      ]
      
    }
  
    
    getwidgets(){
      this.subscription = this._GetWidgetsService.getWidgets().subscribe({
        next: (response) => {
          console.log("API Response:", response);
          this.dataWidgets = response.result;
    
          if (response?.result?.chart?.data) {
            const dates: string[] = Object.keys(response.result.chart.data);
          const values: number[] = Object.values(response.result.chart.data);
  
          const sortedDates = dates.sort((a, b) => a.localeCompare(b));
  
          const sortedValues = sortedDates.map(date => response.result.chart.data[date]);
  
          const formattedDates = sortedDates.map(date => {
            const [year, month] = date.split('-'); 
            return `${month}/${year}`; 
          });
  
          this.chartOptions = Object.assign({}, this.chartOptions, {
            xAxis: { ...this.chartOptions.xAxis, data: formattedDates },
            series: [{ ...this.chartOptions.series[0], data: sortedValues }]
          });
          }
        },
        error: (err) => {
          console.error("Error fetching data:", err);
        }
      });
    }
    
    ngOnInit(): void {
      this.getwidgets();
    }
  
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
