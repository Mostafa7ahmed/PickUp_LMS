import { TopicResult } from './../../Core/Interface/itopic';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { SpliceDescreptionPipe } from '../../Core/Pipe/splice-descreption.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { GetoneTopicService } from '../../Service/getone-topic.service';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { CommonModule, DatePipe } from '@angular/common';
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { ConvertColorService } from '../../../../Core/Shared/service/convert-color.service';

@Component({
  selector: 'app-view-topicand-stage',
  standalone: true,
  imports: [RouterModule, TopPopComponent, CommonModule, SpliceDescreptionPipe, DatePipe, TooltipModule],
  templateUrl: './view-topicand-stage.component.html',
  styleUrls:[ './view-topicand-stage.component.scss']
})
export class ViewTopicandStageComponent {


  topicId: number = 0; 
  TopicResult: IResponseOf<TopicResult> = {} as IResponseOf<TopicResult>;
  bgColor:string ='';
  showEdit:boolean = false;
  selectedStaged: number | null = null;

  private _getoneTopicService = inject(GetoneTopicService);
  private _convertColorService = inject(ConvertColorService)
  private routerSubscription!: Subscription; // متغير لتخزين الاشتراك

  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router) {
    this.routerSubscription = this._Router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAndFetchTopic();
      });
  }
  closeViewTopic(){
    this._Router.navigate([{ outlets: { dialog: null } }]);

  }
  toggleShow() {
    this.showEdit = !this.showEdit;
  }
  toggleShowStage(stageId: number | null) {
    this.selectedStaged = this.selectedStaged === stageId ? null : stageId;
  }

  getTopicById(topicId: number) {
    if (!topicId || topicId === 0) {
      console.warn('Invalid topicId:', topicId);
      return; 
    }
  
   this._getoneTopicService.getTopicById(topicId).subscribe({
      next: (response) => {
        if (response.success) {
          this.TopicResult.result = response.result;
          this.bgColor = this._convertColorService.convertHexToRgba(this.TopicResult.result.color, 0.4);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  
  openPopup() {

    this._Router.navigate([
      { outlets: { dialog: ['ViewTopic', this.topicId], dialog2: ['addStage', this.topicId] } }
    ]);

    }
  
    checkAndFetchTopic() {
      const hasDialogOutlet = this._ActivatedRoute.snapshot.outlet === 'dialog';
  
      if (hasDialogOutlet && this.topicId) {
        this.getTopicById(this.topicId);
      }
    }

  
    ngOnInit(): void {
      this._ActivatedRoute.params.subscribe(params => {
        if (params['id'] && params['id'] !== '0') {
          this.topicId = +params['id'];
          this.checkAndFetchTopic();
        }
      });
    }

    ngOnDestroy(): void {
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe(); // إلغاء الاشتراك عند تدمير الـ Component
      }
    }
    
}
