import { Component, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { ColorlistService } from '../../../../Core/Shared/service/colorlist.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateStageService } from '../../Core/service/create-stage.service';

@Component({
  selector: 'app-add-stage',
  standalone: true,
  imports: [TopPopComponent , CommonModule , ReactiveFormsModule],
  templateUrl: './add-stage.component.html',
  styleUrl: './add-stage.component.scss'
})
export class AddStageComponent implements OnInit{
  colors: string[] = [];
  private colorlistService = inject(ColorlistService);
  private _ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  stageId: number | null = null;
  private _FormBuilder = inject(FormBuilder);
  private _CreateStageService= inject(CreateStageService);

  showPackageColor = false;
  stageForm : FormGroup = this._FormBuilder.group({
    name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    color: ['#778fe6cf'],  
    icon:["fa fa-folder-open"],
    shadow:["#778fe6cf"],
    topicId:[null]
  })
  get selectedColor(): string {
    return this.stageForm.get('color')?.value || ''; 
  }

  ngOnInit(): void {
    this.colors = this.colorlistService.getColors();
    this._ActivatedRoute.params.subscribe(params => {
      this.stageId = params['StageId'] ? +params['StageId'] : null;  
      if (this.stageId !== null) {
        this.stageForm.patchValue({ topicId: this.stageId });
      }
      console.log("Stage ID:", this.stageId);
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
  addStage(){
    this._CreateStageService.createStage(this.stageForm.value).subscribe({
      next: (res) => {
        this.router.navigate([{ outlets: { dialog2: null } }]);

      },
      error: (err) => {
        console.error(err);
      }  
    })
    console.log(this.stageForm.value);

  }




}
