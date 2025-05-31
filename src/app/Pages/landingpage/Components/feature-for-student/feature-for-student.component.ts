import { Component } from '@angular/core';
import { Feature, FeatureCardsComponent } from "../feature-cards/feature-cards.component";

@Component({
  selector: 'app-feature-for-student',
  standalone: true,
  imports: [FeatureCardsComponent],
  templateUrl: './feature-for-student.component.html',
  styleUrl: './feature-for-student.component.scss'
})
export class FeatureForStudentComponent {
featuresData: Feature[] = [
    {
      title: 'Course Discovery',
      description: 'Find the perfect courses with advanced search and personalized recommendations',
      icon: 'fa-search'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed progress analytics and achievements',
      icon: 'fa-map-marker-alt'
    },
    {
      title: 'Community Learning',
      description: 'Connect with peers and instructors through discussion forums and live chat',
      icon: 'fa-users'
    },
    {
      title: 'To do',
      description: 'Track your progress and stay organized with a personalized to-do list',
      icon: 'fa-calendar-alt'
    },
    {
      title: 'Certification',
      description: 'Earn verified certificates upon successful course completion',
      icon: 'fa-certificate'
    }
  ];
}
