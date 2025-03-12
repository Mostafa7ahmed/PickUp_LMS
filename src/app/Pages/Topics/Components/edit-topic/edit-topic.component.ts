import { ITopic, TopicResult } from './../../Core/Interface/itopic';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
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
import { GetoneTopicService } from '../../Service/getone-topic.service';
import { UpdateTopicService } from '../../Service/update-topic.service';
@Component({
  selector: 'app-edit-topic',
  standalone: true,
  imports: [TopPopComponent, CommonModule, SelectIconComponent, ReactiveFormsModule, CustomslectwithiconComponent, RouterModule],
  templateUrl: './edit-topic.component.html',
  styleUrl: './edit-topic.component.scss'
})
export class EditTopicComponent {
  icons: string[] = [];
  colors: string[] = [];
  currentIcon: string = 'fa fa-file-pen';
  colorDefault: string = "#778fe6cf";
  ishowTab: boolean = true;
  isnext: boolean = true;
  selectedColors: string[] = [];
  maxStages = 8;
  isLoad: boolean = false;
  isVisble: boolean = true;
  isAddTopicPopupOpened: boolean = false;
  selectedTopicId: number | null = null;
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
  private _UpdateTopicService = inject(UpdateTopicService);
  private _AddStageTopicService = inject(AddStageTopicService);

  private _getoneTopicService = inject(GetoneTopicService);
  TopicResult: IResponseOf<TopicResult> = {} as IResponseOf<TopicResult>;
  topicForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    color: ['#778fe6cf'],
    icon: ['fa fa-file-pen'],
    description: ['', [Validators.maxLength(300)]],
    isMain: [false],
    mainId: [null],
    id: [null]
  });

  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router) {
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


  showTab() {
    this.ishowTab = !this.ishowTab;
  }
  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }


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
    this._UpdateTopicService.updateTopic(this.topicForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.topicResult.result = res.result;
          this.topicID = this.topicResult.result.id;
          this.stageForm.patchValue({ id: this.topicID });

          this.isnext = false;
        }
        this.isLoad = false;
      },
      error: (err) => {
        this.isLoad = false;
      },
    });

    console.log(this.topicForm.value)


  }

  onTopicSelected(selectedId: number) {
    this.selectedTopicId = selectedId;
    console.log('Selected Topic ID:', selectedId);
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

    this.selectedColors.push(selectedColor);
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
          this.closePopup()
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
      let defaultTopic = this.topicsList.find((e: ITopiclist) => e.id === this.topicResult.result.mainId);
      if (!defaultTopic) {
        defaultTopic = this.topicsList.find((e: ITopiclist) => e.default);
      }
      if (!defaultTopic && this.topicsList.length > 0) {
        defaultTopic = this.topicsList[0];
      }
      this.selectedValue = defaultTopic;
    });
  }

  getTopicById(topicID: number) {
    this._getoneTopicService.getTopicById(topicID).subscribe(topic => {
      this.topicResult = topic;
      this.topicForm.patchValue(this.topicResult.result);
      this.stageForm.patchValue({ topicId: this.topicResult.result.id });
      this.stageForm.patchValue(this.topicResult.result.stages)


      this.getTopicList();
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
    this._ActivatedRoute.params.subscribe(params => {
      if (params['topicId'] && params['topicId'] !== '0') {
        this.topicID = +params['topicId'];
        this.getTopicById(this.topicID);
      }
    });



  }

}
