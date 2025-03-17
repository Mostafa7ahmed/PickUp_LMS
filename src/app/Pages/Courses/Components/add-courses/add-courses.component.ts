import { LanguageResult } from './../../../../Core/Interface/ilanguage';
import { Component, ElementRef, EventEmitter, inject, Input, Output, viewChild, ViewChild } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CustomSelectComponent } from '../../../../Components/custom-select/custom-select.component';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, SlicePipe } from '@angular/common';
import { TextHeaderComponent } from '../text-header/text-header.component';
import { TooltipModule } from 'primeng/tooltip';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Router, RouterModule } from '@angular/router';
import { StreamType } from '../../../../Core/Interface/stream-type';
import { DiscountType } from '../../../../Core/Interface/discount-type';
import { StreamService } from '../../../../Core/Services/stream.service';
import { PaginateStageService } from '../../../Stages/Core/service/paginate-stage.service';
import { PaginateTopicService } from '../../../Topics/Service/paginate-topic.service';
import { LanguageService } from '../../../../Core/Services/language.service';
import { CustomSelectPriceOrFreeComponent } from "../custom-select-price-or-free/custom-select-price-or-free.component";
import { ITopiclist } from '../../Core/interface/itopiclist';
import { CustomslectwithiconComponent } from "../customslectwithicon/customslectwithicon.component";
import { TopiclistService } from '../../../Topics/Service/topiclist.service';
import { IPaginationResponse, IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { CustomSelectLanguageComponent } from "../custom-select-language/custom-select-language.component";
import { ItopicList, ITopicListResult, Stage } from '../../../Topics/Core/Interface/itopic-list-result';
import { CoustomSelectStageComponent } from "../coustom-select-stage/coustom-select-stage.component";
import { environment } from '../../../../Environments/environment';
function alphabet(): string[] {
  const children: string[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(i.toString(36) + i);
  }
  return children;
}
@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [TopPopComponent, RouterModule, TooltipModule, NzDividerModule, NzIconModule, NzInputModule, NzSelectModule, FormsModule, TextHeaderComponent, CommonModule, ReactiveFormsModule, NzSelectModule, CustomSelectComponent, CustomSelectPriceOrFreeComponent, CustomslectwithiconComponent, CustomSelectLanguageComponent, CoustomSelectStageComponent],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.scss'
})
export class AddCoursesComponent {
  //Injects
  private router = inject(Router);
  private _StreamService = inject(StreamService);
  private _languageService = inject(LanguageService);
  private _FormBuilder = inject(FormBuilder);
  private _topiclistService = inject(TopiclistService);




  //  selectedFiles: File[] = [];
   selectedImageName: string = '';
   selectedImageUrl: any;

   selectedVideoName: string = '';
   selectedVideoUrl: string | null = null;

  selectedFileName: string = '';





  courseForm: FormGroup = this._FormBuilder.group({
    topicId: [0, Validators.required],
    stageId: [0, Validators.required],
    LanguageId: [0, Validators.required],
    name: ['', Validators.required],
    free: [false],
    price: this._FormBuilder.control({ value: 0, disabled: false }, [Validators.min(0)]),
    description: [''],
    photoUrl: [''],
    introductionVideoUrl: [''],
    fileUrls: this._FormBuilder.array([]),
    discount: this._FormBuilder.group({
      type: [0, Validators.required],
      amount: [0, Validators.min(0)]
    })
  });
  handleValueChange(event: { free: boolean; price: number }) {
    this.courseForm.patchValue({
      free: event.free,
      price: event.price
    });

  }


  customFields: { key: string; value: string; checked: boolean }[] = [];
  newField = { key: '', value: '' };

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
  isLoadStage: boolean = false



