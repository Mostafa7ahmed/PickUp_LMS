import { Component, OnInit } from '@angular/core';
import { CourseCardComponent } from "../homepage-student/components/course-card/course-card.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DicoverCourseService } from "./service/dicover-course.service";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-discover-course',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent, HttpClientModule],
  templateUrl: './discover-course.component.html',
  styleUrl: './discover-course.component.scss'
})
export class DiscoverCourseComponent implements OnInit {
  pageIndex = 1;
  totalPages = 1;
  readonly pageSize = 15;
  searchTerm = '';
  isLoading = false;

  private searchInput$ = new Subject<string>();

  constructor(private discoverService: DicoverCourseService) {}

  ngOnInit(): void {
    this.loadCourses(this.pageIndex);

    // debounce search input
    this.searchInput$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm = term;
        this.pageIndex = 1;
        this.loadCourses(this.pageIndex);
      });
  }

  loadCourses(page: number) {
    this.isLoading = true;
    this.discoverService
      .fetchCourses(undefined, page, this.pageSize, 0, this.searchTerm)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        this.pageIndex = this.discoverService.pageIndex;
        this.totalPages = this.discoverService.totalPages;
      });
  }

  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.loadCourses(this.pageIndex + 1);
    }
  }

  prevPage() {
    if (this.pageIndex > 1) {
      this.loadCourses(this.pageIndex - 1);
    }
  }

  onSearch() {
    // reset to first page when search term changes
    this.pageIndex = 1;
    this.loadCourses(this.pageIndex);
  }

  onSearchInput(value: string) {
    this.searchInput$.next(value);
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchInput('');
  }

  get coursesCount(): number {
    return this.discoverService.courses.length;
  }
}
