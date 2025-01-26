import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss'
})
export class TopicComponent {


  movies = [
    'Episode 1 ',
    'Episode 2 -',
    'Episode 3 ',
    'Episode 4 -',
    'Episode 5 ',
  ];
  timePeriods = [
    {"name": "New", "price": 81.00, "color": "#F5CD6D" , "border": "#F5CD6D40"},
    {"name": "Preparation", "price": 81.00, "color": "#7371D5", "border": "#7371D540"},
    {"name": "Shoofing", "price": 81.00, "color": "#E65656", "border": "#E6565640"},
    {"name": "Recording", "price": 81.00, "color": "#C44CAA", "border": "#C44CAA40"},
    {"name": "Published", "price": 81.00, "color": "#FF849D" , "border": "#FF849D40"}
   
  ];
  

  dropWitht(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
