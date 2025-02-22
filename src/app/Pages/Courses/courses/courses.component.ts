import { GetWidgetsService } from './../Core/service/get-widgets.service';
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Icourses } from '../Core/interface/icourses';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';
import { IwidgetResponse } from '../Core/interface/iwidget-response';
import { Subscription } from 'rxjs';
import { StartSessionService } from '../Core/service/start-session.service';
import { UpdataCoursesService } from '../Core/service/updata-courses.service';
import { SaveService } from '../Core/service/save.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, MatTooltipModule ,NgxEchartsModule  ],
  providers:[
    { provide: NGX_ECHARTS_CONFIG, useValue: { echarts } } // 🔥 حل المشكلة هنا

  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent  implements OnInit {
  selectedValue: string = 'Select Topic';
  sessionId: string = '';

  private _GetWidgetsService = inject(GetWidgetsService);
  private _saveService = inject(SaveService);
  private _UpdataCoursesService = inject(UpdataCoursesService);
  selectedFile!: File;
  isUploading = false;
  uploadProgress = 0;
  uploadedFileLink: any | null = null;



  private subscription: Subscription = new Subscription();


  dataWidgets: IwidgetResponse = {} as  IwidgetResponse;

  options  = [
    { id: 1, name: "Angular", category: "Frontend" }];

  isOpen: boolean = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }
  selectOption(option: any): void {
    this.selectedValue = option.name;
    this.selectedFliter = option.name;
    this.isOpen = false;
    this.showFliter = false;

  }

  selectedFliter: string = 'Stage';

  showInfo = false;
  showDate = false;

  toggShowInfo() {
    this.showInfo = !this.showInfo;
  }
  toggShowDate() {
    this.showDate = !this.showDate;
  }


  showFliter = false;

  toggShowFliter() {
    this.showFliter = !this.showFliter;
  }
  collapsePagination = false;

  toggPagination() {
    this.collapsePagination = !this.collapsePagination;
  }


  courses = [
    {
      name: "OOP",
      instructor: "Ahmed  Fathy Fathy Fathy",
      students: 5841,
      rate: 4,
      quizzes: 9,
      lessons: 2,
      status: "Complete",
      topics: "IT",
      list:["m", "s" , "d", "f"],
      
      profit: "$400",
      discount: "4%",
      createdBy: "Mohamed Yasser"
    },
    {
      name: "OOP",
      instructor: "Ahmed  Fathy Fathy Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      list:["m", "s" , "d", "f"],

      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,
    {
      name: "OOP",
      instructor: "Ahmed  Fathy Fathy Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      list:["m", "s" , "d", "f"],

      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,  {
      name: "OOP",
      instructor: "Ahmed  Fathy Fathy Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      list:["m", "s" , "d", "f"],

      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,
    {
      name: "OOP",
      instructor: "Ahmed  Fathy Fathy Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,
    {
      name: "OOP",
      instructor: "Ahmed  Fathy Fathy Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,
    {
      name: "OOP",
      instructor: "Ahmed  Fathy Fathy Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,
    {
      name: "OOP",
      instructor: "Ahmed  Fathy Fathy Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,
    {
      name: "OOP",
      instructor: "Ahmed  Fathy Fathy Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,
    {
      name: "OOP",
      instructor: "Ahmed Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,
    {
      name: "OOP",
      instructor: "Ahmed Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
    ,
    {
      name: "OOP",
      instructor: "Ahmed Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    },
    {
      name: "OOP",
      instructor: "Ahmed Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    },
    {
      name: "OOP",
      instructor: "Ahmed Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    },
    {
      name: "OOP",
      instructor: "Ahmed Fathy",
      students: 5841,
      rate: 4,
      quizzes: 32,
      lessons: 32,
      status: "Working on",
      topics: "CS",
      profit: "--",
      discount: "--",
      createdBy: "Mohamed Yasser"
    }
  ];

  chartOptions :any= {
    title: {
      text: 'My Chart Title',
      left: 'left',
      textStyle: { color: '#333', fontSize: 13 }
    },
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
    ]
  }

  ngOnInit(): void {
    this.getwidgets();

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


  initializeMegaStorage() {
    this._UpdataCoursesService.initializeMega("ahmed.adel.elsayed.ali.basha@gmail.com", "!!!!Test2222")
      .then(() => console.log('Mega Storage Initialized'))
      .catch(error => console.error('Failed to initialize Mega Storage:', error));
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile() {
    this.initializeMegaStorage();

    if (!this.selectedFile) {
      alert('❌ Please select a file first.');
      return;
    }
  
    this.isUploading = true;
    this.uploadedFileLink = null;
  
    try {
      this.uploadedFileLink = await this._UpdataCoursesService.uploadFile(this.selectedFile);
      console.log(this.uploadedFileLink.nodeId + " ==> Comp");
        await Promise.all([
        this.saveStream(this.uploadedFileLink.nodeId)
      ]);
      this._UpdataCoursesService.logout();
      alert('✅ File uploaded and saved successfully!');
    } catch (error) {
      console.error('❌ Error:', error);
      alert('❌ Upload or save failed!');
    } finally {
      this.isUploading = false;
    }
  }
  saveStream(nodeId: string): void {
    this._saveService.getSave(nodeId).subscribe({
      next: (response) => {
        console.log('✅ Response:', response);
      },
      error: (error) => {
        console.error('❌ Error:', error);
      }
    });
  }
  

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  scrollInterval: any;
  showLeftScroll = false;
  showRightScroll = true;

  ngAfterViewInit() {
    this.updateScrollButtons();
  }

  scrollTable(direction: 'left' | 'right') {
    const container = this.scrollContainer.nativeElement;
    const speed = 10;
    const step = 20; 

    this.scrollInterval = setInterval(() => {
      container.scrollLeft += direction === 'right' ? step : -step;
      this.updateScrollButtons();
    }, speed);
  }

  stopScroll() {
    clearInterval(this.scrollInterval);
    this.updateScrollButtons();
  }

  updateScrollButtons() {
    const container = this.scrollContainer.nativeElement;
    this.showLeftScroll = container.scrollLeft > 0;
    this.showRightScroll = container.scrollLeft < container.scrollWidth - container.clientWidth;
  }

  @HostListener('window:resize')
  onResize() {
    this.updateScrollButtons();
  }

  ngOnDestroy() {
    clearInterval(this.scrollInterval);
    this.subscription.unsubscribe();
  }

}
