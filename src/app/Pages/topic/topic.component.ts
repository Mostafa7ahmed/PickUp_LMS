import { ITpoic, Result } from './../../Core/Interface/itopic';
import { ChangeDetectorRef, Component, HostListener, inject, OnInit } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../Core/Services/topic.service';
import { SelectIconComponent } from "../../Components/select-icon/select-icon.component";
import { PopaddtopicComponent } from "../../Components/Pop_instructor/popaddtopic/popaddtopic.component";
import { TopPopComponent } from '../../Components/top-pop/top-pop.component';
import { ViewtpoicComponent } from "./Components/viewtpoic/viewtpoic.component";
import { finalize, Subscription } from 'rxjs';
import { DeleteStageComponent } from "./Components/delete-stage/delete-stage.component";
import { AddStagesComponent } from "./Components/add-stages/add-stages.component";
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
  moveNext:boolean = false;
  movePrevious:boolean = false;
  lastScrollTop:number = 0



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

  loadTopics(pageIndex ?:number ): void {
    if (this.loading || !this.hasMoreData) return;
 
    this.loading = true;
    this._topicService.getAllTopic(2,pageIndex ? pageIndex : this.pageNumber, this.pageSize).subscribe((response: any) => {
      if (response.success) {


         this.topics = response;
         this.moveNext = response.moveNext;
         this.movePrevious = response.movePrevious;
         console.log(this.moveNext)

        this.topics.result.push(...response.result);

    
        this.pageNumber++;
      } else {
        this.hasMoreData = false;
      }
      this.loading = false;
    });
  }


  setDefaultTopic(id:number , oldpage:number):void {
    this._topicService.setDefaultTopic(id).subscribe((res) => {
      if (res.success) {

        this.topics.result = []; 
        this.loadTopics(oldpage); 
        // this.getTopicbyID(id)
      } else {
        console.error('Failed to set default topic:', res);
      }
   

    });
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // error message
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);



    if ((documentHeight - (scrollPosition + windowHeight) < 100 )&&( scrollPosition > this.lastScrollTop)) {
      console.log("Scrolling Down ⬇️");
      if(this.moveNext){

        this.loadTopics();
      }
    } else if (scrollPosition < this.lastScrollTop) {
    
    }

    this.lastScrollTop = scrollPosition; 

  }

  getTopicbyID(id: number): void {
    this.currentTopicId = id;
    this.showsViewTopic = true;
    this.subscription = this._topicService.getTopicById(id)
      .subscribe((response: any) => {
        if (response.success) {
          
          this.viewTopicData = response.result;

          console.log(response);
        } else {
          this.showsViewTopic = false;
          console.error('Failed to get topic:', response);
        }
      });
  }

  closePopup(): void {
    this.showsViewTopic = false;
  }
  ngOnInit(): void {
    this.loadTopics();

  }

}
