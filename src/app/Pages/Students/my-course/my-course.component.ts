import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

import { IcourseStudent, CourseProgressStatus } from './core/interface/icourse-student';
import { CourseService } from './core/service/course.service';
import { WidgetcourseStudentComponent } from "./Components/widgetcourse-student/widgetcourse-student.component";
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { environment } from '../../../Environments/environment';

@Component({
  selector: 'app-my-course',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, WidgetcourseStudentComponent],
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.scss'
})
export class MyCourseComponent implements OnInit, OnDestroy {
  courses:IPaginationResponse<IcourseStudent>  = {} as  IPaginationResponse<IcourseStudent>;
  filterBy: string = 'all';
  sortBy: string = 'progress';
  searchTerm: string = '';
  baseurl :string = environment.baseUrlFiles
  
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  showInfoCoupon = false;
  constructor(private courseService: CourseService) {
    // Set up search debouncing
    this.searchSubject.pipe(
      debounceTime(500), // Wait 500ms after user stops typing
      distinctUntilChanged(), // Only search if the term has changed
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.loadCourses();
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.onSearchChange(target.value);
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadCourses();
  }

  loadCourses(): void {
    let courseProgressStatus: CourseProgressStatus | undefined;
    
    // Map filter values to API enum values
    switch (this.filterBy) {
      case 'in-progress':
        courseProgressStatus = CourseProgressStatus.IN_PROGRESS;
        break;
      case 'completed':
        courseProgressStatus = CourseProgressStatus.COMPLETED;
        break;
      case 'all':
      default:
        courseProgressStatus = undefined; // No filter
        break;
    }

    console.log('Loading courses with filter:', this.filterBy, 'API value:', courseProgressStatus, 'Search:', this.searchTerm); // Debug log

    this.courseService.getCourse(1, 100, 2, 1, courseProgressStatus, this.searchTerm).subscribe({
      next: (res) => {
        console.log('API Response:', res); // Debug log
        this.courses = res;
        console.log('Courses loaded:', this.courses.result?.length || 0, 'courses'); // Debug log
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        // You might want to show a user-friendly error message here
      }
    });
  }

  toggShowInfo() {
    this.showInfoCoupon = !this.showInfoCoupon;
  }

  dropdownOpen = false;

  filterOptions = [
    { value: 'all', label: 'All Courses' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectFilter(value: string) {
    console.log('Filter selected:', value); // Debug log
    this.filterBy = value;
    this.dropdownOpen = false;
    // Reload courses with the new filter
    this.loadCourses();
  }

  getLabel(value: string): string {
    return this.filterOptions.find(option => option.value === value)?.label || '';
  }

  getColor(value: string): string {
    switch (value) {
      case 'all': return '#298dba';
      case 'in-progress': return '#dfde0d';
      case 'completed': return '#10b981';
      default: return '#515f32';
    }
  }

  getIcon(value: string): string {
    switch (value) {
      case 'all': return 'fa-book';
      case 'in-progress': return 'fa-spinner';
      case 'completed': return 'fa-check';
      default: return 'fa-book';
    }
  }

  // get filteredCourses() {
  //   let filtered = this.courses;

  //   if (this.filterBy !== 'all') {
  //     if (this.filterBy === 'in-progress') {
  //       filtered = this.courses.filter(course => course.progress > 0 && course.progress < 100);
  //     } else if (this.filterBy === 'completed') {
  //       filtered = this.courses.filter(course => course.progress === 100);
  //     } else if (this.filterBy === 'not-started') {
  //       filtered = this.courses.filter(course => course.progress === 0);
  //     }
  //   }

  //   if (this.searchTerm.trim() !== '') {
  //     const term = this.searchTerm.toLowerCase();
  //     filtered = filtered.filter(course =>
  //       course.title.toLowerCase().includes(term) ||
  //       course.description?.toLowerCase().includes(term)
  //     );
  //   }

  //   return filtered;
  // }
  //   get completedCoursesCount(): number {
  //     return this.courses.filter(c => c.progress === 100).length;
  //   }

  //   get inProgressCoursesCount(): number {
  //     return this.courses.filter(c => c.progress > 0 && c.progress < 100).length;
  //   }

  //   get averageProgress(): number {
  //     if (this.courses.length === 0) return 0;
  //     const total = this.courses.reduce((sum, course) => sum + course.progress, 0);
  //     return Math.round(total / this.courses.length);
  //   }

  //   getProgressColor(progress: number): string {
  //     if (progress < 30) return '#ef4444';
  //     if (progress < 70) return '#f59e0b';
  //     return '#10b981';
  //   }

  //   getProgressStatus(progress: number): string {
  //     if (progress === 0) return 'Not Started';
  //     if (progress === 100) return 'Completed';
  //     return 'In Progress';
  //   }

  //   getButtonText(progress: number): string {
  //     return progress === 0 ? 'Start Course' : 'Continue Learning';
  //   }

}
