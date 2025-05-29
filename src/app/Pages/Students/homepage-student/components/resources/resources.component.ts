import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
  resources = [
    {
      icon: '📚',
      title: 'Digital Library',
      subtitle: 'Access e-books and journals',
      bgColor: '#E0EDFF'
    },
    {
      icon: '🎥',
      title: 'Lecture Recordings',
      subtitle: 'Review past lectures',
      bgColor: '#E7F9EC'
    },
    {
      icon: '👥',
      title: 'Study Groups',
      subtitle: 'Join or create study groups',
      bgColor: '#F4EFFF'
    },
    {
      icon: '🧑‍🏫',
      title: 'Tutoring Services',
      subtitle: 'Get help from tutors',
      bgColor: '#FFF5E6'
    }
  ];
}
