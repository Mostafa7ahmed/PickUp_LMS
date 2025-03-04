import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CustomSelectComponent } from '../../../../Components/custom-select/custom-select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { CommonModule, SlicePipe } from '@angular/common';
import { TextHeaderComponent } from '../text-header/text-header.component';
import { TooltipModule } from 'primeng/tooltip';
import { Select } from 'primeng/select';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [TopPopComponent,SplicTextPipe, TooltipModule,FormsModule, TextHeaderComponent, CommonModule,Select, NzSelectModule, CustomSelectComponent],
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
  showDescription :boolean = false
  @Output() isAddPopupVisibleChange = new EventEmitter<boolean>();
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

  customFields: { key: string; value: string; checked: boolean }[] = [];
  newField = { key: '', value: '' };

  addField() {
    if (this.newField.key.trim() && this.newField.value.trim()) {
      this.customFields.push({ ...this.newField, checked: false });
      this.newField = { key: '', value: '' };
    }
  }

  removeField(index: number) {
    this.customFields.splice(index, 1);
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
          videoElement.muted = true; // جعل الفيديو مكتومًا
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

  // حذف ملف معين من القائمة
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  ShowDescription(){
    this.showDescription = !this.showDescription
  }
  isOpen = false;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  removeImage() {
    this.selectedImageUrl = null;
    this.selectedImageName = '';
    this.ImageInput.nativeElement.value = ''; // إعادة تعيين الإدخال
  }
  
  removeVideo() {
    this.selectedVideoUrl = null;
    this.selectedVideoName = '';
    this.VideoInput.nativeElement.value = ''; // إعادة تعيين الإدخال
  }
  getFileSize(size: number): string {
    return size < 1024 * 1024
      ? (size / 1024).toFixed(2) + ' KB'
      : (size / (1024 * 1024)).toFixed(2) + ' MB';
  }

  // توليد رابط لتنزيل الملف
  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

}
