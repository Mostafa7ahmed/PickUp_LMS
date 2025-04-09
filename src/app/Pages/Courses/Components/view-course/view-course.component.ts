import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TextHeaderComponent } from "../text-header/text-header.component";
import { ReativeFormModule } from '../../../../Core/Shared/Modules/reative-form/reative-form.module';
import { CustomFildsService } from '../../Core/service/custom-filds.service';
import { IPaginationResponse, IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { ICustomField } from '../../Core/interface/icustom-field';
import { Select } from 'primeng/select';
import { NewCustomFieldRequest } from '../../Core/interface/icreate-course';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AddStageComponent } from "../../../Stages/Components/add-stage/add-stage.component";
import Plyr from 'plyr';
import { GetonecourseService } from '../../Core/service/getonecourse.service';
import { ActivatedRoute } from '@angular/router';
import { CourseResult } from '../../Core/interface/icourses';
import { environment } from '../../../../Environments/environment';
import { ViewCourse } from '../../Core/interface/view-course';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { link } from 'fs';
import { DeleteCourseComponent } from "../delete-course/delete-course.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-view-course',
  standalone: true,
  imports: [TextHeaderComponent,TranslateModule, ReativeFormModule, Select, SplicTextPipe, TabsModule, ButtonModule, TooltipModule, DeleteCourseComponent],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.scss'
})
export class ViewCourseComponent implements AfterViewInit ,OnInit{


  private _CustomFildsService = inject(CustomFildsService);
  private _getonecourseService = inject(GetonecourseService);
  private _ActivatedRoute = inject(ActivatedRoute);
  isDeletePopupVisible :boolean = false;
  selectedDeleteId : number  | null = null;
  isShowOption: boolean = false;

  private _FormBuilder = inject(FormBuilder);
  get customFieldsArray(): FormArray {
    return this.courseForm.get('customFields') as FormArray;
  }

  get customFieldsControls(): FormGroup[] {
    return this.customFieldsArray.controls as FormGroup[];
  }


  courseForm: FormGroup = this._FormBuilder.group({

    customFields: this._FormBuilder.array([])

  });
  fieldForm: FormGroup = this._FormBuilder.group({
    key: [null],
    value: ['']
  });


  newCustomFieldList: NewCustomFieldRequest[] = [ ];
  customFieldListResponse: IPaginationResponse<ICustomField> = {} as IPaginationResponse<ICustomField>;
  courseResultResponse: IResponseOf<ViewCourse> = {} as IResponseOf<ViewCourse>;
 baseUrlFile = environment.baseUrlFiles ;
  @ViewChild('player') playerRef!: ElementRef;
  selectedImage!: string | null
  editIndex: number | null = null;
  player!: Plyr;
  CourseId: number = 0;

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
    this.customFieldsArray.clear();
  

  
    this.customFieldListResponse.result.forEach((field: ICustomField) => {
      const group = this._FormBuilder.group({
        id: [field.id ?? null],
        key: [field.key],
        value: [field.value],
        visible: [field.visible ?? true]
      });
      this.customFieldsArray.push(group);
    });
  }

  getOneCourse(id:number){
    this._getonecourseService.getCourse(id).subscribe((res: any) => {
      if(res.success){
        this.courseResultResponse = res;
        console.log(this.courseResultResponse.result)


      }

    });
  }
  downloadFile(fileUrl: string) {
   console.log(fileUrl);
  
    const link = document.createElement('a');
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();

  }
  onVisibleChange(index: number) {
    const field = this.customFieldsArray.at(index);
    console.log('Visible Now:', field.get('visible')?.value);
  }
  addField() {
    const keyControl = this.fieldForm.get('key')?.value;
    const valueControl = this.fieldForm.get('value')?.value;

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
      value: [valueControl.trim()],
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
        value: 0,
        createdOn: null
      });
    }

    this.newCustomFieldList = this.customFieldsArray.value;

    this.fieldForm.get('key')?.reset();
    this.fieldForm.get('value')?.reset();
  }

  removeField(index: number) {
    this.customFieldsArray.removeAt(index);
    this.newCustomFieldList = this.customFieldsArray.value;
  }

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(params => {
      if (params['courseId'] && params['courseId'] !== '0') {
        this.CourseId = +params['courseId'];
        console.log(this.CourseId)
        this.getOneCourse(this.CourseId)
      }
    });
  
  }
  
  ngAfterViewInit() {
    this.player = new Plyr(this.playerRef.nativeElement);
  }
  toggleShow(){
    this.isShowOption = !this.isShowOption;
  }

  openDeletePopup(){
    this.isDeletePopupVisible = true;
    this.selectedDeleteId = this.CourseId;
    console.log(this.selectedDeleteId)
    this.toggleShow()
  }
  closeDeletePopup() {
    this.isDeletePopupVisible = false;
    this.selectedDeleteId = null;
  }
}
