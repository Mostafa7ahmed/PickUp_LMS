import { Component, inject, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../Core/Services/topic.service';
import { ITopic } from '../../Core/Interface/itopic';
import { ConfirmEmailComponent } from "../../Components/confirm-email/confirm-email.component";
import { SelectIconComponent } from "../../Components/select-icon/select-icon.component";
import { PopaddtopicComponent } from "../../Components/Pop_instructor/popaddtopic/popaddtopic.component";

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CdkDropList, CdkDrag, FormsModule, NzSelectModule, NzModalModule, CommonModule, NzButtonModule, NzIconModule, NzTabsModule, ConfirmEmailComponent, SelectIconComponent, PopaddtopicComponent],

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



 



  isVisible = false;

  showModal(): void {
    this.isVisible = true;
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
