import { Component, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { ColorlistService } from '../../../../Core/Shared/service/colorlist.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateStageService } from '../../Core/service/create-stage.service';
import { GetOneService } from '../../Core/service/get-one.service';
import { UpdateStageService } from '../../Core/service/update-stage.service';
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
  
    showPackageColor = false;
    stageForm : FormGroup = this._FormBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      color: ['#778fe6cf'],  
      icon:["fa fa-folder-open"],
      shadow:["778fe6c0"],
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
      if (this.stageId !== null) {
        this._UpdateStageService.updateStage(this.stageForm.value).subscribe({
          next: (res) => {
            console.log("Stage updated successfully:", res);
            this.router.navigate([{ outlets: { dialog2: null } }]);
          },
          error: (err) => {
            console.error("Error updating stage:", err);
          }
        });
      }
    }
  
  

}
