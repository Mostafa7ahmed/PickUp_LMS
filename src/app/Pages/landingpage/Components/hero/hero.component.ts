import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NzIconModule , TranslateModule ,RouterLink, CommonModule] ,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  
})
export class HeroComponent {
features = [
  'Create and manage interactive courses easily',
  'Build your own learning experience',
  'Track learners’ progress with real-time analytics',
  'Add quizzes, assignments, and certifications in minutes',
  'Engage in interactive and personalized learning content',
  'Track your learning progress and achievements',
  'Smart Task Management for Effective Learning'
];
}
