import { TopicResult } from './../../Core/Interface/itopic';
import { Component, HostListener, inject } from '@angular/core';
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
import { SetDefaultStageService } from '../../../Stages/Core/service/set-default-stage.service';
import { SetDefaultTopicService } from '../../Service/set-default-topic.service';

@Component({
  selector: 'app-view-topicand-stage',
  standalone: true,
  imports: [RouterModule, TopPopComponent, CommonModule, SpliceDescreptionPipe, DatePipe, TooltipModule],
  templateUrl: './view-topicand-stage.component.html',
  styleUrls: ['./view-topicand-stage.component.scss']
})
export class ViewTopicandStageComponent {


  topicId: number = 0;
  TopicResult: IResponseOf<TopicResult> = {} as IResponseOf<TopicResult>;
  bgColor: string = '';
  showEdit: boolean = false;
  selectedStaged: number | null = null;
  isDefaultTopic: boolean = false;

  private _getoneTopicService = inject(GetoneTopicService);
  private _convertColorService = inject(ConvertColorService);
  private _SetDefaultStageService = inject(SetDefaultStageService)
  private _SetDefaultTopicService = inject(SetDefaultTopicService)

  private routerSubscription!: Subscription; // متغير لتخزين الاشتراك

  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router) {
    this.routerSubscription = this._Router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAndFetchTopic();
      });
  }
  closeViewTopic() {
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
          this.isDefaultTopic = response.result.default;
          this.bgColor = this._convertColorService.convertHexToRgba(this.TopicResult.result.color, 0.4);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  setDefaultTopic(topicId: number): void {
    this._SetDefaultTopicService.setDefaultTopic(topicId).subscribe({
      next: (res) => {
        if (res.success && res.result) {
          this.isDefaultTopic = true;
        
          this.showEdit = false;  
        } else {
          console.error('Failed to set default topic:', res);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  setDefaultStage(id: number, topicId: number): void {
    this._SetDefaultStageService.setDefaultStage(topicId, id).subscribe({
      next: (res) => {
        if (res.success && res.result) {
          const { newDefaultTopicId, oldDefaultTopicId } = res.result;
          if (this.TopicResult?.result?.stages && Array.isArray(this.TopicResult.result.stages)) {
            let newDefaultStage = this.TopicResult.result.stages.find(stage => stage.id === newDefaultTopicId);
            if (newDefaultStage) newDefaultStage.default = true;
            let oldDefaultStage = this.TopicResult.result.stages.find(stage => stage.id === oldDefaultTopicId);
            if (oldDefaultStage) oldDefaultStage.default = false;
          }
          this.toggleShowStage(null)
        } else {
          console.error('Failed to set default topic:', res);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  openPopupAddStage() {

    this._Router.navigate([
      { outlets: { dialog: ['ViewTopic', this.topicId], dialog2: ['addStage', this.topicId] } }
    ]);


  }
  openPopupEdittage(stageID: number) {

    this._Router.navigate([
      { outlets: { dialog: ['ViewTopic', this.topicId], dialog2: ['editStage', stageID] } }
    ]);
    this.selectedStaged = null;

  }

  checkAndFetchTopic() {
    const hasDialogOutlet = this._ActivatedRoute.snapshot.outlet === 'dialog';
    if (hasDialogOutlet && this.topicId) {
      this.getTopicById(this.topicId);
    }
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.selectedStaged !== null) {
      this.toggleShowStage(null);
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
      this.routerSubscription.unsubscribe();
    }
  }

}
