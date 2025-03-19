import { DeleteStreamService } from './../../Core/service/delete-stream.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextHeaderComponent } from '../text-header/text-header.component';
import { TooltipModule } from 'primeng/tooltip';
import { Router, RouterModule } from '@angular/router';
import { StreamType } from '../../../../Core/Interface/stream-type';
import { StreamService } from '../../../../Core/Services/stream.service';
import { LanguageService } from '../../../../Core/Services/language.service';
import { CustomSelectPriceOrFreeComponent } from "../custom-select-price-or-free/custom-select-price-or-free.component";
import { ITopiclist } from '../../Core/interface/itopiclist';
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
import { AddCoursesService } from '../../Core/service/add-courses.service';
import { StringExtensionsService } from '../../../../Core/Shared/service/string-extensions.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ICustomField } from '../../Core/interface/icustom-field';
import { CustomFildsService } from '../../Core/service/custom-filds.service';
import { Select } from 'primeng/select';
import { ReativeFormModule } from '../../../../Core/Shared/Modules/reative-form/reative-form.module';
@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [TopPopComponent, Select,InputTextModule,MultiSelectModule, ButtonModule,RouterModule, TooltipModule, ReactiveFormsModule, ReativeFormModule, TextHeaderComponent, CustomSelectPriceOrFreeComponent, CustomslectwithiconComponent, CustomSelectLanguageComponent, CoustomSelectStageComponent],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.scss'
})
export class AddCoursesComponent {
  //Injects Or Call Service
  private router = inject(Router);
  private _StreamService = inject(StreamService);
  private _languageService = inject(LanguageService);
  private _FormBuilder = inject(FormBuilder);
  private _topiclistService = inject(TopiclistService);
  private _deleteStreamService = inject(DeleteStreamService);
  private _createCourseService = inject(AddCoursesService);
  private _stringExtensionsService = inject(StringExtensionsService);
  private _TagesService = inject(TagesService);
  private _CustomFildsService = inject(CustomFildsService);









  courseForm: FormGroup = this._FormBuilder.group({
    topicId: [0, Validators.required],
    stageId: [0, Validators.required],
    LanguageId: [0, Validators.required],
    name: ['', Validators.required],
    free: [false],
    price: this._FormBuilder.control({ value: 0, disabled: false }, [Validators.min(0)]),
    description: [''],
    photoUrl: [''],
    tags: this._FormBuilder.control([], Validators.required), 
    fileUrls: this._FormBuilder.array([]),
    discount: this._FormBuilder.group({
      type: [0, Validators.required],
      amount: [0, [Validators.min(0), Validators.max(100)]],
    }),
    customFields: this._FormBuilder.array([])  

  });
  fieldForm: FormGroup = this._FormBuilder.group({
    key: [null],
    usage: ['']
  });

  get customFieldsArray(): FormArray {
    return this.courseForm.get('customFields') as FormArray;
  }

  get customFieldsControls(): FormGroup[] {
    return this.customFieldsArray.controls as FormGroup[];
  }


  topicsList: ItopicList[] = [];
  stageList: Stage[] = [];
  LanguageResultList: any[] = []
  selectStageDefault: any
  selectTopicDefault: any
  selectedTopicId: number | null = null;
  selectedLangugeId: number | null = 4;
  discountSymbol: string = "EGP";
  isPercentage: boolean = false;
  isLoadTopic: boolean = false
  isLoadTags: boolean = false
  isLoadCustomFild: boolean = false
  isLoadlanguage: boolean = false

  showDescription: boolean = false;
  uploadedFiles: IUploadResponse[] = [];
  selectedImageName: string = '';
  selectedImageUrl: any;
  selectedVideoName: string = '';
  selectedVideoUrl: string | null = null;
  selectedFileName: string = '';
  isChecked: boolean = true;
  tagsListResponse: IPaginationResponse<ITag> = {} as IPaginationResponse<ITag>;
  newCourseTagsList: NewTagRequest[] = [];
  customFieldListResponse: IPaginationResponse<ICustomField> = {} as IPaginationResponse<ICustomField>;
  newCustomFieldList: NewCustomFieldRequest[] = [];
  editIndex: number | null = null ;
  isLoad: boolean = false ;
  isUploadingImage: boolean = false;
  isUploadingVideo: boolean = false;
  isUploadingFile: boolean = false;
  isAddedFail: boolean = false;


  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('VideoInput') VideoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('ImageInput') ImageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('tagPlaceHolder') tagPlaceHolder!: ElementRef<any>;


