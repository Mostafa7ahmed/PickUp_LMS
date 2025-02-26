import { RecordableHistogram } from 'perf_hooks';
import { TableHeader } from './../Components/tablereused/tablereused.component';
import { Result } from './../../topic/Core/Interface/itopic';
import { GetWidgetsService } from './../Core/service/get-widgets.service';
import { Component, ElementRef, HostListener, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { CourseResult, Icourses } from '../Core/interface/icourses';
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
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { TablereusedComponent } from '../Components/tablereused/tablereused.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, ButtonModule, TabsModule,TablereusedComponent, MatTooltipModule, NgxEchartsModule,WidgetCoursesComponent, TableCoursesComponent],
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

  tableRecords: Record<string,any>[] = [];


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
  paginationCoursesResponse: IPaginationResponse<CourseResult>  = {} as IPaginationResponse<CourseResult> ;
  selectedTopicId: number =0;
  valueheader : number = 0;

  headers: TableHeader[] = [
    { key: 'name', label: 'Name', type: 'string' },
    { key: 'price', label: 'Price', type: 'number' },
    { key: 'createdOn', label: 'Created On', type: 'date' }
  ]

  @ViewChild( TableCoursesComponent) TableCourses!: TableCoursesComponent;

  //^ Functions
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }
  changeTab(value: number): void {
    this.valueheader = value;
  }
  changeInnerTab(value: number): void {
    this.valueTable = value;
    console.log(this.valueTable)

    
    this.fetchCourses({} , this.selectedTopicId , this.valueTable);

  }
  selectOption(option: any): void {
    this.selectedValue = option.name;

    this.isOpen = false;
    console.log(option.id)
    this.fetchCourses({},option.id , this.valueTable );

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
     let defautlTopic =  this. topicsList.filter((e:ITopiclist) =>e.default)[0];
     this.selectedValue = defautlTopic.name;
     this.selectedTopicId = defautlTopic.id;
      // Id & name 
      console.log(this.selectedTopicId)
        if (topics.success) {
          this.fetchCourses({} ,defautlTopic.id); 
        }
        console.log(this.topicsList)
      },
  
    })
  }
  fetchCourses(eventData: {  pageNumber?: number; pageSize?: number } , topicId: number , courseListViewType:number=0): void {
    const { pageNumber = 1, pageSize = 5} = eventData;
  
    this.isLoading = true;
    this._PaginateCoursesService.getCourses(topicId, pageNumber, pageSize , courseListViewType).subscribe({
      next: (response) => {
        console.log(response);
        this.paginationCoursesResponse = response;


        this.paginationCoursesResponse.result.forEach((course) => {

          let courseRecord: Record<string, any> = { name: course.name ,pice: 1500 };
          this.tableRecords.push(courseRecord);
        });
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

  print(){
    this.TableCourses.getRemainingCourses(1,10)
  }

}
