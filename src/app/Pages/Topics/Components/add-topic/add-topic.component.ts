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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [TopPopComponent, ReativeFormModule, TranslateModule, SelectIconComponent, RouterModule, CustomslectwithiconComponent],
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

  // Validation properties
  showValidationErrors: boolean = false;

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
  private _NzMessageService = inject(NzMessageService);
  private _TranslateService = inject(TranslateService);

  


  topicForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    color: ['#a0151e'],
    icon: ['fa fa-file-pen'],
    description: ['', [Validators.maxLength(500)]],
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
      this.router.navigate([{ outlets: { dialog: null } }]);
  }

  // Validation helper methods
  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  showFormValidationErrors() {
    const errors: string[] = [];

    if (this.topicForm.get('name')?.hasError('required')) {
      errors.push('Topic name is required');
    }
    if (this.topicForm.get('name')?.hasError('minlength')) {
      errors.push('Topic name must be at least 3 characters');
    }
    if (this.topicForm.get('name')?.hasError('maxlength')) {
      errors.push('Topic name cannot exceed 50 characters');
    }
    if (this.topicForm.get('description')?.hasError('maxlength')) {
      errors.push('Description cannot exceed 500 characters');
    }


  }

  // Validation getters for template
  get nameControl() { return this.topicForm.get('name'); }
  get descriptionControl() { return this.topicForm.get('description'); }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.topicForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.showValidationErrors));
  }

  getFieldError(fieldName: string): string {
    const field = this.topicForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched || this.showValidationErrors)) {
      if (field.errors['required']) {
        if (fieldName === 'name') {
          let message = '';
          this._TranslateService.get('Board.popupAdd.topic_name_required').subscribe((translatedMessage: string) => {
            message = translatedMessage || 'Topic name is required';
          });
          return message || 'Topic name is required';
        } else {
          let message = '';
          this._TranslateService.get('Board.popupAdd.field_required').subscribe((translatedMessage: string) => {
            message = translatedMessage || 'This field is required';
          });
          return message || 'This field is required';
        }
      }
      if (field.errors['minlength']) {
        if (fieldName === 'name') {
          let message = '';
          this._TranslateService.get('Board.popupAdd.topic_name_min_length').subscribe((translatedMessage: string) => {
            message = translatedMessage || 'Topic name must be at least 3 characters';
          });
          return message || 'Topic name must be at least 3 characters';
        }
        return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      }
      if (field.errors['maxlength']) {
        if (fieldName === 'name') {
          let message = '';
          this._TranslateService.get('Board.popupAdd.topic_name_max_length').subscribe((translatedMessage: string) => {
            message = translatedMessage || 'Topic name cannot exceed 50 characters';
          });
          return message || 'Topic name cannot exceed 50 characters';
        } else if (fieldName === 'description') {
          let message = '';
          this._TranslateService.get('Board.popupAdd.description_max_length').subscribe((translatedMessage: string) => {
            message = translatedMessage || 'Description cannot exceed 500 characters';
          });
          return message || 'Description cannot exceed 500 characters';
        }
        return `Maximum ${field.errors['maxlength'].requiredLength} characters allowed`;
      }
    }
    return '';
  }


  submitFormTopic() {
    this.showValidationErrors = true;

    // Mark all fields as touched to show validation errors
    this.markFormGroupTouched(this.topicForm);

    if (!this.topicForm.valid) {
      this.showFormValidationErrors();
      return;
    }

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

    this._AddTopicService.addTopic(this.topicForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.topicResult.result = res.result;
          this.topicID = this.topicResult.result.id;
          this.stageForm.patchValue({ topicId: this.topicID });

          // Show success message
          this._TranslateService.get('Board.popupAdd.topic_created_success').subscribe((message: string) => {
            this._NzMessageService.success(message || 'Topic created successfully!');
          });

          this.isnext = false;
          this.showValidationErrors = false;
        } else {
          // Show error message from server
          this._TranslateService.get('Board.popupAdd.topic_creation_failed').subscribe((message: string) => {
            this._NzMessageService.error(res.message || message || 'Failed to create topic');
          });
        }
        this.isLoad = false;
      },
      error: (err) => {
        this.isLoad = false;
        // Show error message
        this._TranslateService.get('Board.popupAdd.topic_creation_error').subscribe((message: string) => {
          this._NzMessageService.error(message || 'An error occurred while creating the topic');
        });
        console.error('Topic creation error:', err);
      },
    });
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
    if (this.stages.length <= 1) {
      this._TranslateService.get('Board.popupAdd.min_stages_required').subscribe((message: string) => {
        this._NzMessageService.warning(message || 'At least one stage is required');
      });
      return;
    }

    this.stages.removeAt(index);
    this.selectedColors.splice(index, 1);
  }

  // Stage validation helpers
  isStageFieldInvalid(stageIndex: number, fieldName: string): boolean {
    const stageGroup = this.stages.at(stageIndex) as FormGroup;
    const field = stageGroup?.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getStageFieldError(stageIndex: number, fieldName: string): string {
    const stageGroup = this.stages.at(stageIndex) as FormGroup;
    const field = stageGroup?.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        let message = '';
        this._TranslateService.get('Board.popupAdd.stage_name_required').subscribe((translatedMessage: string) => {
          message = translatedMessage || 'Stage name is required';
        });
        return message || 'Stage name is required';
      }
      if (field.errors['minlength']) {
        let message = '';
        this._TranslateService.get('Board.popupAdd.stage_name_min_length').subscribe((translatedMessage: string) => {
          message = translatedMessage || 'Stage name must be at least 3 characters';
        });
        return message || 'Stage name must be at least 3 characters';
      }
      if (field.errors['maxlength']) {
        let message = '';
        this._TranslateService.get('Board.popupAdd.stage_name_max_length').subscribe((translatedMessage: string) => {
          message = translatedMessage || 'Stage name cannot exceed 50 characters';
        });
        return message || 'Stage name cannot exceed 50 characters';
      }
    }
    return '';
  }
  togglePackageColor(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  next() {
    console.log(this.stageForm.value)

  }
  submitFormStage() {
    // Validate stages
    if (this.stages.length === 0) {
      this._TranslateService.get('Board.popupAdd.stages_required').subscribe((message: string) => {
        this._NzMessageService.warning(message || 'Please add at least one stage');
      });
      return;
    }

    // Mark all stage forms as touched
    this.stages.controls.forEach(control => {
      this.markFormGroupTouched(control as FormGroup);
    });

    // Check if all stages are valid
    if (this.stages.invalid) {
      this._TranslateService.get('Board.popupAdd.stages_validation_error').subscribe((message: string) => {
        this._NzMessageService.error(message || 'Please fix stage validation errors');
      });
      return;
    }

    this.isLoad = true;

    this._AddStageTopicService.addStageFromTopic(this.stageForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          // Show success message
          this._TranslateService.get('Board.popupAdd.topic_stages_created_success').subscribe((message: string) => {
            this._NzMessageService.success(message || 'Topic and stages created successfully!');
          });

          this.isLoad = false;
          this.location.back();
        
        } else {
          this.isLoad = false;
          this._TranslateService.get('Board.popupAdd.stages_creation_failed').subscribe((message: string) => {
            this._NzMessageService.error(res.message || message || 'Failed to create stages');
          });
        }
      },
      error: (err) => {
        console.error('Stage creation error:', err);
        this.isLoad = false;
        this._TranslateService.get('Board.popupAdd.stages_creation_error').subscribe((message: string) => {
          this._NzMessageService.error(message || 'An error occurred while creating stages');
        });
      },
    });
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
    this.getTopicList();

  }



}
