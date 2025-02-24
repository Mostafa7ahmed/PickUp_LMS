import { CommonModule, DatePipe } from '@angular/common';
import { Component, HostListener, ViewChild, ElementRef, input, Input } from '@angular/core';
import { Icourses } from '../../Core/interface/icourses';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';

@Component({
  selector: 'app-table-courses',
  standalone: true,
  imports: [CommonModule  , MatTooltipModule, DatePipe , SplicTextPipe],
  templateUrl: './table-courses.component.html',
  styleUrl: './table-courses.component.scss'
})
export class TableCoursesComponent {


  @Input() courseList :any [] = [];
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    scrollInterval: any;
    showLeftScroll = false;
    showRightScroll = true;
  
 

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
  
    ngOnDestroy() {
      clearInterval(this.scrollInterval);
    }

}
