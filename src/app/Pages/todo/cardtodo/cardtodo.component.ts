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
  },
  {
    name: 'In Progress',
    stageNumber: 2,
    color: 'rgba(241, 196, 15,  1)', 
    bgColor: 'rgba(241, 196, 15,  0.2)', 

    icon: 'fa-solid fa-spinner',
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
