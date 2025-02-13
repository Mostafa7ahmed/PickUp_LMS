import { Result } from './../../../../Core/Interface/itopic';
import { TopicService } from './../../../../Core/Services/topic.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject, OnInit, SimpleChanges } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { ITpoic, Stage } from '../../../../Core/Interface/itopic';
import { CommonModule, NgIf } from '@angular/common';
import { DeleteStageComponent } from "../delete-stage/delete-stage.component";
import { StageService } from '../../../../Core/Services/stage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewTopic } from '../../../../Core/Interface/view-topic';

@Component({
  selector: 'app-viewtpoic',
  standalone: true,
  imports: [TopPopComponent, CommonModule, DeleteStageComponent],
  templateUrl: './viewtpoic.component.html',
  styleUrl: './viewtpoic.component.scss'
})
export class ViewtpoicComponent  implements OnInit { 

  constructor(private _TopicService:TopicService ,private cdr: ChangeDetectorRef, private _StageService:StageService ) {

  }

 


   listStage:any[] =[];

  private fb = inject(FormBuilder);
  stage: FormGroup = this.fb.group({
    topicId: [null, Validators.required], 
    name: ['eeeee', Validators.required],
    color: ['green', Validators.required],
    icon: ['fa-ff', Validators.required],
    order: [null],
  });
  @Input() viewTopic:boolean = false;
      viewTopicData: ViewTopic | null = null;
  @Input() topicId :any ;

  @Output() closePopup = new EventEmitter<void>();
  @Input() getTopicbyIDValue: (id: number) => void = () => {}; 
  @Input() getListTopic: any; 
  @Output() topicsUpdated = new EventEmitter<Stage>();  // child ==> parent 

  @Output() onTopicSetDefualt = new EventEmitter<number>(); 






  showDeleteTopic:boolean = false;
  selectedTopicId!: number;

  

  addSatge(topicId: number): void {
    if (!this.viewTopicData) {
      console.error("viewTopicData is undefined");
      return;
    }

    this.stage.patchValue({ topicId });
    this._StageService.addStage(this.stage.value).subscribe((response: any) => {
      if (response.success) {
        
        this.topicsUpdated.emit(response.result); 

        this.listStage = this.viewTopicData?.result.stages.sort((a: any, b: any) => a.order - b.order)!;
        
        this.viewTopicData?.result.stages.splice(this.listStage.length - 1 ,0,response.result)!;


      } else {
        console.error("Error: ", response.message);
      }
    });
  }

  getTopicbyID(): void {

     this._TopicService.getTopicById(this.topicId)
      .subscribe((response: any) => {
        if (response.success) {

          console.log(response)

          this.viewTopicData = response;
          this.cdr.detectChanges(); // يجبر Angular على إعادة تحديث المكون
          this.cdr.markForCheck(); // يجبر Angular على إعادة تحديث المكون



        } else {

          console.error('Failed to get topic:', response);
        }
      });
  }



  setDefaultTopic(id:number ):void {
    if(this.viewTopicData !== null){
      this.viewTopicData.result.default = true;

    }
    this.onTopicSetDefualt.emit(id);
  }
 



  deleteTpoic(topicId: number): void {
    console.log("first delete");
    this.showDeleteTopic = true;
    this.selectedTopicId = topicId;


  }

  closePopupHandler(): void {
    this.closePopup.emit();
  }
 

  notifyParentToUpdateTopics(): void {
    this.topicsUpdated.emit(); 
  }

  ngOnInit(): void {
    console.log("first update")

    console.log("last update")
 }

 ngOnChanges(changes: SimpleChanges): void {
  if (changes['topicId'] && changes['topicId'].currentValue) {
    console.log("Topic ID changed, fetching data...");
    this.viewTopicData = null;
    this.getTopicbyID();
  }
}

}
