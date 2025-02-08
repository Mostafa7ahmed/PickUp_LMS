import { TopicService } from './../../../../Core/Services/topic.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { ITpoic } from '../../../../Core/Interface/itopic';
import { CommonModule, NgIf } from '@angular/common';
import { DeleteStageComponent } from "../delete-stage/delete-stage.component";

@Component({
  selector: 'app-viewtpoic',
  standalone: true,
  imports: [TopPopComponent, CommonModule, DeleteStageComponent],
  templateUrl: './viewtpoic.component.html',
  styleUrl: './viewtpoic.component.scss'
})
export class ViewtpoicComponent {

  constructor(private _TopicService:TopicService) {}

  @Input() viewTopic:boolean = false;
  @Input() viewTopicData : ITpoic | any = {} as ITpoic ;
  @Output() closePopup = new EventEmitter<void>();
  @Input() getTopicbyIDValue: (id: number) => void = () => {}; // الدالة من الأب

  showDeleteTopic:boolean = false;
  selectedTopicId!: number; // تخزين ID الموضوع

  fetchTopic(id: number): void {
    this.getTopicbyIDValue(id)
    
  }

  deleteTpoic(topicId: number): void {
    console.log("first delete");
    this.showDeleteTopic = true;
    this.selectedTopicId = topicId;


  }

  closePopupHandler(): void {
    this.closePopup.emit();
  }
 
  @Output() topicsUpdated = new EventEmitter<void>(); 

  notifyParentToUpdateTopics(): void {
    this.topicsUpdated.emit(); 
  }
  

}
