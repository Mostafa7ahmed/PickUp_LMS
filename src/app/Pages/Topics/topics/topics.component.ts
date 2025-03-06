import { Component } from '@angular/core';
import { AllTopicComponent } from "../Components/all-topic/all-topic.component";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddTopicComponent } from '../../topic/Components/add-topic/add-topic.component';
import { AddStagesComponent } from '../../topic/Components/add-stages/add-stages.component';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [AllTopicComponent, CommonModule, RouterOutlet, AddTopicComponent], 
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent {
  constructor(private router: Router) {}

  openPopup() {
    this.router.navigate([{ outlets: { popup: ['new-project'] } }], { relativeTo: this.router.routerState.root });  }
  
}
