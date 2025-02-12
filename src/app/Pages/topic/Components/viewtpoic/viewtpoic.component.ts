import { TopicService } from './../../../../Core/Services/topic.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { ITpoic } from '../../../../Core/Interface/itopic';
import { CommonModule, NgIf } from '@angular/common';
import { DeleteStageComponent } from "../delete-stage/delete-stage.component";
import { StageService } from '../../../../Core/Services/stage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewtpoic',
  standalone: true,
  imports: [TopPopComponent, CommonModule, DeleteStageComponent],
  templateUrl: './viewtpoic.component.html',
  styleUrl: './viewtpoic.component.scss'
})
export class ViewtpoicComponent {

  constructor(private _TopicService:TopicService , private _StageService:StageService ) {}





  private fb = inject(FormBuilder);
  stage: FormGroup = this.fb.group({
    topicId: [null, Validators.required], // يمكنك تعيين `null` مؤقتًا
    name: ['name77', Validators.required],
    color: ['green', Validators.required],
    icon: ['fa-ff', Validators.required],
    order: [7, Validators.required],
  });
  @Input() viewTopic:boolean = false;
  @Input() viewTopicData : ITpoic | any = {} as ITpoic ;
  @Output() closePopup = new EventEmitter<void>();
  @Input() getTopicbyIDValue: (id: number) => void = () => {}; // الدالة من الأب

  showDeleteTopic:boolean = false;
  selectedTopicId!: number; // تخزين ID الموضوع

  fetchTopic(id: number): void {
    this.getTopicbyIDValue(id)
  }

  

  addSatge(topicId: number): void {
    if (!this.viewTopicData) {
      console.error("viewTopicData is undefined");
      return;
    }

    this.stage.patchValue({ topicId });

    this._StageService.addStage(this.stage.value).subscribe((response: any) => {
      if (response.success) {
         
        console.log(response)
   
        this.viewTopicData.stages.push(response.result);
      } else {
        console.error("Error: ", response.message);
      }
    });
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
