import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IcourseStudent } from './core/interface/icourse-student';
import { CourseService } from './core/service/course.service';
import { WidgetcourseStudentComponent } from "./Components/widgetcourse-student/widgetcourse-student.component";

@Component({
  selector: 'app-my-course',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, WidgetcourseStudentComponent],
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.scss'
})
export class MyCourseComponent implements OnInit {
  courses: IcourseStudent[] = [];
  filterBy: string = 'all';
  sortBy: string = 'progress';
searchTerm: string = '';

  showInfoCoupon = false;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses = this.courseService.courses;
  }



  toggShowInfo() {
    this.showInfoCoupon = !this.showInfoCoupon;
  }


 dropdownOpen = false;

filterOptions = [
  { value: 'all', label: 'All Courses' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'not-started', label: 'Not Started' }
];

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

selectFilter(value: string) {
  this.filterBy = value;
  this.dropdownOpen = false;
}

getLabel(value: string): string {
  return this.filterOptions.find(option => option.value === value)?.label || '';
}

getColor(value: string): string {
  switch (value) {
    case 'all': return '#298dba';
    case 'in-progress': return '#dfde0d';
    case 'completed': return '#10b981';
    case 'not-started': return '#a0151e';
    default: return '#515f32';
  }
}
getIcon(value: string): string {
  switch (value) {
       case 'all': return 'fa-book';

    case 'in-progress': return 'fa-spinner';
    case 'completed': return 'fa-check';
    case 'not-started': return 'fa-circle-xmark';
    default: return 'fa-book';
  }
}

get filteredCourses() {
  let filtered = this.courses;

  if (this.filterBy !== 'all') {
    if (this.filterBy === 'in-progress') {
      filtered = this.courses.filter(course => course.progress > 0 && course.progress < 100);
    } else if (this.filterBy === 'completed') {
      filtered = this.courses.filter(course => course.progress === 100);
    } else if (this.filterBy === 'not-started') {
      filtered = this.courses.filter(course => course.progress === 0);
    }
  }

  if (this.searchTerm.trim() !== '') {
    const term = this.searchTerm.toLowerCase();
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.description?.toLowerCase().includes(term)
    );
  }

  return filtered;
}
  get completedCoursesCount(): number {
    return this.courses.filter(c => c.progress === 100).length;
  }

  get inProgressCoursesCount(): number {
    return this.courses.filter(c => c.progress > 0 && c.progress < 100).length;
  }

  get averageProgress(): number {
    if (this.courses.length === 0) return 0;
    const total = this.courses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(total / this.courses.length);
  }

  getProgressColor(progress: number): string {
    if (progress < 30) return '#ef4444';
    if (progress < 70) return '#f59e0b';
    return '#10b981';
  }

  getProgressStatus(progress: number): string {
    if (progress === 0) return 'Not Started';
    if (progress === 100) return 'Completed';
    return 'In Progress';
  }

  getButtonText(progress: number): string {
    return progress === 0 ? 'Start Course' : 'Continue Learning';
  }

}
