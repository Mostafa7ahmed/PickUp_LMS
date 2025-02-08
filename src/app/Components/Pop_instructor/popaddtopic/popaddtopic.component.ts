import { ColorlistService } from './../../../Core/Shared/service/colorlist.service';
import { IconListService } from './../../../Core/Shared/service/icon-list.service';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectIconComponent } from '../../select-icon/select-icon.component';
import { TopPopComponent } from "../../top-pop/top-pop.component";
import { TopicService } from '../../../Core/Services/topic.service';
import { EditpopuptopicComponent } from '../editpopuptopic/editpopuptopic.component';

@Component({
  selector: 'app-popaddtopic',
  standalone: true,
  imports: [
    FormsModule, NzSelectModule, NzModalModule, CommonModule, 
    NzButtonModule, NzIconModule, NzTabsModule, ReactiveFormsModule,
    SelectIconComponent, TopPopComponent, EditpopuptopicComponent
  ],
  templateUrl: './popaddtopic.component.html',
  styleUrl: './popaddtopic.component.scss'
})
export class PopaddtopicComponent {
  icons: any[] = [];
  colors: any[] = [];
  topicList!: any;  // لتخزين `id` المستلم من الاستجابة

  private _FormBuilder = inject(FormBuilder);
  private _Topic = inject(TopicService);
  selectedValue: string | null = null;

  optionsList = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'Tom', value: 'tom' }
  ];

  myForm: FormGroup = this._FormBuilder.group({
    name: ['', Validators.required],
    color: ['bg-light'],  
    icon: ['fa fa-address-book'], 
    description: ['', [Validators.required, Validators.maxLength(500)]],
    isMain: [false, [Validators.required]],
    mainId: [null],
  });

  constructor(private iconsService: IconListService, private colorlistService: ColorlistService) {
    this.icons = this.iconsService.getIcons();
    this.colors = this.colorlistService.getColors();
  }

  @Input() isAddPopupVisible: boolean = false;
  @Input() twovisible: boolean = false;

  @Output() isAddPopupVisibleChange = new EventEmitter<boolean>();

  currentIcon: string = 'fa fa-address-book';
  colorDefault: string = "bg-light";
  ishowTab: boolean = false;

  ngOnInit() {
    this.myForm.get('isMain')?.valueChanges.subscribe((isMain) => {
      if (isMain) {
        this.myForm.get('mainId')?.setValue(null);
        this.myForm.get('mainId')?.disable();
      } else {
        this.myForm.get('mainId')?.enable();
        this.myForm.get('mainId')?.setValue(null);
      }
    });
  }

  handleIconSelected(icon: string) {
    this.currentIcon = icon;
    this.myForm.controls['icon'].setValue(icon || 'fa fa-address-book');  
  }

  handleColorSelected(color: string) {
    this.colorDefault = color;
    this.myForm.controls['color'].setValue(color);
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
    this.myForm.get('mainId')?.setValue(selectedValue);
  }
  @Output() onTopicAdded = new EventEmitter<void>(); // حدث جديد

  addTopic() {
    if (this.myForm.valid) {

      this._Topic.addTopic(this.myForm.value).subscribe((res) => {
        this.topicList = res.result;
        this.twovisible = true;
        this.handleCancel();

        this.myForm.reset();
        this.currentIcon ='fa fa-address-book';
        this.colorDefault = "bg-light";
        this.onTopicAdded.emit();

      });
    }
  }


}
