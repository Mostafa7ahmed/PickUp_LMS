import { CommonModule, DatePipe } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef, input, Input, output, Output, EventEmitter } from '@angular/core';
import { CourseResult, Icourses } from '../../Core/interface/icourses';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from '../../../../Environments/environment';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-courses',
  standalone: true,
  imports: [CommonModule  ,TranslateModule, MatTooltipModule, DatePipe ,TooltipModule, SplicTextPipe , RouterLink],
  templateUrl: './table-courses.component.html',
  styleUrls: ['./table-courses.component.scss', '../../../../../app/Core/Shared/CSS/horizontal-scrolling.scss']
})
export class TableCoursesComponent {

 pageSize: number = 5; 
 baseUrl =environment.baseUrlFiles

  @Input()paginationCoursesResponse: IPaginationResponse<CourseResult>  = {} as IPaginationResponse<CourseResult> ;
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    scrollInterval: any;
    showLeftScroll = false;
    showRightScroll = true;
    @Output() fetchCoursesEvent = new EventEmitter<{ pageNumber?: number; pageSize?: number }>();
    @Output() editCourseEvent = new EventEmitter<CourseResult>();
    @Output() deleteCourseEvent = new EventEmitter<CourseResult>();

    someMethodToEmitEvent(pageSize: number , pageNumber : number) {
      this.fetchCoursesEvent.emit({
        pageNumber: pageNumber, 
        pageSize: pageSize
      });
    } 

  

    collapsePagination = false;

    toggPagination() {
      this.collapsePagination = !this.collapsePagination;
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
  
    //  hoime > persoemn > setting up
    stopScroll() {
      clearInterval(this.scrollInterval);
      this.updateScrollButtons();
    }
  
    updateScrollButtons() {
      const container = this.scrollContainer.nativeElement;
      this.showLeftScroll = container.scrollLeft > 0;
      this.showRightScroll = container.scrollLeft < container.scrollWidth - container.clientWidth;
    }

  
   

    getRemainingCourses(pageNumber:number , pageSize:number ){
      pageNumber = pageNumber + 1;
      this.someMethodToEmitEvent(pageSize , pageNumber)
    }
    getPrevCourses(pageNumber:number , pageSize:number ){
      pageNumber = pageNumber - 1;
      this.someMethodToEmitEvent(pageSize , pageNumber)
    }
    onPageSizeChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.pageSize = Number(target.value);
      this.someMethodToEmitEvent(this.pageSize, 1);
    }
        @HostListener('window:resize')
    onResize() {
      this.updateScrollButtons();
    }
     isRTL() {
    return document.documentElement.dir === 'rtl';
  }

  
  
    ngOnDestroy() {
      clearInterval(this.scrollInterval);
    }

    editCourse(course: CourseResult) {
      this.editCourseEvent.emit(course);
    }

    deleteCourse(course: CourseResult) {
      this.deleteCourseEvent.emit(course);
    }

}
