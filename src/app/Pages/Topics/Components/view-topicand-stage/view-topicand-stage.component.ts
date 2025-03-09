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

@Component({
  selector: 'app-view-topicand-stage',
  standalone: true,
  imports: [RouterModule, TopPopComponent ,CommonModule, SpliceDescreptionPipe , DatePipe,TooltipModule],
  templateUrl: './view-topicand-stage.component.html',
  styleUrls:[ './view-topicand-stage.component.scss']
})
export class ViewTopicandStageComponent {


  topicId: number = 0; 
  text:string ='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas sunt atque, dolor sit quasi quos assumenda ratione ea exercitationem illo vitae cumque accusantium nisi omnis sequi dignissimos debitis id odit cum porro doloribus deserunt dolore? Blanditiis cumque inventore eius, dolor error fugit vero asperiores voluptas assumenda eveniet optio. Assumenda eos, sed, nesciunt est nobis quam nihil velit, maxime id a tenetur alias vitae voluptatum ipsam amet quia fugit reiciendis magni blanditiis quas molestiae. Odio quisquam optio officiis nostrum dolorum at quod saepe temporibus, repellendus rerum doloremque laboriosam illo suscipit molestias! Porro, id. Repellat explicabo minus ullam ad ipsam ipsa? Libero?'
  TopicResult: IResponseOf<TopicResult> = {} as IResponseOf<TopicResult>;
  
  private _getoneTopicService = inject(GetoneTopicService)
  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router) {}
  closeViewTopic(){
    this._Router.navigate([{ outlets: { dialog: null } }]);

  }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.topicId = params['id']; 
      console.log('Topic ID:', this.topicId); 
    });
    console.log('Topic ID:', this.topicId); 
    this._getoneTopicService.getTopicById(this.topicId).subscribe({
      next: (response) => {
        if (response.success) {
          this.TopicResult.result = response.result
          console.log(response)
        }
      },
      error: (error) => {
        console.error('Error:', error);
          }
    })  

  }
}
