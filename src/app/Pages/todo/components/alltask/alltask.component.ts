import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task, TaskColumn } from '../../interfaces/task.interface';



@Component({
  selector: 'app-alltask',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './alltask.component.html',
  styleUrls: ['./alltask.component.scss']
})
export class AlltaskComponent {
  taskColumns: any[] = [
    {
      id: 1,
      title: 'To Do',
      tasks: [
        {
          id: 1,
          title: 'Design Homepage',
          description: 'Create a modern and responsive homepage design',
          priority: 'High',
          priorityClass: 'high',
          date: new Date('2025-06-01'),
          comments: 3,
          views: 12
        },
        {
          id: 2,
          title: 'User Authentication',
          description: 'Implement user login and registration',
          priority: 'Medium',
          priorityClass: 'medium',
          date: new Date('2025-06-03'),
          comments: 1,
          views: 8
        }
      ]
    },
    {
      id: 2,
      title: 'In Progress',
      tasks: [
        {
          id: 3,
          title: 'API Integration',
          description: 'Connect frontend with backend APIs',
          priority: 'High',
          priorityClass: 'high',
          date: new Date('2025-05-30'),
          comments: 5,
          views: 15
        }
      ]
    },
    {
      id: 3,
      title: 'Done',
      tasks: [
        {
          id: 4,
          title: 'Project Setup',
          description: 'Initialize Angular project and configure routing',
          priority: 'Low',
          priorityClass: 'low',
          date: new Date('2025-05-28'),
          comments: 2,
          views: 10
        }
      ]
    }
  ];

  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // Get IDs of other columns to establish drag/drop connections
  getConnectedColumns(currentId: string): string[] {
    return this.taskColumns
      .filter(column => column.id !== currentId)
      .map(column => column.id);
  }
}