  getTopicList() {
    this._topiclistService.getAlllits().subscribe(topics => {
      this.topicsList = topics.result;
      this.isLoadTopic = true
      this.stageList = topics.result[0].stages
      let defautlTopic = this.topicsList.filter((e: ITopiclist) => e.default)[0];
      let defautlStage = this.stageList.filter((e: Stage) => e.default)[0];

      this.selectStageDefault = defautlStage;
      this.selectTopicDefault = defautlTopic;
    });
  }
  getLanguageList() {
    this._languageService.getAllLanguage().subscribe(Language => {
      this.LanguageResultList = Language.result;
      this.isLoadStage= true;
      console.log(this.LanguageResultList[0])

    });
  }
  onTopicSelected(selectedId: number) {
    this.selectedTopicId = selectedId;
    this.stageList = this.topicsList.find((topic: ITopiclist) => topic.id === selectedId)?.stages ?? [];
    let defautlStage = this.stageList.filter((e: Stage) => e.default)[0];
    this.selectStageDefault = defautlStage;
    console.log('Selected Topic ID:', selectedId);
    const mainIdValue = this.selectedTopicId ?? this.selectTopicDefault?.id ?? null;
    this.courseForm.patchValue({
      topicId: selectedId,
      stageId: this.selectStageDefault.id,
    });


  }
  onStageSelected(selectedId: number) {
    this.courseForm.patchValue({ stageId: selectedId });
    console.log('Selected Stage ID:', selectedId);
  }

  print() {


    if (!this.isChecked) {
      this.courseForm.get("discount")?.setValue({ type: null, amount: null });
    }
  




    console.log(this.courseForm.value);


  }

  ngOnInit() {
    this.getTopicList();
    this.getLanguageList()
  }
  onSelectChangeFree(value: string) {
    console.log(value)


  }



  isChecked: boolean = false;

  toggleVisibility(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
  }


  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  listOfTagOptions: string[] = [];
  showDescription: boolean = false;
  listOfTags: any[] = [];

