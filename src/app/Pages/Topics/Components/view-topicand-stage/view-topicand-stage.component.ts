import { TopicResult } from './../../Core/Interface/itopic';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { SpliceDescreptionPipe } from '../../Core/Pipe/splice-descreption.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { GetoneTopicService } from '../../Service/getone-topic.service';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { CommonModule, DatePipe } from '@angular/common';
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";

@Component({
  selector: 'app-view-topicand-stage',
  standalone: true,
  imports: [RouterModule, TopPopComponent, CommonModule, SpliceDescreptionPipe, DatePipe, TooltipModule, TextHeaderComponent],
  templateUrl: './view-topicand-stage.component.html',
  styleUrls:[ './view-topicand-stage.component.scss']
})
export class ViewTopicandStageComponent {


  topicId: number = 0; 
  TopicResult: IResponseOf<TopicResult> = {} as IResponseOf<TopicResult>;
  bgColor:string ='';
  showEdit:boolean = false;
  
  private _getoneTopicService = inject(GetoneTopicService)
  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router) {}
  closeViewTopic(){
    this._Router.navigate([{ outlets: { dialog: null } }]);

  }
  toggleShow() {
    this.showEdit = !this.showEdit;
  }
  getTopicById(topicId:number){
    this._getoneTopicService.getTopicById(topicId).subscribe({
      next: (response) => {
        if (response.success) {
          this.TopicResult.result = response.result
          this.bgColor = this.convertHexToRgba(this.TopicResult.result.color, 0.4);
          console.log(this.bgColor)
        }
      },
      error: (error) => {
        console.error('Error:', error);
          }
    })  
  }
  
  convertHexToRgba(hex: string, opacity: number = 1): string {
    hex = hex.replace('#', '');

    if (hex.length !== 6) {
      console.error('Invalid HEX color:', hex);
      return '#3e97ff1a';
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.topicId = params['id']; 
      this.getTopicById(this.topicId)
    });



  }
}
