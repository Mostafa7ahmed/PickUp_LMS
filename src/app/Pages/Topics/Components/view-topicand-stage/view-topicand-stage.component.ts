import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-topicand-stage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-topicand-stage.component.html',
  styleUrl: './view-topicand-stage.component.scss'
})
export class ViewTopicandStageComponent {

  private router = inject(Router)
  openPopup() {

    this.router.navigate([
      { outlets: { dialog: ['viewTopic'], dialog2: ['addTopic'] } }
    ]);


    }

}
