import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { InstructorProfileService } from './core/services/instructor-profile.service';
import { IInstructorProfile } from './core/interfaces/instructor-profile.interface';
import { filter, Subscription } from 'rxjs';
import { environment } from '../../../Environments/environment';
<<<<<<< HEAD
=======
import { ICoursePorfile, ListCourse } from '../../Courses/Core/interface/icourses';
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { SplicTextPipe } from '../../Courses/Core/Pipes/splic-text.pipe';

>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c

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
<<<<<<< HEAD

  searchText = '';
  instructorProfile: IInstructorProfile | null = null;
  isLoading = false;

  followers: Follower[] = [
  { name: 'Nehad Naiem', title: 'Data Analyst at TechCorp', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Mohamed Yasser', title: 'ML Engineer at AI Solutions', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Mahmoud Gamal', title: 'Student at MIT', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Sarah Johnson', title: 'Data Scientist at HealthTech', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Olivia Martinez', title: 'AI Researcher at Google', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Robert Taylor', title: 'CTO at DataWorks', image: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Amina Ali', title: 'Student at Stanford', image: 'https://randomuser.me/api/portraits/women/30.jpg' },
  { name: 'Kareem Abdallah', title: 'AI Intern at OpenAI', image: 'https://randomuser.me/api/portraits/men/28.jpg' },
  { name: 'Lana Rose', title: 'ML Research Assistant', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { name: 'Ahmed Tarek', title: 'Data Engineer at IBM', image: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { name: 'Fatima Zahra', title: 'AI Ethics Researcher', image: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { name: 'James Brown', title: 'Full Stack Developer', image: 'https://randomuser.me/api/portraits/men/53.jpg' },
    { name: 'Nehad Naiem', title: 'Data Analyst at TechCorp', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Mohamed Yasser', title: 'ML Engineer at AI Solutions', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Mahmoud Gamal', title: 'Student at MIT', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Sarah Johnson', title: 'Data Scientist at HealthTech', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Olivia Martinez', title: 'AI Researcher at Google', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Robert Taylor', title: 'CTO at DataWorks', image: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Amina Ali', title: 'Student at Stanford', image: 'https://randomuser.me/api/portraits/women/30.jpg' },
  { name: 'Kareem Abdallah', title: 'AI Intern at OpenAI', image: 'https://randomuser.me/api/portraits/men/28.jpg' },
  { name: 'Lana Rose', title: 'ML Research Assistant', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { name: 'Ahmed Tarek', title: 'Data Engineer at IBM', image: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { name: 'Fatima Zahra', title: 'AI Ethics Researcher', image: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { name: 'James Brown', title: 'Full Stack Developer', image: 'https://randomuser.me/api/portraits/men/53.jpg' },
];

  ngOnInit(): void {
    this.loadInstructorProfile();

    // Listen for navigation events to reload profile when returning from manage dialog
=======

  instructorProfile: IInstructorProfile | null = null;
  instructorCourses: ICoursePorfile[] = [];
  coursesLoading = false;
  isLoading = false;

  ngOnInit(): void {
    this.loadInstructorProfile();
    this.loadInstructorCourses();

>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          if (event.url === '/myprofile') {
            this.loadInstructorProfile();
<<<<<<< HEAD
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

  openManageProfile(): void {
    this.router.navigate([{ outlets: { dialog: ['manageProfile'] } }]);
  }

  getPhotoUrl(photoPath: string): string {
    // If it's already a full URL, return as is
    if (photoPath.startsWith('http')) {
      return photoPath;
    }
    // Otherwise, prepend the base URL
    return environment.baseUrlFiles + photoPath;
  }

  filteredFollowers(): Follower[] {
    return this.followers.filter(f =>
      f.name.toLowerCase().includes(this.searchText.toLowerCase())
=======
            this.loadInstructorCourses();
          }
        })
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
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
      next: (response: IPaginationResponse<ICoursePorfile>) => {
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
