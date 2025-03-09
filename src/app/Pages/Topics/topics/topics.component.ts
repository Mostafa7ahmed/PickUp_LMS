import { Component } from '@angular/core';
import { AllTopicComponent } from "../Components/all-topic/all-topic.component";
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [AllTopicComponent, CommonModule, RouterModule], 
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent {
  constructor(private router: Router) {}

  openPopup() { this.router.navigate([{ outlets: { dialog: [ 'addTopic'] } }]);  }
  
}
