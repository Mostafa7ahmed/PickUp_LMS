import { ITpoic, Result, Stage } from './../../Core/Interface/itopic';
import { ChangeDetectorRef, Component, HostListener, inject, OnInit } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../Core/Services/topic.service';
import { SelectIconComponent } from "../../Components/select-icon/select-icon.component";
import { ViewtpoicComponent } from "./Components/viewtpoic/viewtpoic.component";
import { finalize, Subscription } from 'rxjs';
import { AddTopicComponent } from "./Components/add-topic/add-topic.component";
@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [InfiniteScrollModule, FormsModule, CommonModule, SelectIconComponent, ViewtpoicComponent, AddTopicComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss'
})
export class TopicComponent implements OnInit {
  private _topicService = inject(TopicService);


  private cdr = inject(ChangeDetectorRef);
  pageIndex :number = 0;
  moveNext :boolean = false;
  movePrevious :boolean = false;


  topics:ITpoic = {} as ITpoic;

  viewTopicData :ITpoic = {} as ITpoic;
  pageNumber = 1;
  pageSize = 5;
  loading = false;
  hasMoreData = true;
  isVisible = false;
  isSuccess = true;
  showPopup = false;

  currentTopicId: number | null = null;
  subscription: Subscription | null = null;
  showModal(): void {
    this.isVisible = true;
    
  }

  showsViewTopic = false;
  toggleViewToic(): void {
    this.showsViewTopic = true;
  }

  handleTopicAdded(): void {
    this.pageNumber = 1;
    this.topics.result = [];
    this.loadTopics(); 
  }
  viewTopics(list:Stage){
     
    console.log("Res => "+list)
    console.log("From Children " +  list.topicId);
    let indexTopic= this.topics.result.findIndex(t => t.id === list.topicId);
    console.log();
    let dataTopic = this.topics.result[indexTopic];


    dataTopic.stages.splice(dataTopic.stages.length - 1 ,0,list);


  }

  loadTopics(pageIndex :number = 0 , isScroll :boolean = false, _default :boolean = false): void {
    if (this.loading || !this.hasMoreData) return;
    this.loading = true;
   

   if(isScroll ){
    if(this.topics.totalPages > this.pageNumber && this.topics.moveNext ){
      this.pageNumber++;

      this._topicService.getAllTopic(2,pageIndex !== 0 ? pageIndex : this.pageNumber, this.pageSize).subscribe((response: any) => {
        if (response.success) {
  
          this.topics.result = [...this.topics.result,...response.result];
  
      
  
         
      
        } else {
          this.hasMoreData = false;
        }
        this.loading = false;
      });
  
    }
   }

 
   else{
    this._topicService.getAllTopic(2,pageIndex !== 0 ? pageIndex : 1 , this.pageSize).subscribe((response: any) => {
      if (response.success) {

        this.topics = response; 

       
    
      }
       else {
        this.hasMoreData = false;
      }
      this.loading = false;
    });
   }


  }


  setDefaultTopic(id:number ):void {
    this._topicService.setDefaultTopic(id).subscribe((res) => {
      if (res.success) {
        let newDefaultTopicIndex = this.topics.result.findIndex(topic => topic.id === res.result.newDefaultTopicId);
         this.topics.result[newDefaultTopicIndex].default = true;
       let oldDefaultTopicIndex = this.topics.result.findIndex(topic => topic.id === res.result.oldDefaultTopicId);
       this.topics.result[oldDefaultTopicIndex].default = false;
      } else {
        console.error('Failed to set default topic:', res);
      }
   

    });
  }
  onTopicSetDefualt(id:number){
    console.log("From default topic  " + id);
    this.setDefaultTopic(id);



  }


  getTopicbyID(): void {
    this.showsViewTopic = true;
  
  }

  closePopup(): void {
    this.showsViewTopic = false;
  }
  ngOnInit(): void {
    this.loadTopics();

  }


  getBoxShadow(hex: string, opacity: number): string {
    // إزالة # إذا كان موجودًا
    hex = hex.replace(/^#/, '');
  
    // التأكد من أن اللون يحتوي على 6 حروف على الأقل
    if (hex.length !== 6) {
      console.warn('لون غير صالح:', hex);
      return '0px 1px 3px rgba(0, 0, 0, 0.1)'; // لون افتراضي في حالة الخطأ
    }
  
    // تحويل لون HEX إلى RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
  
    // إرجاع box-shadow مع الشفافية المطلوبة
    return `0px 1px 10px rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  

}
