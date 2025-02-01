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
import { EditpopuptopicComponent } from "../../editpopuptopic/editpopuptopic.component";
import { TopicService } from '../../../Core/Services/topic.service';

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
  private cdr = inject(ChangeDetectorRef);


  myForm: FormGroup = this._FormBuilder.group({
    name: ['', Validators.required],
    color: ['', Validators.required],  
    icon: ['', Validators.required],   
    description: ['', Validators.maxLength(500)],
    mainId: null,
    isMain: true
  });

  constructor(private iconsService: IconListService, private colorlistService: ColorlistService) {
    this.icons = this.iconsService.getIcons();
    this.colors = this.colorlistService.getColors();
  }

  @Input() isAddPopupVisible: boolean = false;
  @Input() twovisible: boolean = false;

  @Output() isAddPopupVisibleChange  = new EventEmitter<boolean>();

  currentIcon: string = 'fa fa-address-book';
  colorDefault: string = "bg-light";
  selectedValue: string | null = null;
  ishowTab: boolean = false;

  handleIconSelected(icon: string) {
    this.currentIcon = icon;
    this.myForm.controls['icon'].setValue(icon)
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
    this.isAddPopupVisibleChange .emit(false);
  }

  addTopic() {
    if (this.myForm.valid) {
      this._Topic.addTopic(this.myForm.value).subscribe((res) => {
        this.myForm.reset();
        this.topicList = res.result

        this.handleCancel();
        this.twovisible =true;

      });
    }
  }
}
