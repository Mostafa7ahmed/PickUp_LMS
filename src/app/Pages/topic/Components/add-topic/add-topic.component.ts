import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { SelectIconComponent } from '../../../../Components/select-icon/select-icon.component';
import { IconListService } from '../../../../Core/Shared/service/icon-list.service';
import { ColorlistService } from '../../../../Core/Shared/service/colorlist.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicService } from '../../../../Core/Services/topic.service';
import { AddStagesComponent } from "../add-stages/add-stages.component";
import { IStage } from '../../../../Core/Interface/istage';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [TopPopComponent, SelectIconComponent, CommonModule, ReactiveFormsModule, CommonModule, AddStagesComponent],
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.scss'
})
export class AddTopicComponent {
  selectedValue: string = 'Select Topic';
  options: any[] =[];
  icons: any[] = [];
  colors: any[] = [];
  topicList!: IStage;  
    
    private _FormBuilder = inject(FormBuilder);
    private _Topic = inject(TopicService);
  
    dataStage: FormGroup = this._FormBuilder.group({
      name: ['', Validators.required],
      color: ['bg-light'],  
      icon: ['fa fa-address-book'], 
      description: ['', [ Validators.maxLength(80)]],
      isMain: [false],
      mainId: [null],
    });
  
    constructor(private iconsService: IconListService, private colorlistService: ColorlistService) {
      this.icons = this.iconsService.getIcons();
      this.colors = this.colorlistService.getColors();
    }
  
    @Input() isAddPopupVisible: boolean = true;
     twovisible: boolean = false;
  
    @Output() isAddPopupVisibleChange = new EventEmitter<boolean>();
  
    currentIcon: string = 'fa fa-address-book';
    colorDefault: string = "bg-light";
    ishowTab: boolean = true;

    isOpen: boolean = false;

    toggleDropdown(): void {
      this.isOpen = !this.isOpen;
    }

    selectOption(option: any): void {
      this.selectedValue = option.name;
      this.dataStage.get('mainId')?.setValue(option.id);
      this.isOpen = false;
    }
  
    ngOnInit() {
      this.dataStage.get('isMain')?.valueChanges.subscribe((isMain) => {
        if (isMain) {
          this.dataStage.get('mainId')?.setValue(null);

          this.selectedValue ="Select Topic"

        } else {
          this.dataStage.get('mainId')?.enable();
        }
      });
      this.getAlllits()
    }
  
    handleIconSelected(icon: string) {
      this.currentIcon = icon;
      this.dataStage.controls['icon'].setValue(icon || 'fa fa-address-book');  
    }
  
    handleColorSelected(color: string) {
      this.colorDefault = color;
      this.dataStage.controls['color'].setValue(color);
    }
  
    showTab() {
      this.ishowTab = !this.ishowTab;
    }
  
    closeTab() {
      this.ishowTab = false;
    }
  
    handleCancel() {
      this.isAddPopupVisible = false;
      this.isAddPopupVisibleChange.emit(false);
    }
  
    updateMainId(event: Event) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      this.dataStage.get('mainId')?.setValue(selectedValue);
    }
    @Output() onTopicAdded = new EventEmitter<void>(); // حدث جديد
  
    addTopic() {
    let formData = { ...this.dataStage.value };

    if (!formData.name) {
      console.error('❌ Name is required!');
      return;
    }

    if (formData.isMain) {
      this.dataStage.get('mainId')?.setValue(null);
    }
     else {
      if (!formData.mainId) {
        console.error('❌ mainId is required when isMain is false!');
        return;
      }
  }
      if (this.dataStage.valid) {
  
        this._Topic.addTopic(this.dataStage.value).subscribe((res) => {
          this.topicList = res.result;
          this.twovisible = true;
          this.handleCancel();
          this.dataStage.reset();
          this.dataStage.patchValue({
            color: 'bg-light',
            icon: 'fa fa-address-book',
            isMain: false,
            mainId: null
          });
          this.currentIcon ='fa fa-address-book';
          this.colorDefault = "bg-light";
          this.selectedValue ="Select Topic"
          this.onTopicAdded.emit();
  
        });
      }
    }


    print(){
      console.log(this.dataStage.value)
    }


    getAlllits(){
      this._Topic.getAlllits().subscribe(({result}) => {

        this.options = result;
        console.log(result)
      });
    }

}
