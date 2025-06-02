import { Component } from '@angular/core';
import { StageTodo } from '../interfaces/task.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardtodo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardtodo.component.html',
  styleUrl: './cardtodo.component.scss'
})
export class CardtodoComponent {
  stages: StageTodo[] = [
  {
    name: 'Start',
    stageNumber: 1,
    color: 'rgba(52, 152, 219)', 
    bgColor: 'rgba(52, 152, 219, 0.2)', 
    icon: 'fas fa-tasks',
       tasks: [
        {
          id: 1,
          title: 'Prepare Database Lecture',
          description: 'Create slides for normalization and indexing topics',
          priority: 'High',
          priorityClass: 'high',
          dueDate: new Date('2024-03-15'),
          course: 'Database Management',
          type: 'course-prep',
          completed: false,
          status: 'todo'
        },
        {
          id: 2,
          title: 'Grade Midterm Exams',
          description: 'Grade Data Structures midterm exams - 45 students',
          priority: 'High',
          priorityClass: 'high',
          dueDate: new Date('2024-03-18'),
          course: 'Data Structures & Algorithms',
          type: 'grading',
          completed: false,
          status: 'todo'
        },
        {
          id: 3,
          title: 'Update Course Syllabus',
          description: 'Add new AI ethics module to curriculum',
          priority: 'Medium',
          priorityClass: 'medium',
          dueDate: new Date('2024-03-20'),
          course: 'Artificial Intelligence',
          type: 'course-prep',
          completed: false,
          status: 'todo'
        }
      ]
  },
  {
    name: 'In Progress',
    stageNumber: 2,
    color: 'rgba(241, 196, 15,  1)', 
    bgColor: 'rgba(241, 196, 15,  0.2)', 

    icon: 'fa-solid fa-spinner',
        tasks: [
        {
          id: 4,
          title: 'Research Paper Review',
          description: 'Review papers for Computer Science Journal',
          priority: 'High',
          priorityClass: 'high',
          dueDate: new Date('2024-03-25'),
          type: 'administrative',
          completed: false,
          status: 'in-progress'
        },
        {
          id: 5,
          title: 'Student Project Supervision',
          description: 'Guide senior capstone projects - weekly meetings',
          priority: 'Medium',
          priorityClass: 'medium',
          dueDate: new Date('2024-03-22'),
          type: 'meeting',
          completed: false,
          status: 'in-progress'
        }
      ]
  },
  {
    name: 'Review',
    stageNumber: 3,
    color: 'rgba(230, 126, 34, 1)', 
    bgColor: 'rgba(230, 126, 34,  0.2)',
    icon: 'fa-solid fa-eye',
  },
  {
    name: 'Complete',
    stageNumber: 4,
    color: 'rgba(46, 204, 113, 1)',
    bgColor: 'rgba(46, 204, 113,  0.2)', 
    icon: 'fas fa-check-circle',
  }
]

}
