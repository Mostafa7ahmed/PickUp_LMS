import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TopPopComponent } from '../../top-pop/top-pop.component';
import { TopicService } from '../../../Core/Services/topic.service';

@Component({
  selector: 'app-editpopuptopic',
  standalone: true,
  imports: [FormsModule, NzSelectModule, NzModalModule, ReactiveFormsModule, CommonModule, NzButtonModule, NzIconModule, NzTabsModule, TopPopComponent],
  templateUrl: './editpopuptopic.component.html',
  styleUrl: './editpopuptopic.component.scss'
})
export class EditpopuptopicComponent implements OnChanges {

  @Input() twovisible: boolean = false; // show popup
  @Input() topicList: any; // send from parent
  StageList: any;
  topicId: number = 0;

  maxStages: number = 0;
  firstStage = { color: 'green', name: 'New' };
  lastStage = { color: 'red', name: 'Published' };

  newStages: { name: string; color: string; icon: string; order: number }[] = [];
 
  private _FormBuilder = inject(FormBuilder);
  private _TopicService = inject(TopicService);

  editForm: FormGroup = this._FormBuilder.group({
    topicId: [this.topicId],
    name: ['', Validators.required],
    color: ['green', Validators.required],
    icon: ['fa fa-address-book'],
    order: [this.maxStages]
  });

  handleCancelTwo() {
    this.twovisible = false;
  }

  addStage() {
    if (this.maxStages < 8) {
      const name = this.editForm.get('name')?.value || 'ahmed'; 
      const color = this.editForm.get('color')?.value || 'green';
      let newStage = {
        name: name,
        color: color,
        icon: 'fa fa-address-book',
        order: this.maxStages + 2
      };
      this.newStages.push(newStage);
      
      this.maxStages++;


      console.log(newStage)
    }
    
  }

  removeStage(index: number) {
    this.newStages.splice(index, 1); 
    this.maxStages--;
  }

  addStages() {
    if (this.newStages.length === 0) {
      console.error('No stages to add.');
      return;
    }

    const requestBody = {
      topicId: this.topicId,
      stages: this.newStages.map((stage) => ({
        name: stage.name,
        color: stage.color,
        icon: stage.icon,
        order: stage.order
      }))
    };

    console.log('Request Body:', requestBody);

    this._TopicService.addstages(requestBody).subscribe({
      next: (res) => {
        console.log('Stages added successfully:', res);
        this.handleCancelTwo();
        this.newStages = [];
        this.maxStages = 0;
        this.editForm.reset({
          name: '',
          color: 'green',
          icon: 'fa fa-address-book',
          order: 2
        });
      },
      error: (err) => {
        console.error('Error adding stages:', err);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topicList']) {
      this.StageList = changes['topicList'].currentValue;
      this.topicId = this.StageList.id;
    }
  }
}