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
    ,  {
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
    title: {
      text: 'Contacts Creation Rate',
      left: 'left',
      textStyle: { fontSize: 14, fontWeight: 'bold' }
    },
    tooltip: { trigger: 'axis' },
    grid: { left: '5%', right: '5%', top: '20%', bottom: '15%' }, // تعديل الهوامش لزيادة مساحة البيانات


    xAxis: {
      type: 'category',
      data: ['1/27', '1/28', '1/30', '2/3', '2/4', '2/5', '2/6', '2/7', '2/9', '2/10', '2/11', '2/12', '2/13', '2/14', '2/15', '2/16'],
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
        data: [150, 80, 60, 40, 30, 20, 10, 8, 6, 4, 3, 2, 1, 1, 1, 1],
        smooth: true,
        showSymbol: false, 
        lineStyle: { color: '#4A90E2', width: 2 },
        areaStyle: { color: 'rgba(74, 144, 226, 0.2)' }
      }
    ]
  };


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
