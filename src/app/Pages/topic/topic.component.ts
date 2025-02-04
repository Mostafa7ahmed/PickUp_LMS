import { Component, inject, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule, NgClass } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../Core/Services/topic.service';
import { SelectIconComponent } from "../../Components/select-icon/select-icon.component";
import { PopaddtopicComponent } from "../../Components/Pop_instructor/popaddtopic/popaddtopic.component";
import { TopPopComponent } from "../../Components/top-pop/top-pop.component";

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [NgClass, FormsModule, NzSelectModule, NzModalModule, CommonModule, NzButtonModule, NzIconModule, NzTabsModule, SelectIconComponent, PopaddtopicComponent, TopPopComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss'
})
export class TopicComponent implements OnInit {
  currentIcon: string = 'fa fa-address-book'; // Default icon
  colorDefault:string="bg-light" ;
  ishowTab:boolean = false;
  ishowTabTopic:boolean = false;


  private _topicService = inject(TopicService);
  Topics: any[] = [];

  selectedValue = null;



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


  courseCount = 7;
  totalPrice = 10.00;
  lastUpdate = '4-2-2025';
  creator = 'Salma shorbgy';
  createdOn = '4-2-2025';
  lastUpdater = 'Salma shorbgy';
 



  isVisible = false;
  showsss = false;


  showModal(): void {
    this.isVisible = true;
  }


  shows(): void {
    this.showsss = true;
  }

  


 

  dropWitht(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Topics, event.previousIndex, event.currentIndex);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Topics, event.previousIndex, event.currentIndex);
  }



  ngOnInit(): void {
    this._topicService.getAllLanguage().subscribe((res) => {
      this.Topics = res.result;
      
    });
  }







  isEditing: boolean = false; 
  textValue: string ='Episode'; 


  showTabTopic(movie: any) {
    movie.isTabOpen = !movie.isTabOpen;
    console.log(movie.id)
  }


  startEditing(movie: any) {
    movie.isEditing = true;
  }

  saveValue(movie: any, newValue: string) {
    movie.textValue = newValue;
    movie.isEditing = false;
  }




  


}
