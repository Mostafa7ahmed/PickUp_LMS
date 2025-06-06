import {
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AllStagesComponent } from '../all-stages/all-stages.component';
import { PaginateTopicService } from '../../Service/paginate-topic.service';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { TopicResult } from '../../Core/Interface/itopic';
import { CommonModule, DatePipe } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { SetDefaultTopicService } from '../../Service/set-default-topic.service';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteTopicComponent } from '../delete-topic/delete-topic.component';

@Component({
  selector: 'app-all-topic',
  standalone: true,
  imports: [AllStagesComponent, DeleteTopicComponent, CommonModule, RouterLink,TooltipModule, TranslateModule, DatePipe],
  templateUrl: './all-topic.component.html',
  styleUrl: './all-topic.component.scss',
})
export class AllTopicComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(private router: Router) {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      if (event.url === '/topics') {
        this.getAllTopics();
      }
    });
  }

  //Values
  isShown: boolean = false;
  paginationTpoicsResponse: IPaginationResponse<TopicResult> = {} as IPaginationResponse<TopicResult>;
  selectedTopicId: number | null = null;
  pageNumber = 1;
  pageSize = 80;
  loading = false;
  hasMoreData = true;
  isVisible = false;
  isSuccess = true;
  showPopup = false;

  //Values

  //Injecration
  private readonly _SetDefaultTopicService = inject(SetDefaultTopicService);
  private readonly _topicService = inject(PaginateTopicService);

  //Injecration

  //Funcation

  toggleShow(topicId: number | null) {
    this.selectedTopicId = this.selectedTopicId === topicId ? null : topicId;
  }

  getAllTopics() {
    this.subscription = this._topicService.getTopics().subscribe({
      next: (res) => {
        this.paginationTpoicsResponse = res;
        console.log('All Topics', this.paginationTpoicsResponse);
      },
      error: (error) => {
        console.error('Error fetching topics', error);
      },
    });
  }



  setDefaultTopic(id: number): void {
    this._SetDefaultTopicService.setDefaultTopic(id).subscribe((res) => {
      if (res.success) {
        let newDefaultTopicIndex =
          this.paginationTpoicsResponse.result.findIndex(
            (topic) => topic.id === res.result.newDefaultTopicId
          );
        this.paginationTpoicsResponse.result[newDefaultTopicIndex].default =
          true;
        let oldDefaultTopicIndex =
          this.paginationTpoicsResponse.result.findIndex(
            (topic) => topic.id === res.result.oldDefaultTopicId
          );
        this.paginationTpoicsResponse.result[oldDefaultTopicIndex].default =
          false;
        this.selectedTopicId = null;
      } else {
        console.error('Failed to set default topic:', res);
      }
    });
  }

  ngOnInit(): void {
    this.getAllTopics();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  openViewTopic(id: any) { 
    this.router.navigate([{ outlets: { dialog: ['ViewTopic', id] } }]);
  }
  isDeletePopupVisible = false;
  selectedDeleteId: number | null = null;
  isConfirmTopic = false;
  isDeleteTopic = true;
  isMoveTopic = false;

  openDeletePopup(topicId: number , hasCourses : boolean = false){

    if (!hasCourses) {
      this.isConfirmTopic = false;
      this.isDeleteTopic = true;
      this.isMoveTopic = false;
      this.selectedDeleteId = topicId;
        this.isDeletePopupVisible = true;
        console.log(hasCourses)
        this.toggleShow(null)
    }
    else {
      this.isConfirmTopic = true;
      this.isDeleteTopic = false;
      this.isMoveTopic = false;
      this.selectedDeleteId = topicId;
        this.isDeletePopupVisible = true;
        console.log(hasCourses)
        this.toggleShow(null)
    }

  }

  closeDeletePopup() {
    this.isDeletePopupVisible = false;
    this.selectedDeleteId = null;
  }
  handleDeletedTopic(deletedId: number) {
    this.paginationTpoicsResponse.result = this.paginationTpoicsResponse.result.filter(topic => topic.id !== deletedId);
    this.closeDeletePopup();
  }

  openEditTopic(idTopic: number) { 
    this.router.navigate([{ outlets: { dialog: ['editTopic', idTopic] } }]);

    this.toggleShow(null)
  }
}
