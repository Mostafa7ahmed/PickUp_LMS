import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CustomSelectComponent } from '../../../../Components/custom-select/custom-select.component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, SlicePipe } from '@angular/common';
import { TextHeaderComponent } from '../text-header/text-header.component';
import { TooltipModule } from 'primeng/tooltip';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Router, RouterModule } from '@angular/router';
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
  imports: [TopPopComponent, SplicTextPipe, RouterModule, TooltipModule, NzDividerModule, NzIconModule, NzInputModule, NzSelectModule, FormsModule, TextHeaderComponent, CommonModule, ReactiveFormsModule, NzSelectModule, CustomSelectComponent],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.scss'
})
export class AddCoursesComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('VideoInput') VideoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('ImageInput') ImageInput!: ElementRef<HTMLInputElement>;
  selectedImageName: string = '';
  selectedImageUrl: string | null = null;
  selectedVideoName: string = '';
  selectedVideoUrl: string | null = null;
  selectedFileName: string = '';
  selectedFiles: File[] = [];
  showDescription: boolean = false;
  discountSymbol: string = "EGP";
  isPercentage: boolean = false;
  listOfTags = ['jack', 'lucy' ];
  keyOptions: string[] = []; 
  customFields: { key: string; value: string; checked: boolean }[] = [];
  newField = { key: '', value: '' };


  private router = inject(Router)


  

  addTags(input: HTMLInputElement): void {
    const value = input.value.trim(); 
    if (value && this.listOfTags.indexOf(value) === -1) {
      this.listOfTags = [value, ...this.listOfTags]; 
    }
    input.value = ''; 
  }

  private fb = new FormBuilder();

  courseForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    free: [false, Validators.required],
    price: [null, Validators.required],
    stageId: [null, Validators.required], 
    languageId: [null, Validators.required],
    photoUrl: [''],
    introductionVideoUrl: [''],
    fileUrls: [[], Validators.required],
    tags: this.fb.array([]),
    customFields: this.fb.array([]), 
    discount: this.fb.group({
      type: [0],
      amount: [null, Validators.required] 
    })
  });



  ngOnInit() {
    this.syncCustomFieldsWithFormArray(); 
  }

  addField() {
    if (this.newField.key.trim() && this.newField.value.trim()) {
      const newFieldData = { key: this.newField.key, value: this.newField.value, checked: false };
      console.log('Adding field to customFields:', newFieldData);
      this.customFields.push(newFieldData);
      this.addCustomFieldControl(newFieldData.key, newFieldData.value, newFieldData.checked);
      console.log('FormArray after adding:', this.courseForm.get('customFields')?.value);
      this.newField = { key: '', value: '' };
      this.syncCustomFieldsWithFormArray(); 
    }
  }

  addCustomFieldControl(key: string, value: string, checked: boolean) {
    console.log('Adding FormGroup for:', { key, value, checked });
    const customFields = this.courseForm.get('customFields') as FormArray;
    customFields.push(
      this.fb.group({
        key: [key],
        value: [value],
        checked: [checked]
      })
    );
  }

  isChecked: boolean = false;

  toggleVisibility(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
  }
  
  removeField(index: number) {
    this.customFields.splice(index, 1); 
    const customFields = this.courseForm.get('customFields') as FormArray;
    customFields.removeAt(index); 
    this.syncCustomFieldsWithFormArray(); 
    console.log('FormArray after removal:', this.courseForm.get('customFields')?.value);
  }

  syncCustomFieldsWithFormArray() {
    const customFieldsArray = this.courseForm.get('customFields') as FormArray;
    this.customFields = customFieldsArray.controls.map((control: any) => ({
      key: control.get('key')?.value || '',
      value: control.get('value')?.value || '',
      checked: control.get('checked')?.value || false
    }));
    console.log('Synced customFields:', this.customFields);
  }

  get customFieldsArray() {
    return this.courseForm.get('customFields') as FormArray;
  }





    closePopup() {
      this.router.navigate([{ outlets: { dialog: null } }]);
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

  onFileSelected(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name;

      if (type === 'image') {
        this.selectedImageName = fileName;
        this.selectedImageUrl = URL.createObjectURL(file);
      } else if (type === 'video') {
        this.selectedVideoName = fileName;
        this.selectedVideoUrl = URL.createObjectURL(file);
        
        setTimeout(() => {
          const videoElement = document.querySelector('video');
          if (videoElement) {
            videoElement.muted = true; // Mute the video
          }
        }, 100);
      } else if (type === 'file') {
        this.selectedFileName = fileName;
      }
    }
  }

  onSelectChange(selectedValue: string) {
    console.log('Selected Option:', selectedValue);
  }


  onDiscountTypeChange(event: any) {
    const selectedValue = event.target.value;
    this.isPercentage = selectedValue === "1"; 
    this.discountSymbol = this.isPercentage ? "%" : "EGP";

  }

  onFileSelectedFile(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
    this.fileInput.nativeElement.value = '';
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  ShowDescription() {
    this.showDescription = !this.showDescription;
  }

  isOpen = false;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }


}