  keyOptions: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 1', 'Option 2', 'Option 3', 'Option 1', 'Option 2', 'Option 3', 'Option 1', 'Option 2', 'Option 3'];

  
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; 
  @ViewChild('VideoInput') VideoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('ImageInput') ImageInput!: ElementRef<HTMLInputElement>;
  triggerFileInput(inputType: string) {
    if (inputType === 'image' && this.ImageInput) {
      this.ImageInput.nativeElement.click();
    } else if (inputType === 'video' && this.VideoInput) {
      this.VideoInput.nativeElement.click();
    } else if (inputType === 'file' && this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }




  // removeField(index: number) {
  //   this.customFields.splice(index, 1); // Remove from UI array
  //   const customFields = this.courseForm.get('customFields') as FormArray;
  //   customFields.removeAt(index); // Remove from FormArray
  //   this.syncCustomFieldsWithFormArray(); // Resync after removal to ensure consistency
  //   console.log('FormArray after removal:', this.courseForm.get('customFields')?.value);
  // }

  // syncCustomFieldsWithFormArray() {
  //   const customFieldsArray = this.courseForm.get('customFields') as FormArray;
  //   this.customFields = customFieldsArray.controls.map((control: any) => ({
  //     key: control.get('key')?.value || '',
  //     value: control.get('value')?.value || '',
  //     checked: control.get('checked')?.value || false
  //   }));
  //   console.log('Synced customFields:', this.customFields);
  // }

  // get customFieldsArray() {
  //   return this.courseForm.get('customFields') as FormArray;
  // }


  // onFileSelected(event: Event, type: string) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     const fileName = file.name;

  //     if (type === 'image') {
  //       this.selectedImageName = fileName;
  //       this.selectedImageUrl = URL.createObjectURL(file);
  //     } else if (type === 'video') {
  //       this.selectedVideoName = fileName;
  //       this.selectedVideoUrl = URL.createObjectURL(file);

  //       setTimeout(() => {
  //         const videoElement = document.querySelector('video');
  //         if (videoElement) {
  //           videoElement.muted = true; // Mute the video
  //         }
  //       }, 100);
  //     } else if (type === 'file') {
  //       this.selectedFileName = fileName;
  //     }
  //   }
  // }

    // addField() {
  //   if (this.newField.key.trim() && this.newField.value.trim()) {
  //     const newFieldData = { key: this.newField.key, value: this.newField.value, checked: false };
  //     console.log('Adding field to customFields:', newFieldData);
  //     this.customFields.push(newFieldData);
  //     this.addCustomFieldControl(newFieldData.key, newFieldData.value, newFieldData.checked);
  //     console.log('FormArray after adding:', this.courseForm.get('customFields')?.value);
  //     this.newField = { key: '', value: '' };
  //     this.syncCustomFieldsWithFormArray(); 
  //   }
  // }

  // addCustomFieldControl(key: string, value: string, checked: boolean) {
  //   console.log('Adding FormGroup for:', { key, value, checked });
  //   const customFields = this.courseForm.get('customFields') as FormArray;
  //   customFields.push(
  //     this.fb.group({
  //       key: [key],
  //       value: [value],
  //       checked: [checked]
  //     })
  //   );
  // }
  
  // addTags(input: HTMLInputElement): void {
  //   const value = input.value.trim(); 
  //   if (value && this.listOfTags.indexOf(value) === -1) {
  //     this.listOfTags = [value, ...this.listOfTags]; 
  //   }
  //   input.value = ''; 
  // }
  onSelectChange(selectedValue: any) {
    this.courseForm.patchValue({ LanguageId: selectedValue });

  }


  onDiscountTypeChange(event: any) {
    const selectedValue = event.target.value;
    this.isPercentage = selectedValue === "1";
    this.discountSymbol = this.isPercentage ? "%" : "EGP";

  }


  uploadedFiles: { name: string; url: string }[] = [];

  onFileSelectedFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files: FileList = input.files;
      const fileUrlsArray = this.courseForm.get('fileUrls') as FormArray;
  
      Array.from(files).forEach((file) => {
        this._StreamService.upload(file, StreamType.file).subscribe({
          next: (response) => {
            const result = response?.body?.result;
            if (result) {
              const fileUrl = environment.baseUrlFiles + result.url;
              
              this.uploadedFiles.push({ name: result.name, url: fileUrl });
  
              fileUrlsArray.push(new FormControl(fileUrl));
  
              console.log(' الملفات المرفوعة:', result);
            }
          },
          error: (err) => console.error(' خطأ أثناء رفع الملف:', err)
        });
      });
    }
  }
  
  

  onFileSelectedImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this._StreamService.upload(file, StreamType.photo).subscribe({
        next: (response) => {
          const result = response?.body?.result; 
          if (result) {
            const fileName = result.name;
            this.selectedImageName = fileName;
            this.selectedImageUrl = environment.baseUrlFiles + result.url;
            const selectedFile : string =  result.url
            this.courseForm.get('photoUrl')?.setValue(selectedFile);
            console.log('📄 اسم الملف:', result.url);
          }
        },
        error: (err) => console.error('❌ خطأ أثناء رفع الصورة:', err)
      });
    }
  }
  
  onFileSelectedVideo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this._StreamService.upload(file, StreamType.video).subscribe({
        next: (response) => {
          const result = response?.body?.result; 
          if (result) {
            const fileName = result.name;
            this.selectedVideoName = fileName;
            this.selectedVideoUrl = environment.baseUrlFiles + result.url;
            const selectedFile : string =  result.url
            this.courseForm.get('introductionVideoUrl')?.setValue(selectedFile);
            console.log('📄 اسم الملف:', result.url);
          }
        },
        error: (err) => console.error('❌ خطأ أثناء رفع الصورة:', err)
      });
    }
  }



  // removeFile(index: number) {
  //   this.selectedFiles.splice(index, 1);
  // }

  removeFile(index: number) {
    const fileUrlsArray = this.courseForm.get('fileUrls') as FormArray;
      this.uploadedFiles.splice(index, 1);
      fileUrlsArray.removeAt(index);
  }
  ShowDescription() {
    this.showDescription = !this.showDescription;
  }




}