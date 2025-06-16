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

 pageSize: number = 20; 
 baseUrl =environment.baseUrlFiles

  @Input()paginationCoursesResponse: IPaginationResponse<CourseResult>  = {} as IPaginationResponse<CourseResult> ;
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    scrollInterval: any;
    showLeftScroll = false;
    showRightScroll = true;
    @Output() fetchCoursesEvent = new EventEmitter<{ pageNumber?: number; pageSize?: number }>();

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

    // Get start index for current page
    getStartIndex(): number {
      if (!this.paginationCoursesResponse.result || this.paginationCoursesResponse.result.length === 0) {
        return 0;
      }
      return ((this.paginationCoursesResponse.pageIndex - 1) * this.paginationCoursesResponse.pageSize) + 1;
    }

    // Get end index for current page
    getEndIndex(): number {
      if (!this.paginationCoursesResponse.result || this.paginationCoursesResponse.result.length === 0) {
        return 0;
      }
      const start = this.getStartIndex();
      return Math.min(start + this.paginationCoursesResponse.result.length - 1, this.paginationCoursesResponse.totalCount);
    }

    // Get pagination info text
    getPaginationInfo(): string {
      if (!this.paginationCoursesResponse.result || this.paginationCoursesResponse.result.length === 0) {
        return 'No courses found';
      }

      const start = this.getStartIndex();
      const end = this.getEndIndex();
      const total = this.paginationCoursesResponse.totalCount;

      return `Showing ${start}-${end} of ${total} courses`;
    }

    // Check if pagination is needed
    isPaginationNeeded(): boolean {
      return this.paginationCoursesResponse.totalPages > 1;
    }

    // Get page numbers for pagination display
    getPageNumbers(): number[] {
      const totalPages = this.paginationCoursesResponse.totalPages;
      const currentPage = this.paginationCoursesResponse.pageIndex;
      const pages: number[] = [];

      // Show max 5 pages around current page
      const maxPages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
      let endPage = Math.min(totalPages, startPage + maxPages - 1);

      // Adjust start page if we're near the end
      if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }

    // Navigate to specific page
    goToPage(pageNumber: number): void {
      if (pageNumber >= 1 && pageNumber <= this.paginationCoursesResponse.totalPages) {
        this.someMethodToEmitEvent(this.paginationCoursesResponse.pageSize, pageNumber);
      }
    }

}
