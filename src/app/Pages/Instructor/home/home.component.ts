import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  instructors = [
    { initials: 'RJ', name: 'Ahmed Hamed', subject: 'Web Development', rating: 4.9, courses: 24, bgColor: '#ccfbf1' },
    { initials: 'DM', name: 'Mahmoud', subject: 'Data Science', rating: 4.8, courses: 18, bgColor: '#bbf7d0' },
    { initials: 'SK', name: 'Sarah Kim', subject: 'UX/UI Design', rating: 4.7, courses: 15, bgColor: '#f3e8ff' },
    { initials: 'JP', name: 'James Peterson', subject: 'Business Strategy', rating: 4.6, courses: 12, bgColor: '#ffedd5' },
  ];

  students = [
    { initials: 'AT', name: 'Doha Amr', completed: 15, title: 'Top Achiever', score: '98%', bgColor: '#e5e7eb' },
    { initials: 'MN', name: 'Mostafa Hamed', completed: 12, title: 'Fast Learner', score: '95%', bgColor: '#bbf7d0' },
    { initials: 'EG', name: 'Elena Garcia', completed: 10, title: 'Most Engaged', score: '92%', bgColor: '#bbf7d0' },
    { initials: 'JW', name: 'Jordan Wilson', completed: 8, title: 'Rising Star', score: '90%', bgColor: '#f3e8ff' },
  ];


   courses = [
    {
      name: 'Advanced JavaScript Masterclass',
      modules: 12,
      hours: 24,
      topic: 'Web Development',
      students: 1245,
      rating: 5,
      reviews: 128,
      revenue: 18675,
      stage: 'Publish',
      color: '#ccfbf1',
      icon: true
    },
    {
      name: 'UI/UX Design Principles',
      modules: 8,
      hours: 16,
      topic: 'Design',
      students: 986,
      rating: 4.8,
      reviews: 94,
      revenue: 14790,
      stage: 'Publish',
      color: '#f3e8ff',
      icon: true
    },
    {
      name: 'Data Science Fundamentals',
      modules: 10,
      hours: 20,
      topic: 'Data Science',
      students: 845,
      rating: 4.7,
      reviews: 76,
      revenue: 12675,
      stage: 'Publish',
      color: '#bbf7d0',
      icon: true
    },
    {
      name: 'Digital Marketing Strategies',
      modules: 6,
      hours: 12,
      topic: 'Marketing',
      students: 632,
      rating: 4.5,
      reviews: 58,
      revenue: 9480,
      stage: 'Publish',
      color: '#fee2e2',
      icon: true
    },
    {
      name: 'Project Management Professional',
      modules: 9,
      hours: 18,
      topic: 'Business',
      students: 524,
      rating: 4.4,
      reviews: 47,
      revenue: 7860,
      stage: 'New',
      color: '#fde68a',
      icon: true
    }
  ];

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
