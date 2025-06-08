import { Topic } from './../../../Courses/Core/interface/view-course';
import { TopicResult } from './../../Core/Interface/itopic';
import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CustomslectwithiconComponent } from '../../../Courses/Components/customslectwithicon/customslectwithicon.component';
import { IconListService } from '../../../../Core/Shared/service/icon-list.service';
import { ColorlistService } from '../../../../Core/Shared/service/colorlist.service';
import { SelectIconComponent } from '../../../../Components/select-icon/select-icon.component';
import { TopiclistService } from '../../Service/topiclist.service';
import { ITopiclist } from '../../../Courses/Core/interface/itopiclist';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddTopicService } from '../../Service/add-topic.service';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { AddStageTopicService } from '../../Service/add-stage-topic.service';
import { ReativeFormModule } from '../../../../Core/Shared/Modules/reative-form/reative-form.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [TopPopComponent, ReativeFormModule,TranslateModule, SelectIconComponent, CustomslectwithiconComponent, RouterModule],
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.scss'
})
export class AddTopicComponent implements OnInit {
  icons: string[] = [];
  colors: string[] = [];
  currentIcon: string = 'fa fa-file-pen';
  colorDefault: string = "#a0151e";
  ishowTab: boolean = true;
  isnext: boolean = true;
  selectedColors: string[] = [];
  maxStages = 8;
  isLoad: boolean = false;
  isVisble: boolean = true;
  isAddTopicPopupOpened: boolean = false;

  selectedValue: any
  topicsList: ITopiclist[] = [];
  openIndex: number | null = null;
  topicResult: IResponseOf<TopicResult> = {} as IResponseOf<TopicResult>;

  topicID: number = 0;

  private _topiclistService = inject(TopiclistService);
  private router = inject(Router);
  private colorlistService = inject(ColorlistService);
  private iconsService = inject(IconListService);
  private _FormBuilder = inject(FormBuilder);
  private _AddTopicService = inject(AddTopicService);
  private _AddStageTopicService = inject(AddStageTopicService);
private location = inject(Location);

  


  topicForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    color: ['#a0151e'],
    icon: ['fa fa-file-pen'],
    description: ['', [Validators.maxLength(300)]],
    isMain: [false],
    mainId: [null],
  });

  constructor() {
    this.icons = this.iconsService.getIcons();
    this.colors = this.colorlistService.getColors();
  }

  handleIconSelected(icon: string) {
    this.currentIcon = icon;
    this.topicForm.controls['icon'].setValue(icon);

  }

  handleColorSelected(color: string) {
    this.colorDefault = color;
    this.topicForm.controls['color'].setValue(color);

  }
  selectedTopicId: number | null = null;

  onTopicSelected(selectedId: number) {
    this.selectedTopicId = selectedId;
    console.log('Selected Topic ID:', selectedId);
  }


  showTab() {
    this.ishowTab = !this.ishowTab;
  }
  closePopup() {
      this.router.navigate([{ outlets: { dialog: null } }]).then(() => {
                      this.router.navigate(['/topics']);
          });  }


  submitFormTopic() {
    this.isLoad = true;

    if (this.topicForm.get('isMain')?.value) {
      this.topicForm.get('mainId')?.enable();

      this.topicForm.patchValue({ mainId: null });
    } else {
      const mainIdValue = this.selectedTopicId ?? this.selectedValue?.id ?? null;
      if (mainIdValue !== null) {
        this.topicForm.patchValue({ mainId: mainIdValue });
      }
    }


    if (this.topicForm.valid) {
      this._AddTopicService.addTopic(this.topicForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.topicResult.result = res.result;
            this.topicID = this.topicResult.result.id;
            this.stageForm.patchValue({ topicId: this.topicID });


            this.isnext = false;
          }
          this.isLoad = false;
        },
        error: (err) => {
          this.isLoad = false;
        },
      });
    }
    else {
      this.isLoad = false;

      console.log('Form is invalid');
    }

  }


  // Create Stage


  stageForm: FormGroup = new FormGroup({
    topicId: new FormControl(),
    newStages: new FormArray([]),
    updatedStages: new FormArray([]),


  });



  createFormStage() {
    this.stageForm = new FormGroup({
      newStages: new FormArray([])
    });
  }

  get stages(): FormArray {
    return this.stageForm?.get('newStages') as FormArray || new FormArray([]);
  }
  addStage() {
    const index = this.stages.length;
    const orderValue = index + 2;
    const selectedColor = this.selectedColors[index] || this.colors[index % this.colors.length];

    this.stages.push(new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      color: new FormControl(selectedColor, Validators.required),
      icon: new FormControl('fa fa-address-book', Validators.required),
      order: new FormControl(orderValue)
    }));

    this.selectedColors.push(selectedColor); // تخزين اللون المحدد
  }

  selectColor(index: number, color: string) {

    this.selectedColors[index] = color;
    this.openIndex = null;
  }
  removeStage(index: number) {
    this.stages.removeAt(index);
  }
  togglePackageColor(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  next() {
    console.log(this.stageForm.value)

  }
  submitFormStage() {
    this.isLoad = true;

    this._AddStageTopicService.addStageFromTopic(this.stageForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.isLoad = false;
                this.location.back();
                this.closePopup();
        }

      },
      error: (err) => {
        console.log(err);
        this.isLoad = false;

      },
    })

  }

  getTopicList() {
    this._topiclistService.getAlllits().subscribe(topics => {
      this.topicsList = topics.result;
      let defautlTopic = this.topicsList.filter((e: ITopiclist) => e.default)[0];
      this.selectedValue = defautlTopic;
    });
  }


  ngOnInit(): void {

    this.topicForm.get('isMain')?.valueChanges.subscribe((isChecked) => {
      if (isChecked) {
        this.topicForm.get('mainId')?.setValue(null, { emitEvent: false });
        this.topicForm.get('mainId')?.disable({ emitEvent: false });
      } else {
        this.topicForm.get('mainId')?.enable({ emitEvent: false });
      }
    });
    this.getTopicList()

  }



}
