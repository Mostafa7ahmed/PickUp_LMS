import { CommonModule, DatePipe } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef, input, Input, output, Output, EventEmitter } from '@angular/core';
import { CourseResult, Icourses } from '../../Core/interface/icourses';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';

@Component({
  selector: 'app-table-courses',
  standalone: true,
  imports: [CommonModule  , MatTooltipModule, DatePipe , SplicTextPipe],
  templateUrl: './table-courses.component.html',
  styleUrl: './table-courses.component.scss'
})
export class TableCoursesComponent {
  pageSize: number = 2; 


  @Input()paginationCoursesResponse: IPaginationResponse<CourseResult>  = {} as IPaginationResponse<CourseResult> ;
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    scrollInterval: any;
    showLeftScroll = false;
    showRightScroll = true;
    @Output() fetchCoursesEvent = new EventEmitter<{ topicId: number; pageNumber?: number; pageSize?: number }>();

    someMethodToEmitEvent(pageSize: number , pageNumber : number) {
      this.fetchCoursesEvent.emit({
        topicId: 1, 
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


    getRemainingCourses(pageNumber:number , pageSize:number ){
      pageNumber = pageNumber + 1;
      this.someMethodToEmitEvent(pageSize , pageNumber)
      console.log(pageNumber)
    }
    getPrevCourses(pageNumber:number , pageSize:number ){
      pageNumber = pageNumber - 1;
      this.someMethodToEmitEvent(pageSize , pageNumber)
      console.log("getPrevCourses")
    }
    onPageSizeChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.pageSize = Number(target.value);
      this.someMethodToEmitEvent(this.pageSize, 1);
    }
    
  
  
    ngOnDestroy() {
      clearInterval(this.scrollInterval);
    }

}
