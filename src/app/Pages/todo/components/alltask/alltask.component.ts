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

}
