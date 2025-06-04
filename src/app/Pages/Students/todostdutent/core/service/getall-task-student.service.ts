import { Injectable } from '@angular/core';
import { IStudentTask } from '../interface/istudent-task';

@Injectable({
  providedIn: 'root'
})
export class GetallTaskStudentService {

  constructor() { }
   tasks: IStudentTask[] = [
      {
        id: 1,
        title: 'Prepare lecture slides for Web Development',
        description: 'Create slides for React components and state management',
        type: 'Exam',
        priority: 'high',
        dueDate: '2024-03-20',
        completed: false,
        createdAt: new Date('2024-03-15')
      },
      {
        id: 2,
        title: 'Grade midterm exams',
        description: 'Grade JavaScript fundamentals midterm exams for 45 students',
        type: 'Task',
        priority: 'urgent',
        dueDate: '2024-03-18',
        completed: false,
        createdAt: new Date('2024-03-14')
      },
      {
        id: 3,
        title: 'Faculty meeting preparation',
        description: 'Prepare curriculum update proposal',
        type: 'Task',
        priority: 'medium',
        dueDate: '2024-03-22',
        completed: true,
        createdAt: new Date('2024-03-13')
      },
          {
        id: 4,
        title: 'Prepare lecture slides for Web Development',
        description: 'Create slides for React components and state management',
        type: 'personal',
        priority: 'low',
        dueDate: '2024-03-20',
        completed: false,
        createdAt: new Date('2024-03-15')
      },
      {
        id: 8,
        title: 'Grade ddddddd exams',
        description: 'Grade JavaScript fundamentals midterm exams for 45 students',
        type: 'personal',
        priority: 'urgent',
        dueDate: '2024-03-18',
        completed: false,
        createdAt: new Date('2024-03-14')
      },
      {
        id: 9,
        title: 'Faculty dddd preparation',
        description: 'Prepare curriculum update proposal',
        type: 'meeting',
        priority: 'medium',
        dueDate: '2024-03-22',
        completed: true,
        createdAt: new Date('2025-06-13')
      }
    ];
  
}
