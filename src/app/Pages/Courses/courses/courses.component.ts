import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { Icourses } from '../Core/interface/icourses';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';

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
export class CoursesComponent {
  selectedValue: string = 'Select Topic';
  icons: any[] = [];
  colors: any[] = [];
  options  = [
    { id: 1, name: "Angular", category: "Frontend" },
    { id: 2, name: "TypeScript", category: "Programming Language" },
    { id: 3, name: "Supabase", category: "Backend" },
    { id: 4, name: "SCSS", category: "Styling" },
    { id: 4, name: "SCSS", category: "Styling" },

    { id: 4, name: "SCSS", category: "Styling" },

    { id: 4, name: "SCSS", category: "Styling" },

    { id: 4, name: "SCSS", category: "Styling" },

  ];

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

  displayedColumns: string[] = [
    'name', 'Updater', 'students', 'rate', 'quizzes', 'lessons', 
    'status', 'topics', 'profit', 'discount', 'createdBy'
  ];

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

  chartOptions = {

    tooltip: { trigger: 'axis' },
    grid: {
      left: '-9%',
      right: '-8%',
      top: '10%',
      bottom: '10%',
      containLabel: true
  },
  responsive: true,
    xAxis: {
      type: 'category',
      data: ['2023/Q1', '2023/Q2', '2023/Q3', '2023/Q4', 
        '2024/Q1', '2024/Q2', '2024/Q3', '2024/Q4'],
      axisLine: { show: false },
        axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        name: 'Contacts',
        type: 'line',
        data: [200, 300, 500, 400, 200,500 , 800, 100],
        smooth: true,
        showSymbol: false, 
        lineStyle: { color: '#4A90E2', width: 2 },
        areaStyle: { color: 'rgba(74, 144, 226, 0.2)' }
      }
    ]
  };

  chartInstance!: echarts.ECharts;
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;


  initChart() {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    this.chartInstance.setOption(this.chartOptions);
  }
  
  @HostListener('window:resize')
    onResizeChart() {
      if (this.chartInstance) {
        setTimeout(() => {
          this.chartInstance.resize(); 
        }, 100);
      }
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
  }

}
