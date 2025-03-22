import { Component, inject, OnInit } from '@angular/core';
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
export class DeleteTopicComponent implements OnInit {
  private router = inject(Router);
  private _deleteTopicService = inject(DeleteTopicService);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _topiclistService = inject(TopiclistService);
  isConfirmTopic : boolean = false;
  isDeleteTopic : boolean = false;
  isMoveTopic : boolean = false;
  topicsList: ItopicList[] = [];
  stageList: Stage[] = [];
  selectStageDefault: any
  selectTopicDefault: any
  selectedTopicId: number | null = null;
  isLoadTopic: boolean = false

  OpenMoveTopic(){
    this.isConfirmTopic =!this.isConfirmTopic;
    this.isMoveTopic =!this.isMoveTopic;

  }
  OpenDeleteTopic(){
    this.isDeleteTopic =!this.isDeleteTopic;
    this.isConfirmTopic =!this.isConfirmTopic;

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
      console.log('Selected Stage ID:', selectedId);
    }
  
    deleteTopic() {
      const deleteId = this._ActivatedRoute.snapshot.paramMap.get('deleteId');
    
      if (deleteId) {
        if (this.isMoveTopic) {
          this._deleteTopicService.deleteTpoic(
            +deleteId,
            true,
            this.selectTopicDefault.id,
            this.selectStageDefault.id
          ).subscribe((res: any) => {
            console.log(res);
            this.closePopup();
          });
        } else {
          this._deleteTopicService.deleteTpoic(+deleteId, false).subscribe((res: any) => {
            console.log(res);
            this.closePopup();
          });
        }
      }
    }
  ngOnInit(): void {
    this.getTopicList()

  }












  closePopup() {
    this.router.navigate([{ outlets: { dialog2: null } }]);
  }
}
