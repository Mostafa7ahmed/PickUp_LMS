import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteTopicService } from '../../Service/delete-topic.service';
import { TopiclistService } from '../../Service/topiclist.service';
import { CommonModule } from '@angular/common';
import { CustomslectwithiconComponent } from "../../../Courses/Components/customslectwithicon/customslectwithicon.component";
import { ItopicList, Stage } from '../../Core/Interface/itopic-list-result';
import { ITopiclist } from '../../../Courses/Core/interface/itopiclist';
import { CoustomSelectStageComponent } from "../../../Courses/Components/coustom-select-stage/coustom-select-stage.component";

@Component({
  selector: 'app-delete-topic',
  standalone: true,
  imports: [TopPopComponent, CommonModule, CustomslectwithiconComponent, CoustomSelectStageComponent],
  templateUrl: './delete-topic.component.html',
  styleUrl: './delete-topic.component.scss'
})
export class DeleteTopicComponent implements  OnChanges {
  private _deleteTopicService = inject(DeleteTopicService);
  private _topiclistService = inject(TopiclistService);
  @Input() isConfirmTopic: boolean = false;
  @Input() isDeleteTopic: boolean = true;
  @Input() isMoveTopic: boolean = false;
  topicsList: ItopicList[] = [];
  stageList: Stage[] = [];
  selectStageDefault: any
  selectTopicDefault: any
  selectedTopicId: number | null = null;
  isLoadTopic: boolean = false


  @Input() deleteId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() topicDeleted = new EventEmitter<number>();

  OpenMoveTopic() {
    this.isConfirmTopic = !this.isConfirmTopic;
    this.isMoveTopic = !this.isMoveTopic;

  }
  OpenDeleteTopic() {
    this.isDeleteTopic = !this.isDeleteTopic;
    this.isConfirmTopic = !this.isConfirmTopic;

  }
  getTopicList() {
    this._topiclistService.getAlllits().subscribe(topics => {
      this.topicsList = topics.result;
      this.isLoadTopic = true;

      let defautlTopic = this.topicsList.find((e: ITopiclist) => e.default);
      console.log("Default Topic: ", defautlTopic);
      if (!defautlTopic) defautlTopic = this.topicsList[0];
      this.stageList = defautlTopic.stages.filter((stage: Stage) => stage.type !== 2);
      console.log("Filtered Stages: ", this.stageList);
      let defautlStage = this.stageList.find((stage: Stage) => stage.default);
      console.log("Default Stage: ", defautlStage);
      if (!defautlStage) defautlStage = this.stageList[0];
      this.selectTopicDefault = defautlTopic;
      this.selectStageDefault = defautlStage;

    });

  }

  onTopicSelected(selectedId: number) {
    this.selectedTopicId = selectedId;
    const selectedTopic = this.topicsList.find((topic: ITopiclist) => topic.id === selectedId);
    this.stageList = selectedTopic?.stages.filter((stage: Stage) => stage.type !== 2) ?? [];

    let defautlStage = this.stageList.find((e: Stage) => e.default);
    this.selectStageDefault = defautlStage;

    console.log('Selected Topic ID:', defautlStage);


  }

  onStageSelected(selectedId: number) {
    const selectedStage = this.stageList.find((stage: Stage) => stage.id === selectedId);
    this.selectStageDefault = selectedStage;
    console.log('Selected Stage:', this.selectStageDefault);
  }
  deleteTopic() {
    const deleteId = this.deleteId;

    if (deleteId) {
      if (this.isMoveTopic) {
        this._deleteTopicService.deleteTpoic(
          +deleteId,
          true,
          this.selectTopicDefault.id,
          this.selectStageDefault.id
        ).subscribe((res: any) => {
          console.log(res);
          this.topicDeleted.emit(deleteId);  // <== Emit هنا

          this.closePopup();
        });
      } else {
        this._deleteTopicService.deleteTpoic(+deleteId, false).subscribe((res: any) => {
          console.log(res);
          this.topicDeleted.emit(deleteId);
          this.closePopup();
        });
      }
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isConfirmTopic'] && this.isConfirmTopic) {
      this.getTopicList();
    }
  }










  closePopup() {
    this.close.emit();
  }
}
