import { Component, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { ColorlistService } from '../../../../Core/Shared/service/colorlist.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateStageService } from '../../Core/service/create-stage.service';
import { GetOneService } from '../../Core/service/get-one.service';
import { UpdateStageService } from '../../Core/service/update-stage.service';
import { CustomValidators } from '../../../../Core/Shared/validators/custom-validators';
import { ValidationService } from '../../../../Core/Services/validation.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-edit-stage',
  standalone: true,
  imports: [TopPopComponent , CommonModule , ReactiveFormsModule],
  templateUrl: './edit-stage.component.html',
  styleUrl: './edit-stage.component.scss'
})
export class EditStageComponent {
    colors: string[] = [];
    private colorlistService = inject(ColorlistService);
    private _ActivatedRoute = inject(ActivatedRoute);
    private _getOneService = inject(GetOneService);

    private router = inject(Router);
    stageId: number | null = null;
    private _FormBuilder = inject(FormBuilder);
    private _UpdateStageService= inject(UpdateStageService);
    private _validationService = inject(ValidationService);
    private _messageService = inject(NzMessageService);
  
    showPackageColor = false;
    showValidationErrors = false;
    
    stageForm : FormGroup = this._FormBuilder.group({
      name: ['', [Validators.required, CustomValidators.name(), Validators.minLength(3), Validators.maxLength(50)]],
      color: ['#a0151e'],  
      icon:["fa fa-folder-open"],
      shadow:["3e97ff66"],
      id:[null]
    })
    get selectedColor(): string {
      return this.stageForm.get('color')?.value || ''; 
    }
  
    ngOnInit(): void {
      this.colors = this.colorlistService.getColors();
      this._ActivatedRoute.params.subscribe(params => {
        this.stageId = params['StageId'] ? +params['StageId'] : null;  
        if (this.stageId !== null) {
          this._getOneService.getStage(this.stageId).subscribe((res: any) => {
            console.log(res);
            if (res.success) {
              this.stageForm.patchValue({
                name: res.result.name,
                color: res.result.color,
                icon: res.result.icon,
                shadow: res.result.shadow,
                id: res.result.id,
      
              });
            }
          });
        }

      });
    }
  
    selectColor(color: string): void {
      this.stageForm.patchValue({ color });
      this.showPackageColor = false;
    }
    showPackage(): void {
      this.showPackageColor =!this.showPackageColor;
    }
    closePopup() {
      this.router.navigate([{ outlets: { dialog2: null } }]);
    }
    updateStage() {
      this.showValidationErrors = true;
      
      // Mark all fields as touched to show validation errors
      this._validationService.markAllFieldsAsTouched(this.stageForm);

      if (!this.stageForm.valid) {
        this._messageService.error('يرجى تصحيح الأخطاء في النموذج');
        return;
      }

      if (this.stageId !== null) {
        this._UpdateStageService.updateStage(this.stageForm.value).subscribe({
          next: (res) => {
            this._messageService.success('تم تحديث المرحلة بنجاح');
            this.router.navigate([{ outlets: { dialog2: null } }]);
            console.log("Stage updated successfully:", res);
          },
          error: (err) => {
            this._messageService.error('حدث خطأ أثناء تحديث المرحلة');
            console.error("Error updating stage:", err);
          }
        });
      }
    }

    // Validation helper methods
    isFieldInvalid(fieldName: string): boolean {
      return this._validationService.isFieldInvalid(this.stageForm, fieldName);
    }

    isFieldValid(fieldName: string): boolean {
      return this._validationService.isFieldValid(this.stageForm, fieldName);
    }

    getErrorMessage(fieldName: string): string {
      const control = this.stageForm.get(fieldName);
      return this._validationService.getErrorMessage(control, fieldName);
    }

    getFieldCssClass(fieldName: string): string {
      return this._validationService.getFieldCssClass(this.stageForm, fieldName);
    }
}