  getTopicList() {
    this._topiclistService.getAlllits().subscribe(topics => {
      this.topicsList = topics.result;
      this.isLoadTopic = true;
  
      let defautlTopic = this.topicsList.find((e: ITopiclist) => e.default);
      console.log("Default Topic: ", defautlTopic);
        if (!defautlTopic) defautlTopic = this.topicsList[0];
        this.stageList = defautlTopic.stages.filter((stage: Stage) => stage.type !== 2);
      console.log("Filtered Stages: ", this.stageList);
        let defautlStage = this.stageList.find((stage: Stage) => stage.default);
      console.log("Default Stage: ", defautlStage);
        if (!defautlStage) defautlStage = this.stageList[0];
      this.selectTopicDefault = defautlTopic;
      this.selectStageDefault = defautlStage;
  
      // نحدث الفورم
      this.courseForm.get("topicId")?.setValue(defautlTopic.id);
      this.courseForm.get("stageId")?.setValue(defautlStage?.id);
    });
  
  }
  getTagsList() {
    this._TagesService.getTags().subscribe(response => {
      if (response.success) {
        this.isLoadTags = true;
        this.tagsListResponse = response;

      }
    });
  }
  getICustomField() {
    this._CustomFildsService.getCustomField().subscribe(response => {
      if (response.success) {
        this.isLoadCustomFild = true;
        this.customFieldListResponse = response;

      }
    });
  }
    getLanguageList() {
    this._languageService.getAllLanguage().subscribe(Language => {
      this.LanguageResultList = Language.result;
      this.isLoadlanguage = true;
      console.log(this.LanguageResultList[0])
    });
  }

  onTopicSelected(selectedId: number) {
    this.selectedTopicId = selectedId;
    const selectedTopic = this.topicsList.find((topic: ITopiclist) => topic.id === selectedId);
      this.stageList = selectedTopic?.stages.filter((stage: Stage) => stage.type !== 2) ?? [];
  
    let defautlStage = this.stageList.find((e: Stage) => e.default);
    this.selectStageDefault = defautlStage;
  
    console.log('Selected Topic ID:', defautlStage);
  
    this.courseForm.patchValue({
      topicId: selectedId,
      stageId: this.selectStageDefault?.id,
    });
  }
  
  onStageSelected(selectedId: number) {
    this.courseForm.patchValue({ stageId: selectedId });
    console.log('Selected Stage ID:', selectedId);
  }
  onSelectChange(selectedLanguageId: any) {
    this.courseForm.patchValue({ LanguageId: selectedLanguageId });

  }

