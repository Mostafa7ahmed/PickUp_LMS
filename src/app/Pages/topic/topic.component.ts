import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CdkDropList, CdkDrag ,FormsModule, NzSelectModule, NzModalModule ,CommonModule, NzButtonModule , NzIconModule , NzTabsModule],

  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss'
})
export class TopicComponent {
  currentIcon: string = 'fa fa-address-book'; // Default icon
  colorDefault:string="bg-light" ;
  ishowTab:boolean = false;
  ishowTabTopic:boolean = false;

  selectedValue = null;

  timePeriods = [
    {"name": "New", "price": 81.00, "color": "#F5CD6D" , "border": "#F5CD6D40"},
    {"name": "Preparation", "price": 81.00, "color": "#7371D5", "border": "#7371D540"},
    {"name": "Shoofing", "price": 81.00, "color": "#E65656", "border": "#E6565640"},
    {"name": "Recording", "price": 81.00, "color": "#C44CAA", "border": "#C44CAA40"},
    {"name": "Published", "price": 81.00, "color": "#FF849D" , "border": "#FF849D40"}
   
  ];
  colors =["bg-danger", "bg-primary", "bg-warning", "bg-success", "bg-info", "bg-dark" , "bg-light" , "bg-primary"];

  icons = [
    { icon: 'fa fa-address-book' },
    { icon: 'fa fa-home' },
    { icon: 'fa fa-user' },
    { icon: 'fa fa-cog' },
    { icon: 'fa fa-heart' },
    { icon: 'fa fa-bell' },
    { icon: 'fa fa-envelope' },
    { icon: 'fa fa-star' }
  ];


  selectIcon(icon: string) {
    this.currentIcon = icon; // Update the selected icon
  }
  selectBg(color: string) {
    this.colorDefault = color; // Update the selected icon
  }





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
  showTab(){
    this.ishowTab = !this.ishowTab; // التبديل بين المصغر والموسع

  }
  showTabTooic(){
    this.ishowTabTopic = !this.ishowTabTopic; // التبديل بين المصغر والموسع

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








  isEditing: boolean = false; // حالة التحرير
  textValue: string ='Episode'; // القيمة الافتراضية
  movies = [
    { id: 1, textValue: 'Computer Science ', isEditing: false , isTabOpen: false },
    { id: 2, textValue: 'Computer Science ', isEditing: false , isTabOpen: false },
    { id: 3, textValue: ' Computer Science', isEditing: false , isTabOpen: false }
  ];

  showTabTopic(movie: any) {
    movie.isTabOpen = !movie.isTabOpen;
  }


  // تبديل إلى وضع التحرير
  startEditing(movie: any) {
    movie.isEditing = true;
  }

  // حفظ القيمة الجديدة وإنهاء التحرير
  saveValue(movie: any, newValue: string) {
    movie.textValue = newValue;
    movie.isEditing = false;
  }
}
