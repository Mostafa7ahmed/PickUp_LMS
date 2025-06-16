import { CommonModule, DatePipe } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CourseResult } from '../../Core/interface/icourses';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from '../../../../Environments/environment';
import { RouterLink, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteCoursesService } from '../../Core/service/delete-courses.service';
import { DeleteCourseComponent } from '../delete-course/delete-course.component';

@Component({
  selector: 'app-table-courses',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatTooltipModule, DatePipe, TooltipModule, SplicTextPipe, RouterLink, DeleteCourseComponent],
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

    // Delete popup state
    isDeletePopupVisible = false;
    selectedDeleteId: number | null = null;

    constructor(
      private router: Router,
      private deleteCoursesService: DeleteCoursesService
    ) {}

    // Course action methods
    openEditCourse(courseId: number) {
      console.log('📝 Opening edit course for ID:', courseId);
      // Use the same pattern as other working popups
      this.router.navigate([{ outlets: { dialog: ['editCourse', courseId] } }]);
    }

    openDeleteCourse(courseId: number) {
      console.log('🗑️ Opening delete confirmation for course ID:', courseId);
      this.isDeletePopupVisible = true;
      this.selectedDeleteId = courseId;
    }

    deleteCourse() {
      if (this.selectedDeleteId) {
        console.log('🗑️ Deleting course:', this.selectedDeleteId);

        this.deleteCoursesService.deleteCourse(this.selectedDeleteId).subscribe({
          next: (response) => {
            if (response.success) {
              console.log('✅ Course deleted successfully');
              // Emit event to refresh the course list
              this.fetchCoursesEvent.emit({ pageNumber: 1, pageSize: this.pageSize });
              this.closeDeletePopup();
            } else {
              console.error('❌ Failed to delete course:', response.message);
              alert('Failed to delete course: ' + response.message);
            }
          },
          error: (error) => {
            console.error('❌ Error deleting course:', error);
            alert('An error occurred while deleting the course. Please try again.');
          }
        });
      }
    }

    closeDeletePopup() {
      this.isDeletePopupVisible = false;
      this.selectedDeleteId = null;
    }

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




}
