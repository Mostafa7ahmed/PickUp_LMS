import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../Core/Services/login.service';
import { Decode } from '../../../Core/Interface/user';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'not-started';
  image: string;
  category: string;
  enrolledDate: Date;
  completedDate?: Date;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  dateEarned: Date;
  category: 'course' | 'skill' | 'milestone';
}

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent implements OnInit {
  private _LoginService = inject(LoginService);
  
  dataUser: Decode = {} as Decode;
  isEditing = false;
  
  // Profile data
  profile = {
    bio: 'Passionate learner pursuing knowledge in technology and data science. Currently focusing on web development and machine learning to build impactful solutions.',
    interests: ['Web Development', 'Data Science', 'Machine Learning', 'UI/UX Design'],
    goals: 'To become a full-stack developer and contribute to innovative tech projects'
  };

  // Student courses
  courses: Course[] = [
    {
      id: 1,
      title: 'Complete JavaScript Course',
      instructor: 'Dr. Ahmed Mohamed',
      progress: 85,
      status: 'in-progress',
      image: 'Images/Course/js.png',
      category: 'Programming',
      enrolledDate: new Date('2024-01-15'),
    },
    {
      id: 2,
      title: 'React Development Fundamentals',
      instructor: 'Prof. Sarah Wilson',
      progress: 100,
      status: 'completed',
      image: 'Images/Course/react.png',
      category: 'Frontend',
      enrolledDate: new Date('2024-02-01'),
      completedDate: new Date('2024-03-10')
    },
    {
      id: 3,
      title: 'Data Analysis with Python',
      instructor: 'Dr. Michael Chen',
      progress: 45,
      status: 'in-progress',
      image: 'Images/Course/python.png',
      category: 'Data Science',
      enrolledDate: new Date('2024-03-01'),
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      instructor: 'Lisa Anderson',
      progress: 100,
      status: 'completed',
      image: 'Images/Course/design.png',
      category: 'Design',
      enrolledDate: new Date('2023-12-15'),
      completedDate: new Date('2024-01-20')
    }
  ];

  // Student achievements
  achievements: Achievement[] = [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Successfully completed your first course',
      icon: 'fa-solid fa-graduation-cap',
      dateEarned: new Date('2024-01-20'),
      category: 'milestone'
    },
    {
      id: 2,
      title: 'JavaScript Expert',
      description: 'Mastered JavaScript fundamentals',
      icon: 'fa-brands fa-js',
      dateEarned: new Date('2024-02-15'),
      category: 'skill'
    },
    {
      id: 3,
      title: 'Fast Learner',
      description: 'Completed 3 courses in 2 months',
      icon: 'fa-solid fa-bolt',
      dateEarned: new Date('2024-03-10'),
      category: 'milestone'
    },
    {
      id: 4,
      title: 'Design Enthusiast',
      description: 'Completed UI/UX Design course with excellence',
      icon: 'fa-solid fa-palette',
      dateEarned: new Date('2024-01-20'),
      category: 'skill'
    }
  ];

  ngOnInit() {
    this.dataUser = this._LoginService.saveUserAuth();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    this.isEditing = false;
    // Here you would typically save the profile to a backend service
    console.log('Profile saved:', this.profile);
  }

  cancelEdit() {
    this.isEditing = false;
    // Reset any changes made during editing
  }

  getCompletedCoursesCount(): number {
    return this.courses.filter(course => course.status === 'completed').length;
  }

  getInProgressCoursesCount(): number {
    return this.courses.filter(course => course.status === 'in-progress').length;
  }

  getTotalProgressPercentage(): number {
    if (this.courses.length === 0) return 0;
    const totalProgress = this.courses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / this.courses.length);
  }

  getAchievementIcon(achievement: Achievement): string {
    return achievement.icon;
  }

  getCourseStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'not-started': return 'status-not-started';
      default: return '';
    }
  }

  getCourseStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'not-started': return 'Not Started';
      default: return status;
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
} 