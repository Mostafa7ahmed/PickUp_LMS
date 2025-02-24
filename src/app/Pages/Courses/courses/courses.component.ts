import { GetWidgetsService } from './../Core/service/get-widgets.service';
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Icourses } from '../Core/interface/icourses';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';
import { IwidgetResponse } from '../Core/interface/iwidget-response';
import { Subscription } from 'rxjs';
import { UpdataCoursesService } from '../Core/service/updata-courses.service';
import { SaveService } from '../Core/service/save.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableCoursesComponent } from "../Components/table-courses/table-courses.component";
import { WidgetCoursesComponent } from '../Components/widget-courses/widget-courses.component';
import { TopiclistService } from '../../topic/Core/Service/topiclist.service';
import { ITopic } from '../../topic/Core/Interface/itopic';
import { ITopiclist } from '../Core/interface/itopiclist';
import { PaginateCoursesService } from '../Core/service/paginate-courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, ButtonModule, TabsModule, MatTooltipModule, NgxEchartsModule,WidgetCoursesComponent, TableCoursesComponent],
  providers:[
    { provide: NGX_ECHARTS_CONFIG, useValue: { echarts } } 

  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent  implements OnInit {
  // call services
  private subscription: Subscription = new Subscription();
  private _topiclistService = inject(TopiclistService);
  private _PaginateCoursesService = inject(PaginateCoursesService);



  // End Call services


  //~ values
  showInfo = false;
  collapsePagination = false;
  selectedValue: string = 'Select Topic';
  selectedFile!: File;
  valueTable: number = 0;
  topicsList: ITopiclist[] = [];
  isOpen: boolean = false;
  isLoading: boolean = false;
  courseList: Icourses[] = [];
  selectedTopicId: number | null = null;
  valueheader : number = 0;


  //^ Functions
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }
  changeTab(value: number): void {
    this.valueheader = value;
  }
  changeInnerTab(value: number): void {
    this.valueTable = value;
  }
  selectOption(option: any): void {
    this.selectedValue = option.name;
    this.isOpen = false;
    this.fetchCourses(option.id);

  }
  toggShowInfo() {
    this.showInfo = !this.showInfo;
  }
  toggPagination() {
    this.collapsePagination = !this.collapsePagination;
  }





  getListTopics():void{
    this._topiclistService.getAlllits().subscribe({
      next: (topics) => {
        this.topicsList = topics.result;
        if (topics.success) {
          this.selectedTopicId = this.topicsList[0].id;
          this.fetchCourses(this.selectedTopicId);
        }
        console.log(this.topicsList)
      },
  
    })
  }

  fetchCourses(topicId: number): void {
    this.isLoading = true;
    this._PaginateCoursesService.getCourses(topicId).subscribe({
      next: (response) => {
        console.log(response)
        this.courseList = response?.result;

      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.isLoading = false;
      }
    });
  }


  



 

  ngOnInit(): void {

    this.getListTopics();
 
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
