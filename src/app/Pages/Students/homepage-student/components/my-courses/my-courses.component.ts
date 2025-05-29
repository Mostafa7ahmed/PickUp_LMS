import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss'
})
export class MyCoursesComponent {
 courses = [
    {
      icon: '↩️',
      title: 'CS 301: Data Structures & Algorithms',
      professor: 'Prof. James Wilson',
      schedule: 'Mon, Wed 10:00 AM',
      progress: 92,
      color: '#E6F0FF'
    },
    {
      icon: '📗',
      title: 'CS 405: Database Management',
      professor: 'Prof. Sarah Chen',
      schedule: 'Tue, Thu 1:30 PM',
      progress: 78,
      color: '#E6FFF2'
    },
    {
      icon: '🔮',
      title: 'CS 450: Artificial Intelligence',
      professor: 'Prof. Michael Rodriguez',
      schedule: 'Mon, Wed 2:00 PM',
      progress: 85,
      color: '#F3E6FF'
    },
    {
      icon: '🛡️',
      title: 'CS 410: Cybersecurity Fundamentals',
      professor: 'Prof. David Thompson',
      schedule: 'Tue, Thu 11:00 AM',
      progress: 62,
      color: '#FFEDED'
    },
        {
      icon: '↩️',
      title: 'CS 301: Data Structures & Algorithms',
      professor: 'Prof. James Wilson',
      schedule: 'Mon, Wed 10:00 AM',
      progress: 92,
      color: '#E6F0FF'
    },
    {
      icon: '📗',
      title: 'CS 405: Database Management',
      professor: 'Prof. Sarah Chen',
      schedule: 'Tue, Thu 1:30 PM',
      progress: 78,
      color: '#E6FFF2'
    },
  ];
}
