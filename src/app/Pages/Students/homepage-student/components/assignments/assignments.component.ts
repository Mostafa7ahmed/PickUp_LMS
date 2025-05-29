import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.scss'
})
export class AssignmentsComponent {
  assignments = [
    {
      icon: '📄',
      title: 'Final Project: Database Design',
      course: 'CS 405',
      due: 'Due Tomorrow, 11:59 PM',
      action: 'Submit',
      bgColor: '#FFF0F0'
    },
    {
      icon: '📝',
      title: 'Algorithm Analysis Report',
      course: 'CS 301',
      due: 'Due in 2 days, 11:59 PM',
      action: 'Start',
      bgColor: '#FFF8E6'
    },
    {
      icon: '📊',
      title: 'AI Ethics Presentation',
      course: 'CS 450',
      due: 'Due in 5 days, 2:00 PM',
      action: 'Start',
      bgColor: '#F3E6FF'
    },
    {
      icon: '🛡️',
      title: 'Security Vulnerability Analysis',
      course: 'CS 410',
      due: 'Due in 6 days, 11:59 PM',
      action: 'Start',
      bgColor: '#E6F0FF'
    }
  ];
}
