import { DeleteStreamService } from './../../Core/service/delete-stream.service';
import { Component, ElementRef, inject, ViewChild, OnInit } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextHeaderComponent } from '../text-header/text-header.component';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StreamType } from '../../../../Core/Interface/stream-type';
import { StreamService } from '../../../../Core/Services/stream.service';
import { LanguageService } from '../../../../Core/Services/language.service';
import { CustomSelectPriceOrFreeComponent } from "../custom-select-price-or-free/custom-select-price-or-free.component";
import { CustomslectwithiconComponent } from "../customslectwithicon/customslectwithicon.component";
import { TopiclistService } from '../../../Topics/Service/topiclist.service';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { CustomSelectLanguageComponent } from "../custom-select-language/custom-select-language.component";
import { ItopicList, Stage } from '../../../Topics/Core/Interface/itopic-list-result';
import { CoustomSelectStageComponent } from "../coustom-select-stage/coustom-select-stage.component";
import { environment } from '../../../../Environments/environment';
import { TagesService } from '../../Core/service/tages.service';
import { IUploadResponse } from '../../../../Core/Interface/iupload';
import { ITag } from '../../Core/interface/itags';
import { ICreateCourseRequest, NewCustomFieldRequest, NewTagRequest } from '../../Core/interface/icreate-course';
import { UpdateCourseService } from '../../Core/service/update-course.service';
import { GetonecourseService } from '../../Core/service/getonecourse.service';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ReativeFormModule } from '../../../../Core/Shared/Modules/reative-form/reative-form.module';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { CommonModule } from '@angular/common';
import { CourseResult } from '../../Core/interface/icourses';
import { CustomValidators } from '../../../../Core/Shared/validators/custom-validators';
import { ValidationService } from '../../../../Core/Services/validation.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, TopPopComponent, SplitButtonModule, SplicTextPipe, Select, InputTextModule, MultiSelectModule, KeyFilterModule, DropdownModule, ButtonModule, RouterModule, TooltipModule, ReactiveFormsModule, ReativeFormModule, TextHeaderComponent, CustomSelectPriceOrFreeComponent, CustomslectwithiconComponent, CoustomSelectStageComponent],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent implements OnInit {
  
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private _StreamService = inject(StreamService);
  private languageservice = inject(LanguageService);
  private _TopiclistService = inject(TopiclistService);
  private fb = inject(FormBuilder);
  private _TagesService = inject(TagesService);
  private _deleteStreamService = inject(DeleteStreamService);
  private _updateCourseService = inject(UpdateCourseService);
  private _getCourseService = inject(GetonecourseService);
  private _validationService = inject(ValidationService);
  private _messageService = inject(NzMessageService);

  courseId!: number;
  courseForm!: FormGroup;
  showDescription: boolean = false;
  StreamType = StreamType;
  selectedFile!: File;
  selectedVideoFile!: File;
  selectedFiles: File[] = [];
  uploadedPhotoResponse: IUploadResponse | null = null;
  uploadedVideoResponse: IUploadResponse | null = null;
  uploadedFilesResponse: IUploadResponse[] = [];
  isLoadTopic: boolean = false;
  isLoadStage: boolean = false;
  topicsList: ItopicList[] = [];
  stages: Stage[] = [];
  selectedTopic: ItopicList | null = null;
  selectedStage: Stage | null = null;
  courseFree: boolean = false;
  baseUrl = environment.baseUrlFiles;
  selectStageDisabled: boolean = true;
  valuePrice: any = 'Price';
  tags: ITag[] = [];
  selectedTags: ITag[] = [];
  isLoadTags: boolean = false;
  isLoad: boolean = false;
  customFieldsArray!: FormArray;
  isLoadingCourse: boolean = true;
  showValidationErrors: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.loadCourseData();
    });

    this.getAllTopics();
    this.initializeFormCourse();
    this.getAllTags();
  }

  initializeFormCourse() {
    this.customFieldsArray = this.fb.array([]);
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, CustomValidators.name(), Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(1000)]],
      topicId: ['', Validators.required],
      stageId: ['', Validators.required],
      price: [0, [Validators.min(0)]],
      free: [false],
      image: [''],
      video: [''],
      tagsIDS: [[]],
      tags: this.fb.array([]),
      customFields: this.customFieldsArray,
      discount: this.fb.group({
        type: [0],
        amount: [0, [Validators.min(0), Validators.max(100)]]
      })
    });

    this.courseForm.get('free')?.valueChanges.subscribe((isFree: boolean) => {
      const priceControl = this.courseForm.get('price');
      const discountGroup = this.courseForm.get('discount');
      
      if (isFree) {
        priceControl?.setValue(0);
        priceControl?.disable();
        discountGroup?.disable();
      } else {
        priceControl?.enable();
        discountGroup?.enable();
      }
    });
  }

  loadCourseData() {
    this._getCourseService.getCourse(this.courseId).subscribe({
      next: (response: any) => {
        if (response.success) {
          const course = response.result;
          this.isLoadingCourse = false;
          
          // Set basic form values
          this.courseForm.patchValue({
            name: course.name,
            description: course.description,
            price: course.price,
            free: course.free,
            image: course.photoUrl,
            video: course.introductionVideoUrl,
            topicId: course.stage?.topicId || 1,
            stageId: course.stage?.id || 1
          });

          // Set price type
          this.courseFree = course.free;
          this.valuePrice = course.free ? 'Free' : 'Price';

          // Set topic and stage if available
          if (course.stage) {
            // Load topics and set selected topic and stage
            this._TopiclistService.getAlllits().subscribe({
              next: (res: IPaginationResponse<ItopicList>) => {
                if (res.success) {
                  this.topicsList = res.result;
                  this.isLoadTopic = true;
                  const selectedTopic = this.topicsList.find((t: ItopicList) => t.id === course.stage!.topicId);
                  if (selectedTopic) {
                    this.selectedTopic = selectedTopic;
                    this.selectStageDisabled = false;
                    this.courseForm.patchValue({ topicId: selectedTopic.id });
                    if (selectedTopic.stages) {
                      this.stages = selectedTopic.stages;
                      this.isLoadStage = true;
                      const selectedStage = this.stages.find((s: Stage) => s.id === course.stage!.id);
                      if (selectedStage) {
                        this.selectedStage = selectedStage;
                        this.courseForm.patchValue({ stageId: selectedStage.id });
                      } else {
                        this.getAllStages(selectedTopic.id);
                      }
                    }
                  }
                }
              }
            });
          }

          // Set tags if available (handle safely)
          if (course.tags && Array.isArray(course.tags)) {
            this.selectedTags = course.tags;
          }

          // Set custom fields if available (handle safely)
          if (course.customFields && Array.isArray(course.customFields)) {
            course.customFields.forEach((field: any) => {
              this.addCustomField(field);
            });
          }

          // Set discount if available
          if (course.discount) {
            this.courseForm.patchValue({
              discount: {
                type: course.discount.type,
                amount: course.discount.amount
              }
            });
          }
        }
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.isLoadingCourse = false;
      }
    });
  }

  // All the other methods from add-course component
  ShowDescription() {
    this.showDescription = !this.showDescription;
  }

  getAllTopics() {
    this._TopiclistService.getAlllits().subscribe({
      next: (res: IPaginationResponse<ItopicList>) => {
        if (res.success) {
          this.topicsList = res.result;
          this.isLoadTopic = true;
        }
      }
    });
  }

  selectTopic(topic: ItopicList) {
    this.selectedTopic = topic;
    this.courseForm.patchValue({ topicId: topic.id });
    this.selectStageDisabled = false;
    this.getAllStages(topic.id);
  }

  getAllStages(topicId: number) {
    this._TopiclistService.getAlllits().subscribe({
      next: (res: IPaginationResponse<ItopicList>) => {
        if (res.success) {
          const topic = res.result.find((t: ItopicList) => t.id === topicId);
          if (topic && topic.stages) {
            this.stages = topic.stages;
            this.isLoadStage = true;
          }
        }
      }
    });
  }

  selectStage(stage: Stage) {
    this.selectedStage = stage;
    this.courseForm.patchValue({ stageId: stage.id });
  }

  getAllTags() {
    this._TagesService.getTags().subscribe({
      next: (res) => {
        if (res.success) {
          this.tags = res.result;
          this.isLoadTags = true;
        }
      }
    });
  }

  onFileSelected(event: any, type: 'image' | 'video' | 'files') {
    if (type === 'image') {
      this.selectedFile = event.target.files[0];
      this.uploadImage();
    } else if (type === 'video') {
      this.selectedVideoFile = event.target.files[0];
      this.uploadVideo();
    } else {
      this.selectedFiles = Array.from(event.target.files);
      this.uploadFiles();
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      this._StreamService.upload(this.selectedFile, StreamType.photo).subscribe({
        next: (response: any) => {
          if (response.body?.success) {
            const result = response.body.result;
            this.uploadedPhotoResponse = result;
            this.courseForm.patchValue({ image: result.url });
          }
        }
      });
    }
  }

  uploadVideo() {
    if (this.selectedVideoFile) {
      this._StreamService.upload(this.selectedVideoFile, StreamType.video).subscribe({
        next: (response: any) => {
          if (response.body?.success) {
            const result = response.body.result;
            this.uploadedVideoResponse = result;
            this.courseForm.patchValue({ video: result.url });
          }
        }
      });
    }
  }

  uploadFiles() {
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => {
        this._StreamService.upload(file, StreamType.file).subscribe({
          next: (response: any) => {
            if (response.body?.success) {
              const result = response.body.result;
              this.uploadedFilesResponse.push(result);
            }
          }
        });
      });
    }
  }

  deleteUploadedImage() {
    if (this.uploadedPhotoResponse) {
      this._deleteStreamService.deleteFile(this.uploadedPhotoResponse.url).subscribe({
        next: () => {
          this.uploadedPhotoResponse = null;
          this.courseForm.patchValue({ image: '' });
        }
      });
    }
  }

  deleteUploadedVideo() {
    if (this.uploadedVideoResponse) {
      this._deleteStreamService.deleteFile(this.uploadedVideoResponse.url).subscribe({
        next: () => {
          this.uploadedVideoResponse = null;
          this.courseForm.patchValue({ video: '' });
        }
      });
    }
  }

  addCustomField(field?: any) {
    const customField = this.fb.group({
      id: [field?.id || null],
      key: [field?.key || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      value: [field?.value || '', [Validators.required, Validators.maxLength(200)]],
      visible: [field?.visible || true]
    });
    this.customFieldsArray.push(customField);
  }

  removeCustomField(index: number) {
    this.customFieldsArray.removeAt(index);
  }

  setSelectedPrice(value: { free: boolean; price: number }) {
    this.courseFree = value.free;
    this.courseForm.patchValue({ 
      free: value.free,
      price: value.price
    });
  }

  collectUpdateCourseRequest(): ICreateCourseRequest {
    const formValue = this.courseForm.value;
    const request: ICreateCourseRequest = {
      topicId: formValue.topicId || 1, // Default value if not available
      stageId: formValue.stageId || 1, // Default value if not available
      name: formValue.name,
      price: this.courseFree ? 0 : formValue.price,
      free: this.courseFree,
      description: formValue.description || null,
      photoUrl: formValue.image || null,
      introductionVideoUrl: formValue.video || null,
      fileUrls: this.uploadedFilesResponse.map(file => file.url),
      tags: this.selectedTags.map(tag => ({
        id: tag.id,
        name: tag.name
      })),
      customFields: formValue.customFields,
      discount: !this.courseFree && formValue.discount.amount > 0 ? formValue.discount : undefined
    };

    return request;
  }

  updateCourse() {
    if (this.isLoad) return;
    
    this.showValidationErrors = true;
    
    // Mark all fields as touched to show validation errors
    this._validationService.markAllFieldsAsTouched(this.courseForm);

    if (!this.courseForm.valid) {
      this._messageService.error('يرجى تصحيح الأخطاء في النموذج');
      return;
    }

    this.isLoad = true;
    const request = this.collectUpdateCourseRequest();
    this._updateCourseService.updateCourse(this.courseId, request).subscribe({
      next: (response) => {
        this.isLoad = false;
        if (response.success) {
          this._messageService.success('تم تحديث الكورس بنجاح');
          console.log('Course updated successfully!');
          this.closePopup();
        } else {
          this._messageService.error(response.message || 'فشل في تحديث الكورس');
          console.error('Failed to update course');
        }
      },
      error: (err) => {
        this.isLoad = false;
        this._messageService.error('حدث خطأ أثناء تحديث الكورس');
        console.error('Error updating course:', err);
      }
    });
  }

  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]).then(() => {
      this.router.navigate(['/course']);
    });
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    return this._validationService.isFieldInvalid(this.courseForm, fieldName);
  }

  isFieldValid(fieldName: string): boolean {
    return this._validationService.isFieldValid(this.courseForm, fieldName);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.courseForm.get(fieldName);
    return this._validationService.getErrorMessage(control, fieldName);
  }

  getFieldCssClass(fieldName: string): string {
    return this._validationService.getFieldCssClass(this.courseForm, fieldName);
  }

  // Custom field validation helpers
  isCustomFieldInvalid(fieldIndex: number, fieldName: string): boolean {
    const customField = this.customFieldsArray.at(fieldIndex) as FormGroup;
    const field = customField?.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.showValidationErrors));
  }

  getCustomFieldError(fieldIndex: number, fieldName: string): string {
    const customField = this.customFieldsArray.at(fieldIndex) as FormGroup;
    const field = customField?.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched || this.showValidationErrors)) {
      if (field.errors['required']) {
        return fieldName === 'key' ? 'اسم الحقل مطلوب' : 'قيمة الحقل مطلوبة';
      }
      if (field.errors['minlength']) {
        return `الحد الأدنى ${field.errors['minlength'].requiredLength} أحرف`;
      }
      if (field.errors['maxlength']) {
        return `الحد الأقصى ${field.errors['maxlength'].requiredLength} حرف`;
      }
    }
    return '';
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('videoInput') videoInput!: ElementRef;
  @ViewChild('filesInput') filesInput!: ElementRef;

  triggerFileInput(type: 'image' | 'video' | 'files') {
    if (type === 'image') {
      this.fileInput.nativeElement.click();
    } else if (type === 'video') {
      this.videoInput.nativeElement.click();
    } else {
      this.filesInput.nativeElement.click();
    }
  }
} 