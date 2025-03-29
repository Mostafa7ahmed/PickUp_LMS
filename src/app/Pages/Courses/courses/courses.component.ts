import { Component, ElementRef, HostListener, inject, Input, OnInit, Output, viewChild, ViewChild } from '@angular/core';
import { CourseResult } from '../Core/interface/icourses';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TableCoursesComponent } from "../Components/table-courses/table-courses.component";
import { WidgetCoursesComponent } from '../Components/widget-courses/widget-courses.component';
import { TopiclistService } from '../../topic/Core/Service/topiclist.service';
import { ITopiclist } from '../Core/interface/itopiclist';
import { PaginateCoursesService } from '../Core/service/paginate-courses.service';
import { IPaginationResponse, IResponseOf } from '../../../Core/Shared/Interface/irespose';
import { CardkanbanStageComponent } from '../Components/cardkanban-stage/cardkanban-stage.component';
import { KanbanService } from '../Core/service/kanban.service';

import { ICourseKanban, IKanbanResponse, ITopicKanbaResult } from '../Core/interface/ikanban-response';
import { MovecourseService } from '../Core/service/movecourse.service';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { CustomslectwithiconComponent } from '../Components/customslectwithicon/customslectwithicon.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ItopicList, Stage } from '../../Topics/Core/Interface/itopic-list-result';
import { CoustomSelectStageComponent } from "../Components/coustom-select-stage/coustom-select-stage.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, NzSelectModule, ButtonModule, FormsModule, DatePicker, CardkanbanStageComponent, TabsModule, MatTooltipModule, NgxEchartsModule, WidgetCoursesComponent, TableCoursesComponent, CustomslectwithiconComponent, CoustomSelectStageComponent],
  providers: [
    { provide: NGX_ECHARTS_CONFIG, useValue: { echarts } }

  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss', '../../../../app/Core/Shared/CSS/horizontal-scrolling.scss']

})
export class CoursesComponent implements OnInit {
  // call services
  private subscription: Subscription = new Subscription();
  private _topiclistService = inject(TopiclistService);
  private _PaginateCoursesService = inject(PaginateCoursesService);
  private _KanbanService = inject(KanbanService);
  private _MovecourseService = inject(MovecourseService);
  private router = inject(Router);
  private _ActivatedRoute = inject(ActivatedRoute);
  constructor(private eRef: ElementRef) {
    // this.router.events
    // .pipe(filter((event) => event instanceof NavigationEnd))
    // .subscribe((event: any) => {
    // if (event.url.includes('/course')) {
    //   this.getListTopics(this.topicIdFromRoute);
    //   this.getAllKanbans(this.selectedTopicId)
    // }
    // });
  }





  tableRecords: Record<string, any>[] = [];
  rangeDates: Date[] | null = null;
  convertDateRange() {
    if (this.rangeDates?.length === 2 && this.rangeDates[0] && this.rangeDates[1]) {
      const fromDate = this.formatDateToISO(this.rangeDates[0]);
      const toDate = this.formatDateToISO(this.rangeDates[1]);

      console.log("📌 Formatted From:", fromDate);
      console.log("📌 Formatted To:", toDate);
      this.fetchCourses({}, this.selectedTopicId, undefined, this.valueTable, fromDate, toDate);
    }
  }
  clearDateRange() {
    this.rangeDates = null;
    this.iselectedStage =  false
    this.fetchCourses({}, this.selectedTopicId, undefined,this.valueTable);
  }
  formatDateToISO(date: Date | null): string {
    if (!date) return '';
    return date.toISOString();
  }


  // End Call services


  //~ values
  showInfo = false;
  collapsePagination = false;
  selectedFile!: File;
  valueTable: number = 0;
  topicsList: ItopicList[] = [];
  selectedValue: ItopicList = {} as ItopicList;
  selectedStage: ItopicList = {} as ItopicList;
  selectStageDefault: any
  isOpen: boolean = false;
  isLoading: boolean = false;
  paginationCoursesResponse: IPaginationResponse<CourseResult> = {} as IPaginationResponse<CourseResult>;
  kanbanResponse: IResponseOf<IKanbanResponse> = {} as IResponseOf<IKanbanResponse>;

  selectedTopicId: number = 0;
  topicIdFromRoute: string | null = ''
  valueheader: number = 0;
iselectedStage : boolean = false;
  showLeftScroll = false;
  showRightScroll = true;
  activeTab: number = 1;


