import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CdkDropList, CdkDrag , NzModalModule , NzButtonModule , NzIconModule , NzTabsModule],

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

  tabs = [
    {
      name: 'Tab 1',
      icon: 'apple'
    },
    {
      name: 'Tab 2',
      icon: 'android'
    }
  ];
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  dropWitht(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
