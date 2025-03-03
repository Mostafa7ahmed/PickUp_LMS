import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CustomSelectComponent } from '../../../../Components/custom-select/custom-select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, SlicePipe } from '@angular/common';
import { TextHeaderComponent } from '../text-header/text-header.component';
import { TooltipModule } from 'primeng/tooltip';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';

@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [TopPopComponent, SplicTextPipe, TooltipModule, FormsModule, TextHeaderComponent, CommonModule, ReactiveFormsModule, NzSelectModule, CustomSelectComponent],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.scss'
})
export class AddCoursesComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('VideoInput') VideoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('ImageInput') ImageInput!: ElementRef<HTMLInputElement>;
  @Input() isAddPopupVisible: boolean = false;
  selectedFiles: File[] = [];

  listOfTagOptions: string[] = [];
  showDescription: boolean = false;
  @Output() isAddPopupVisibleChange = new EventEmitter<boolean>();

  private fb = new FormBuilder();

  courseForm: FormGroup = this.fb.group({
    courseName: ['', Validators.required],
    courseDescription: [''],
    courseAccess: ['Paid', Validators.required],
    coursePrice: [null, Validators.required],
    topic: ['', Validators.required],
    stage: ['', Validators.required],
    courseLanguage: ['', Validators.required],
    discountType: [''],
    discountValue: [null],
    tags: [[]],
    customFields: this.fb.array([]) // FormArray for custom fields
  });

  customFields: { key: string; value: string; checked: boolean }[] = [];
  newField = { key: '', value: '' };

  ngOnInit() {
    this.syncCustomFieldsWithFormArray(); // Sync customFields with FormArray on initialization
  }

  // Add a new custom field
  addField() {
    if (this.newField.key.trim() && this.newField.value.trim()) {
      const newFieldData = { key: this.newField.key, value: this.newField.value, checked: false };
      console.log('Adding field to customFields:', newFieldData);
      this.customFields.push(newFieldData); // Update UI array
      this.addCustomFieldControl(newFieldData.key, newFieldData.value, newFieldData.checked); // Update FormArray
      console.log('FormArray after adding:', this.courseForm.get('customFields')?.value);
      this.newField = { key: '', value: '' }; // Reset input fields
      this.syncCustomFieldsWithFormArray(); // Force sync after adding to ensure UI updates
    }
  }

  // Add control to FormArray with simpler structure
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

  // Remove a custom field
  removeField(index: number) {
    this.customFields.splice(index, 1); // Remove from UI array
    const customFields = this.courseForm.get('customFields') as FormArray;
    customFields.removeAt(index); // Remove from FormArray
    this.syncCustomFieldsWithFormArray(); // Resync after removal to ensure consistency
    console.log('FormArray after removal:', this.courseForm.get('customFields')?.value);
  }

  // Sync customFields with FormArray
  syncCustomFieldsWithFormArray() {
    const customFieldsArray = this.courseForm.get('customFields') as FormArray;
    this.customFields = customFieldsArray.controls.map((control: any) => ({
      key: control.get('key')?.value || '',
      value: control.get('value')?.value || '',
      checked: control.get('checked')?.value || false
    }));
    console.log('Synced customFields:', this.customFields);
  }

  // Helper to get FormArray
  get customFieldsArray() {
    return this.courseForm.get('customFields') as FormArray;
  }

  onSubmit() {
    console.log(this.courseForm.value);
  }

  handleCancel() {
    this.isAddPopupVisible = false;
    this.isAddPopupVisibleChange.emit(false);
  }

  open() {
    this.isAddPopupVisible = true;
  }

  selectedImageName: string = '';
  selectedImageUrl: string | null = null;

  selectedVideoName: string = '';
  selectedVideoUrl: string | null = null;

  selectedFileName: string = '';

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

  removeImage() {
    this.selectedImageUrl = null;
    this.selectedImageName = '';
    this.ImageInput.nativeElement.value = ''; // Reset the input
  }
  
  removeVideo() {
    this.selectedVideoUrl = null;
    this.selectedVideoName = '';
    this.VideoInput.nativeElement.value = ''; // Reset the input
  }

  getFileSize(size: number): string {
    return size < 1024 * 1024
      ? (size / 1024).toFixed(2) + ' KB'
      : (size / (1024 * 1024)).toFixed(2) + ' MB';
  }

  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }
}