  triggerFileInput(inputType: string) {
    if (inputType === 'image' && this.ImageInput) {
      this.ImageInput.nativeElement.click();
    } else if (inputType === 'video' && this.VideoInput) {
      this.VideoInput.nativeElement.click();
    } else if (inputType === 'file' && this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onDiscountTypeChange(event: any) {
    const selectedValue = this.courseForm.get('discount.type')?.value; // القيمة مباشرة كـ number
    console.log(selectedValue);
    this.isPercentage = selectedValue === 1;
    this.discountSymbol = this.isPercentage ? "%" : "EGP";
    const amountControl = this.courseForm.get('discount.amount');
    if (this.isPercentage) {
      amountControl?.setValidators([Validators.min(0), Validators.max(100)]);
    } else {
      amountControl?.setValidators([Validators.min(0)]);
    }
    amountControl?.updateValueAndValidity()
  }
  toggleVisibility(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    if (this.isChecked) {
      this.courseForm.get("discount")?.setValue({ type: 0, amount: 0 });
    }
  }
  onFileSelectedFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.isUploadingFile = true; 
  
      const files: FileList = input.files;
      const fileUrlsArray = this.courseForm.get('fileUrls') as FormArray;
        Array.from(files).forEach((file, index) => {
        this._StreamService.upload(file, StreamType.file).subscribe({
          next: (response) => {
            const result = response?.body?.result;
            if (result) {
              const fileUrl = environment.baseUrlFiles + result.url;
  
              this.uploadedFiles.push(result); 
              fileUrlsArray.push(new FormControl(fileUrl));
  
              console.log('✅ ملف مرفوع:', result);
            }
            if (index === files.length - 1) {
              this.isUploadingFile = false;
            }
          },
          error: (err) => {
            console.error('❌ خطأ أثناء رفع الملف:', err);
            if (index === files.length - 1) {
              this.isUploadingFile = false;
            }
          }
        });
      });
    }
  }
  removeFile(index: number, fileUrls: string) {
    const fileUrlsArray = this.courseForm.get('fileUrls') as FormArray;

    const UrlFile =   fileUrls
    this._deleteStreamService.deleteFile(UrlFile).subscribe({
      next: (response) => {
        console.log('تم مسحه:', response?.body?.message);
        this.uploadedFiles.splice(index, 1);
        fileUrlsArray.removeAt(index);
      },
      error: (err) => console.error(' خطأ حذف الملف:', err)
    })
  }
  onFileSelectedImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.isUploadingImage = true; // إظهار اللودر
      this._StreamService.upload(file, StreamType.photo).subscribe({
        next: (response) => {
          const result = response?.body?.result;
          if (result) {
            const fileName = result.name;
            this.selectedImageName = fileName;
            this.selectedImageUrl = environment.baseUrlFiles + result.url;
            const selectedFile: string = result.url;
            this.courseForm.get('photoUrl')?.setValue(selectedFile);
            console.log('📄 اسم الملف:', result.url);
          }
          this.isUploadingImage = false;
        },
        error: (err) => {
          console.error('❌ خطأ أثناء رفع الصورة:', err);
          this.isUploadingImage = false; 
        }
      });
    }
  }
  onImageLoad() {
    this.isUploadingImage = false; 
  }
  removeImage() {
    const photoUrl = this.courseForm.get('photoUrl')?.value;
    if (photoUrl) {
      const UrlFile = photoUrl;
      this._deleteStreamService.deleteFile(UrlFile).subscribe({
        next: (response) => {
          console.log('✅ تم حذف الصورة:', response?.body?.message);
          this.courseForm.get('photoUrl')?.setValue('');
          this.selectedImageName = '';
          this.selectedImageUrl = '';
        },
        error: (err) => console.error(' خطأ  حذف الصورة:', err)
      });
    }
  }
  isAllLoaded(): boolean {
    return this.isLoadTopic && this.isLoadCustomFild && this.isLoadTags && this.isLoadlanguage;
  }
  onFileSelectedVideo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.isUploadingVideo = true;
      this._StreamService.upload(file, StreamType.video).subscribe({
        next: (response) => {
          const result = response?.body?.result;
          if (result) {
            const fileName = result.name;
            this.selectedVideoName = fileName;
            this.selectedVideoUrl = environment.baseUrlFiles + result.url;
            const selectedFile: string = result.url;
            this.courseForm.get('introductionVideoUrl')?.setValue(selectedFile);
            console.log('📄 اسم الفيديو:', result.url);
          }
          this.isUploadingVideo = false;
        },
        error: (err) => {
          console.error('❌ خطأ أثناء رفع الفيديو:', err);
          this.isUploadingVideo = false;
        }
      });
    }
  }
  removeVideo() {
    const videoUrl = this.courseForm.get('introductionVideoUrl')?.value;
    if (videoUrl) {
      const UrlFile =  videoUrl;
      this._deleteStreamService.deleteFile(UrlFile).subscribe({
        next: (response) => {
          console.log('✅ تم حذف الفيديو:', response?.body?.message);
          this.courseForm.get('introductionVideoUrl')?.setValue('');
          this.selectedVideoName = '';
          this.selectedVideoUrl = '';
        },
        error: (err) => console.error('❌ خطأ أثناء حذف الفيديو:', err)
      });
    }
  }
  addField() {
    const keyControl = this.fieldForm.get('key')?.value;
    const valueControl = this.fieldForm.get('usage')?.value;
    this.customFieldsArray.controls.forEach((field, index) => {
      console.log(`Field ${index} visible: `, field.get('visible')?.value);
    });
    if ((!keyControl && keyControl !== 0) || !valueControl?.trim()) {
      return;
    }
    let key: string;
    let id: number | null;
    if (typeof keyControl === 'object' && keyControl !== null) {
      key = keyControl.key;
      id = keyControl.id;
    } else {
      key = keyControl.trim();
      id = null;
    }
    const isInSelectOptions = this.customFieldListResponse.result.some((option) => option.key === key);
    if (id === null && isInSelectOptions) return;
      const isExist = this.customFieldsArray.value.some((field: any) => field.key === key);
    if (isExist && this.editIndex === null) return;
    const newFieldEntry = this._FormBuilder.group({
      id: [id],
      key: [key],
      usage: [valueControl.trim()],
      visible: [true]
    });
  
    if (this.editIndex !== null) {
      this.customFieldsArray.setControl(this.editIndex, newFieldEntry);
      this.editIndex = null;
    } else {
      this.customFieldsArray.push(newFieldEntry);
    }
  
    if (id === null && !isInSelectOptions) {
      this.customFieldListResponse.result.push({
        id: null,
        key: key,
        usage: 0,
        createdOn: null
      });
    }
    this.newCustomFieldList = this.customFieldsArray.value;

      this.fieldForm.get('key')?.reset();
    this.fieldForm.get('usage')?.reset();
  
  }
  removeField(index: number) {
    this.customFieldsArray.removeAt(index);
    this.newCustomFieldList = this.customFieldsArray.value;
  }
  addTags(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (!value || this.tagsListResponse.result.some((tag: any) => tag.name === value)) {
      return;
    }
  
    const newTag = {
      id: null,
      instructorId: 1,
      name: value,
      createdOn: null
    };
  
    this.tagsListResponse.result.unshift(newTag);
    input.value = ''; 
  }
  

  handleValueChange(event: { free: boolean; price: number }) {
    this.courseForm.patchValue({
      free: event.free,
      price: event.price
    });

  }
  onVisibleChange(index: number) {
    const field = this.customFieldsArray.at(index);
    console.log('Visible Now:', field.get('visible')?.value);
  }
  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }
  
  ShowDescription() {
      this.showDescription = !this.showDescription;
  }
  ngOnInit() {
    this.getTopicList();
    this.getLanguageList();
    this.getTagsList();
    this.getICustomField()
  }
  collectCreateCourseRequest(): ICreateCourseRequest {
    const tags = this.courseForm.value.tags?.map((tag: any) => ({
      id: tag.id,
      name: tag.name
    })) || [];
    let fileUrls = this.uploadedFiles.filter(file => this._stringExtensionsService.HasValue(file.url)).map(file => file.url);
    let createCourseRequest: ICreateCourseRequest = {
      name: this.courseForm.get("name")?.value,
      free: this.courseForm.get("free")?.value,
      description: this._stringExtensionsService.resolveEmptyStringToNull(this.courseForm.get("description")?.value),
      languageId: this.courseForm.get("LanguageId")?.value ,
      price: this.courseForm.get("price")?.value,
      topicId: this.courseForm.get("topicId")?.value,
      stageId: this.courseForm.get("stageId")?.value,
      photoUrl: this._stringExtensionsService.resolveEmptyStringToNull(this.courseForm.get("photoUrl")?.value),
      introductionVideoUrl: this._stringExtensionsService.resolveEmptyStringToNull(this.courseForm.get("introductionVideoUrl")?.value),
      discount: this.isChecked ? this.courseForm.get("discount")?.value : null,
      fileUrls: fileUrls,
      tags: tags,
      customFields: [],
    };
    createCourseRequest.customFields = this.customFieldsArray.value.map((field: any) => ({
      id: field.id,
      key: field.key,
      usage: field.usage,
      visible: field.visible
    }));
    return createCourseRequest;
  }

  createCourse() {
    let request = this.collectCreateCourseRequest();
    this.isLoad = true;
    console.log(request)

    if(this.courseForm.valid) {
      this._createCourseService.addCourse(request).subscribe({
        next: (response) => {
          this.isLoad = false;
          console.log("course created successfully !", response);
          this.closePopup();
        },
        error: (err) => {
          this.isLoad = false;
          console.log("fault happen while course created")
        }
      });
    }
    else{
      this.isLoad = false;

    }

  
  }
  
}
