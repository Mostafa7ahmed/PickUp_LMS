import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  image: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  rating: number;
  category: string;
  enrolledDate: Date;
  lastAccessed: Date;
}

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.scss'
})
export class StudentCoursesComponent {
  courses: Course[] = [
    {
      id: 1,
      title: 'Advanced Angular Development',
      instructor: 'Dr. Sarah Wilson',
      description: 'Master advanced Angular concepts including RxJS, state management, and performance optimization.',
      image: 'Images/Course/Image+Background.png',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      duration: '8 weeks',
      rating: 4.8,
      category: 'Web Development',
      enrolledDate: new Date('2024-01-15'),
      lastAccessed: new Date('2024-03-10')
    },
    {
      id: 2,
      title: 'Database Design & Management',
      instructor: 'Prof. Michael Chen',
      description: 'Learn database design principles, SQL optimization, and modern database technologies.',
      image: 'Images/Course/Image+Background.png',
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      duration: '6 weeks',
      rating: 4.6,
      category: 'Database',
      enrolledDate: new Date('2024-02-01'),
      lastAccessed: new Date('2024-03-08')
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Introduction to machine learning algorithms, data preprocessing, and model evaluation.',
      image: 'Images/Course/Image+Background.png',
      progress: 30,
      totalLessons: 32,
      completedLessons: 10,
      duration: '12 weeks',
      rating: 4.9,
      category: 'AI/ML',
      enrolledDate: new Date('2024-02-15'),
      lastAccessed: new Date('2024-03-09')
    },
    {
      id: 4,
      title: 'Cybersecurity Essentials',
      instructor: 'Prof. David Thompson',
      description: 'Essential cybersecurity concepts, threat analysis, and security best practices.',
      image: 'Images/Course/Image+Background.png',
      progress: 90,
      totalLessons: 16,
      completedLessons: 14,
      duration: '4 weeks',
      rating: 4.7,
      category: 'Security',
      enrolledDate: new Date('2024-01-10'),
      lastAccessed: new Date('2024-03-11')
    },
      {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Introduction to machine learning algorithms, data preprocessing, and model evaluation.',
      image: 'Images/Course/Image+Background.png',
      progress: 0,
      totalLessons: 32,
      completedLessons: 10,
      duration: '12 weeks',
      rating: 4.9,
      category: 'AI/ML',
      enrolledDate: new Date('2024-02-15'),
      lastAccessed: new Date('2024-03-09')
    },
    {
      id: 4,
      title: 'Cybersecurity Essentials',
      instructor: 'Prof. David Thompson',
      description: 'Essential cybersecurity concepts, threat analysis, and security best practices.',
      image: 'Images/Course/Image+Background.png',
      progress: 0,
      totalLessons: 16,
      completedLessons: 14,
      duration: '4 weeks',
      rating: 4.7,
      category: 'Security',
      enrolledDate: new Date('2024-01-10'),
      lastAccessed: new Date('2024-03-11')
    }
  ];

  filterBy: string = 'all';
  sortBy: string = 'progress';

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

    return filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'recent':
          return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
        default:
          return 0;
      }
    });
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