  @ViewChild(TableCoursesComponent) TableCourses!: TableCoursesComponent;
  isVisible = false;
  showModal(): void {
    this.isVisible = true;

  }
  dropdownVisible = false;
  selectStatus(status: any) {
    this.selectedStage = status;
    this.dropdownVisible = false; 
    this.iselectedStage = true;

    console.log(status)
    this.fetchCourses({}, this.selectedTopicId, status.id, this.valueTable);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  //^ Functions

  changeTab(value: number): void {
    this.valueheader = value;
    this.router.navigate(['/course', this.topicIdFromRoute, this.valueheader]);

  }
  changeInnerTab(value: number): void {
    this.valueTable = value;
    console.log(this.valueTable)


    this.fetchCourses({}, this.selectedTopicId, this.valueTable);

  }
  selectOption(option: any): void {


    this.isOpen = false;
    console.log(option.id)
    this.selectedTopicId = option.id;
    this.topicIdFromRoute = option.id;
    this.router.navigate(['/course', option.id, this.valueheader]);
    
    this.getAllKanbans(option.id)
    this.fetchCourses({}, option.id, this.valueTable);

  }
  toggShowInfo() {
    this.showInfo = !this.showInfo;
  }
  toggPagination() {
    this.collapsePagination = !this.collapsePagination;
  }

  openPopup() {
    this.router.navigate([{ outlets: { dialog: ['addcourse'] } }]);
  }

  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.dropdownVisible && this.dropdownContainer) {
      if (!this.dropdownContainer.nativeElement.contains(event.target)) {
        this.dropdownVisible = false;
        console.log('Dropdown closed'); 
      }
    }
  }

  getListTopics(topicIdFromRoute: string | null = null): void {
    this._topiclistService.getAlllits().subscribe({
      next: (topics) => {
        this.topicsList = topics.result;


        let defaultTopic = this.topicsList.find((e: ItopicList) => e.default);


        if (!defaultTopic) {
          return;
        }

        this.selectedTopicId = topicIdFromRoute ? Number(topicIdFromRoute) : defaultTopic.id;
        this.selectedValue = this.topicsList.find((e: ItopicList) => e.id === this.selectedTopicId) || {} as ItopicList;
        console.log('Selected Value:', this.selectedValue.stages);
        let defautlStage = this.selectedValue.stages.find((stage: Stage) => stage.default);
        console.log("Default Stage: ", defautlStage);
        if (!defautlStage) defautlStage = this.selectedValue.stages[0];
        this.selectStageDefault = defautlStage;

        if (topics.success) {
          this.fetchCourses({}, this.selectedTopicId);
          this.getAllKanbans(this.selectedTopicId);
        }
      }
    });
  }

  fetchCourses(eventData: { pageNumber?: number; pageSize?: number }, topicId: number, stageId?:number, courseListViewType: number = 0, from?: string,
    to?: string): void {
    const { pageNumber = 1, pageSize = 5 } = eventData;

    this.isLoading = true;
    this._PaginateCoursesService.getCourses(topicId,stageId, pageNumber, pageSize, courseListViewType, from, to).subscribe({
      next: (response) => {
        console.log(response);
        this.paginationCoursesResponse = response;
        this.tableRecords = [];

        this.paginationCoursesResponse.result.forEach((course) => {
          let courseRecord: Record<string, any> = { name: course.name, price: 1500, createdOn: new Date() };
          this.tableRecords.push(courseRecord);
        });
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.isLoading = false;
      }
    });
  }

  @ViewChild('scrollKanpan') scrollContainer!: ElementRef;
  scrollInterval: any;


  scrollTable(direction: 'left' | 'right') {
    const container = this.scrollContainer.nativeElement;
    const speed = 10;
    const step = 20;

    this.scrollInterval = setInterval(() => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if ((direction === 'right' && container.scrollLeft >= maxScrollLeft) ||
        (direction === 'left' && container.scrollLeft <= 0)) {
        this.stopScroll();
      } else {
        container.scrollLeft += direction === 'right' ? step : -step;
        this.updateScrollButtons();
      }
    }, speed);
  }

  stopScroll() {
    clearInterval(this.scrollInterval);
    this.updateScrollButtons();
  }

  updateScrollButtons() {
    const container = this.scrollContainer.nativeElement;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    this.showLeftScroll = container.scrollLeft > 0;
    this.showRightScroll = container.scrollLeft < maxScrollLeft;
  }


  @HostListener('window:resize')
  onResize() {
    this.updateScrollButtons();
  }


  getAllKanbans(topicId: number): void {

    this._KanbanService.getAllKanbans(topicId).subscribe({
      next: (response) => {
        if (response.success) {
          this.kanbanResponse = response;
          console.log("parent", this.kanbanResponse)

        }

      }
    })
  }




  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.topicIdFromRoute = params.get('topicId');
      const activeTabFromRoute = params.get('activeTab');
      if (activeTabFromRoute === '1') {
        this.valueheader = 1;
      }
      if (activeTabFromRoute === '0') {
        this.valueheader = 0;
      }

      this.getListTopics(this.topicIdFromRoute);
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.audio.pause()

  }

  print() {
    this.TableCourses.getRemainingCourses(1, 10)
  }

  handleMoveCourse(event: { course: ICourseKanban; newStageId: number }) {
    console.log('course moved', event.course, event.newStageId);
    this._MovecourseService.moveCourse(event.newStageId, event.course.courseId).subscribe({
      next: (response) => {
        if (response.success) {
          this.playSuccessSound();
          console.log("played", response)
        }
      }
    })
  }
  audio = new Audio('WhatsApp Audio 2025-03-01 at 11.08.44 PM.aac');


  playSuccessSound() {
    this.audio.play();
  }
}
