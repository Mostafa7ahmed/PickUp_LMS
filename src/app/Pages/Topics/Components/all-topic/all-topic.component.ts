import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AllStagesComponent } from "../all-stages/all-stages.component";
import { PaginateTopicService } from '../../Service/paginate-topic.service';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { TopicResult } from '../../Core/Interface/itopic';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-topic',
  standalone: true,
  imports: [AllStagesComponent, CommonModule , DatePipe],
  templateUrl: './all-topic.component.html',
  styleUrl: './all-topic.component.scss'
})
export class AllTopicComponent  implements OnInit , OnDestroy {

  private subscription: Subscription = new Subscription();

  //Values 
  isShown: boolean = false;
    paginationTpoicsResponse: IPaginationResponse<TopicResult> = {} as IPaginationResponse<TopicResult>;
    selectedTopicId: number | null = null;

  //Values 

 //Injecration
   private readonly allStages = inject(PaginateTopicService)
  //Injecration

 
 


  //Funcation


  toggleShow(topicId: number) {

    this.selectedTopicId = this.selectedTopicId === topicId ? null : topicId;

  }


  ngOnInit(): void {
    this.subscription= this.allStages.getTopics().subscribe({
      next: (res) => {
        this.paginationTpoicsResponse = res;
        console.log('All Topics', this.paginationTpoicsResponse);
      },
      error: (error) => {
        console.error('Error fetching topics', error);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
