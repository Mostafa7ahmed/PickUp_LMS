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

}
