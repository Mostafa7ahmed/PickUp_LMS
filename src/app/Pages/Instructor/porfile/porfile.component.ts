import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { InstructorProfileService } from './core/services/instructor-profile.service';
import { IInstructorProfile } from './core/interfaces/instructor-profile.interface';
import { filter, Subscription } from 'rxjs';
import { environment } from '../../../Environments/environment';
import { ListCourse } from '../../Courses/Core/interface/icourses';
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { SplicTextPipe } from '../../Courses/Core/Pipes/splic-text.pipe';


@Component({
  selector: 'app-porfile',
  standalone: true,
  imports: [FormsModule , CommonModule , SplicTextPipe ],
  templateUrl: './porfile.component.html',
  styleUrl: './porfile.component.scss'
})
export class PorfileComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private instructorProfileService = inject(InstructorProfileService);
  private subscription = new Subscription();

  instructorProfile: IInstructorProfile | null = null;
  instructorCourses: ListCourse[] = [];
  coursesLoading = false;
  isLoading = false;

  ngOnInit(): void {
    this.loadInstructorProfile();
    this.loadInstructorCourses();

    // Listen for navigation events to reload profile when returning from manage dialog
    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          if (event.url === '/myprofile') {
            this.loadInstructorProfile();
            this.loadInstructorCourses();
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadInstructorProfile(): void {
    this.isLoading = true;
    this.instructorProfileService.getInstructorProfile().subscribe({
      next: (response) => {
        if (response.success) {
          this.instructorProfile = response.result;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading instructor profile:', error);
        this.isLoading = false;
      }
    });
  }

  loadInstructorCourses(): void {
    this.coursesLoading = true;
    this.instructorProfileService.getInstructorCourses().subscribe({
      next: (response: IPaginationResponse<ListCourse>) => {
        if (response.success) {
          this.instructorCourses = response.result;
        }
        this.coursesLoading = false;
      },
      error: (error) => {
        console.error('Error loading instructor courses:', error);
        this.coursesLoading = false;
      }
    });
  }

  openManageProfile(): void {
    this.router.navigate([{ outlets: { dialog: ['manageProfile'] } }]);
  }

  createNewCourse(): void {
    this.router.navigate([{ outlets: { dialog: ['addcourse'] } }]);
  }

  viewCourse(courseId: number): void {
    this.router.navigate(['/ViewCourse', courseId]);
  }

  editCourse(courseId: number): void {
    console.log('Edit course:', courseId);
    // Example: this.router.navigate([{ outlets: { dialog: ['editcourse', courseId] } }]);
  }

  getPhotoUrl(photoPath: string): string {
    // If it's already a full URL, return as is
    if (photoPath.startsWith('http')) {
      return photoPath;
    }
    // Otherwise, prepend the base URL
    return environment.baseUrlFiles + photoPath;
  }
}
