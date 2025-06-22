import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { StudentProfileService } from '../../../Core/Services/student-profile.service';
import { IStudentProfile } from '../../../Core/Interface/istudent-profile';
import { filter, Subscription } from 'rxjs';
import { environment } from '../../../Environments/environment';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private studentProfileService = inject(StudentProfileService);
  private subscription = new Subscription();

  studentProfile: IStudentProfile | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.loadStudentProfile();

    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          if (event.url.includes('/Student/myprofile')) {
            this.loadStudentProfile();
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadStudentProfile(): void {
    this.isLoading = true;
    this.studentProfileService.getStudentProfile().subscribe({
      next: (response) => {
        if (response.success) {
          this.studentProfile = response.result;
          console.log('Student profile loaded:', this.studentProfile);
        } else {
          console.error('Failed to load student profile:', response);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading student profile:', error);
        this.isLoading = false;
      }
    });
  }

  openEditProfile(): void {
    console.log('Opening edit profile popup...');
    console.log('Current URL:', this.router.url);
    
    // Try absolute navigation to the student edit profile
    this.router.navigate(['/Student', { outlets: { dialog: 'editStudentProfile' } }]).then(
      (success) => console.log('Navigation success:', success),
      (error) => console.error('Navigation error:', error)
    );
  }

  browseCourses(): void {
    this.router.navigate(['/Student/DiscoverCourses']);
  }

  getPhotoUrl(photoPath: string): string {
    if (!photoPath) {
      return 'assets/Images/default-avatar.png'; // Default avatar
    }
    // If it's already a full URL, return as is
    if (photoPath.startsWith('http')) {
      return photoPath;
    }
    // Otherwise, prepend the base URL
    return environment.baseUrlFiles + photoPath;
  }


} 