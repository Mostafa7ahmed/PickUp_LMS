import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AllTopicComponent } from '../all-topic/all-topic.component';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CustomslectwithiconComponent } from '../../../Courses/Components/customslectwithicon/customslectwithicon.component';
import { CustomSelectComponent } from '../../../../Components/custom-select/custom-select.component';
import { IconListService } from '../../../../Core/Shared/service/icon-list.service';
import { ColorlistService } from '../../../../Core/Shared/service/colorlist.service';
import { SelectIconComponent } from '../../../../Components/select-icon/select-icon.component';
import { TopiclistService } from '../../Service/topiclist.service';
import { ITopiclist } from '../../../Courses/Core/interface/itopiclist';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [TopPopComponent, CommonModule, SelectIconComponent,ReactiveFormsModule ,CustomslectwithiconComponent, RouterModule], 
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.scss'
})
export class AddTopicComponent implements OnInit {
  icons: string[] = [];
  colors: string[] = [];
  currentIcon: string = 'fa fa-file-pen';
  colorDefault: string = "#778fe6cf";
  ishowTab: boolean = true;
  isnext: boolean = false;

  selectedValue :any 
  topicsList: ITopiclist[] = [];
  
  private _topiclistService = inject(TopiclistService);
  private router = inject(Router);
  private colorlistService = inject(ColorlistService);
  private iconsService = inject(IconListService);

    constructor() {
      this.icons = this.iconsService.getIcons();
      this.colors = this.colorlistService.getColors();
    }
    
    handleIconSelected(icon: string) {
      this.currentIcon = icon;
    }
  
    handleColorSelected(color: string) {
      this.colorDefault = color;
    }
    openIndex: number | null = null; // تتبع العنصر المفتوح

    togglePackageColor(index: number) {
      this.openIndex = this.openIndex === index ? null : index;
        }
    showTab() {
      this.ishowTab = !this.ishowTab;
    }
    closePopup() {
      this.router.navigate([{ outlets: { dialog: null } }]); 
    }
    next(){
      this.isnext = false;
    }
    
      stageForm: FormGroup = new FormGroup({
        stages: new FormArray([])
      });
    
 
    
      createFormStage() {
        this.stageForm = new FormGroup({
          stages: new FormArray([])
        });
      }
    
      get stages(): FormArray {
        return this.stageForm?.get('stages') as FormArray || new FormArray([]);   
      }
    
      addStage() {
        const orderValue = this.stages.length + 2;
        this.stages.push(new FormGroup({
          name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
          color: new FormControl('red', Validators.required),
          icon: new FormControl('fa fa-address-book', Validators.required),
          order: new FormControl(orderValue)
        }));
  
      }
    
      removeStage(index: number) {
        this.stages.removeAt(index);
      }

    ngOnInit(): void {
      this._topiclistService.getAlllits().subscribe(topics => {
        this.topicsList = topics.result;
        let defautlTopic = this.topicsList.filter((e: ITopiclist) => e.default)[0];
        this.selectedValue = defautlTopic;

        console.log('topics', topics);
      });
    }
  
}
