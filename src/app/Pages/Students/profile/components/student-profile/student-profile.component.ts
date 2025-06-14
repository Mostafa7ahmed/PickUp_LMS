import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  student = {
    avatar: '/public/Images/profile-card-Image.png',
    name: 'Student Name',
    email: 'student@email.com',
    enrolledCourses: 5,
    completedCourses: 2,
    progress: 40,
    bio: 'This is a short student bio. You can update your information from your profile settings.',
    achievements: [
      {
        name: 'Fast Learner',
        description: 'Completed 5 lessons in one day',
        icon: 'fa-award',
        unlocked: true
      },
      {
        name: 'On Fire',
        description: '7 day study streak',
        icon: 'fa-fire',
        unlocked: true
      },
      {
        name: 'Course Master',
        description: 'Complete your first course to unlock',
        icon: 'fa-lock',
        unlocked: false
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    // In a real application, you would fetch the student profile data here
  }

  editProfile(): void {
    // This would open a modal or navigate to an edit profile page
    console.log('Edit profile clicked');
    alert('Edit profile functionality will be implemented in the future.');
  }
}
