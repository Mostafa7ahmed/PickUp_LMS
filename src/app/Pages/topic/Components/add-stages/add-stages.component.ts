import { Result } from './../../../../Core/Interface/itopic';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IStage } from '../../../../Core/Interface/istage';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { TopicService } from '../../../../Core/Services/topic.service';
import { ColorlistService } from '../../../../Core/Shared/service/colorlist.service';

@Component({
  selector: 'app-add-stages',
  standalone: true,
  imports: [TopPopComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './add-stages.component.html',
  styleUrl: './add-stages.component.scss'
})
export class AddStagesComponent implements OnChanges , OnInit{
  maxStages = 8;
  colors: any[] = [];

  @Input() topicList!: IStage;
  @Input() isAddPopupVisible: boolean = false;
  @Output() isAddPopupVisibleChange = new EventEmitter<boolean>();
  private _TopicService = inject(TopicService);
  private _colorlistService = inject(ColorlistService);


  stageForm: FormGroup = new FormGroup({
    topicId: new FormControl(null),
    stages: new FormArray([])
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topicList'] && this.topicList) {
      this.createFormStage();
    }
  }
  ngOnInit(): void {
    this.colors = this._colorlistService.getColors();

  }

  createFormStage() {
    this.stageForm = new FormGroup({
      topicId: new FormControl(this.topicList?.id || null), 
      stages: new FormArray([])
    });
  }

  get stages(): FormArray {
    return this.stageForm?.get('stages') as FormArray || new FormArray([]);   
  }

  addStage() {
    if (this.stages.length >= this.maxStages) return;
    const orderValue = this.stages.length + 2;
    this.stages.push(new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      color: new FormControl('red', Validators.required),
      icon: new FormControl('fa fa-address-book', Validators.required),
      order: new FormControl(orderValue)
    }));
  }

  removeStage(index: number) {
    this.stages.removeAt(index);
  }

  handleCancel() {
    this.isAddPopupVisible = false;
    this.isAddPopupVisibleChange.emit(false);
  }

  addStageToAPi() {
     this._TopicService.addstages(this.stageForm.value).subscribe({
      next: (response) => {
        console.log(  "Input => " + this.topicList.stages) // Input response
        this.topicList.stages = response.result.stages;
        console.log(   "response => " + this.topicList.stages)

        this.isAddPopupVisible = false;
        this.isAddPopupVisibleChange.emit(false);
      },
      error: (error) => {
        console.error("Error adding stages:", error);
      }
     })
  
  }
}
