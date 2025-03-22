import { Component } from '@angular/core';
import { AllTopicComponent } from "../Components/all-topic/all-topic.component";
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [AllTopicComponent, CommonModule, RouterModule , TranslateModule], 
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent {
  constructor(private router: Router) {}

  openPopup() { this.router.navigate([{ outlets: { dialog: [ 'addTopic'] } }]);  }
  
}
