import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CustomSelectComponent } from '../../../../Components/custom-select/custom-select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [TopPopComponent,FormsModule, CommonModule,NzSelectModule,CustomSelectComponent],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.scss'
})
export class AddCoursesComponent {

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    @ViewChild('VideoInput') VideoInput!: ElementRef<HTMLInputElement>;
    @ViewChild('ImageInput') ImageInput!: ElementRef<HTMLInputElement>;
        @Input() isAddPopupVisible: boolean = false;
      
        listOfTagOptions: string[] = [];
        @Output() isAddPopupVisibleChange = new EventEmitter<boolean>();
        handleCancel() {
          this.isAddPopupVisible = false;
  
          this.isAddPopupVisibleChange.emit(false);
        }
        open(){
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
          this.selectedImageUrl = URL.createObjectURL(file); // عرض الصورة المختارة
        } else if (type === 'video') {
          this.selectedVideoName = fileName;
          this.selectedVideoUrl = URL.createObjectURL(file); // عرض الفيديو المختار
        } else if (type === 'file') {
          this.selectedFileName = fileName;
        }
      }
    }

    onSelectChange(selectedValue: string) {
      console.log('Selected Option:', selectedValue);
    }
  
  
    

}
