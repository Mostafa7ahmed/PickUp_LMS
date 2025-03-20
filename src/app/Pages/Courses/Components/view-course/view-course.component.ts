import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { TextHeaderComponent } from "../text-header/text-header.component";
import { ReativeFormModule } from '../../../../Core/Shared/Modules/reative-form/reative-form.module';
import { CustomFildsService } from '../../Core/service/custom-filds.service';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { ICustomField } from '../../Core/interface/icustom-field';
import { DropdownModule } from 'primeng/dropdown';
import { Select } from 'primeng/select';
import { NewCustomFieldRequest } from '../../Core/interface/icreate-course';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-course',
  standalone: true,
  imports: [TextHeaderComponent,ReativeFormModule,Select,TabsModule ,ButtonModule ] ,
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.scss'
})
export class ViewCourseComponent {
  editIndex: number | null = null ;

    private _CustomFildsService = inject(CustomFildsService);
    private _FormBuilder = inject(FormBuilder);
      get customFieldsArray(): FormArray {
        return this.courseForm.get('customFields') as FormArray;
      }
    
      get customFieldsControls(): FormGroup[] {
        return this.customFieldsArray.controls as FormGroup[];
      }
    
      customFieldListResponse: IPaginationResponse<ICustomField> = {} as IPaginationResponse<ICustomField>;
    
      courseForm: FormGroup = this._FormBuilder.group({

        customFields: this._FormBuilder.array([])  
    
      });
      fieldForm: FormGroup = this._FormBuilder.group({
        key: [null],
        usage: ['']
      });
    
  
  selectedImage!: string | null 
  newCustomFieldList: NewCustomFieldRequest[] = [];
  value: number = 0;


  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  getICustomField() {
    this._CustomFildsService.getCustomField().subscribe(response => {
      if (response.success) {
        this.customFieldListResponse = response;

      }
    });
  }
  onVisibleChange(index: number) {
    const field = this.customFieldsArray.at(index);
    console.log('Visible Now:', field.get('visible')?.value);
  }
  addField() {
    const keyControl = this.fieldForm.get('key')?.value;
    const valueControl = this.fieldForm.get('usage')?.value;
  
    // Debug visibility state (اختياري)
    this.customFieldsArray.controls.forEach((field, index) => {
      console.log(`Field ${index} visible: `, field.get('visible')?.value);
    });
  
    // التحقق من القيم
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
  
    if (!this.customFieldListResponse.result) {
      this.customFieldListResponse.result = [];
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
  
    // حدّث اللستة اللي هتبعتها بعدين
    this.newCustomFieldList = this.customFieldsArray.value;
  
    // نظف الفورم
    this.fieldForm.get('key')?.reset();
    this.fieldForm.get('usage')?.reset();
  }
  
  removeField(index: number) {
    this.customFieldsArray.removeAt(index);
    this.newCustomFieldList = this.customFieldsArray.value;
  }
}
