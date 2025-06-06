import { Injectable } from '@angular/core';
import { ITaskInstrctor } from '../Interface/itask-instrctor';

@Injectable({
  providedIn: 'root'
})
export class GetalltaskinstrctorService {

  constructor() { }
    tasks: ITaskInstrctor[] = [
    {
      id: 1,
      title: 'Prepare lecture slides for Web Development',
      description: 'Create slides for React components and state management',
      type: 'teaching',
      priority: 'high',
      dueDate: '2024-03-20',
      completed: false,
      createdAt: new Date('2024-03-15')
    },
    {
      id: 2,
      title: 'Grade midterm exams',
      description: 'Grade JavaScript fundamentals midterm exams for 45 students',
      type: 'grading',
      priority: 'urgent',
      dueDate: '2024-03-18',
      completed: false,
      createdAt: new Date('2024-03-14')
    },
    {
      id: 3,
      title: 'Faculty meeting preparation',
      description: 'Prepare curriculum update proposal',
      type: 'meeting',
      priority: 'medium',
      dueDate: '2024-03-22',
      completed: true,
      createdAt: new Date('2024-03-13')
    },
    {
      id: 4,
      title: 'Student consultation hours',
      description: 'Office hours for project guidance',
      type: 'teaching',
      priority: 'low',
      dueDate: '2024-03-21',
      completed: false,
      createdAt: new Date('2024-03-16')
    },
    {
      id: 5,
      title: 'Update course syllabus',
      description: 'Add new assignments and reading materials',
      type: 'administrative',
      priority: 'medium',
      dueDate: '2024-03-25',
      completed: false,
      createdAt: new Date('2024-03-12')
    },
    {
      id: 6,
      title: 'Review student project proposals',
      description: 'Provide feedback on 15 project proposals',
      type: 'personal',
      priority: 'high',
      dueDate: '2024-03-19',
      completed: true,
      createdAt: new Date('2024-03-11')
    }
  ];

}
