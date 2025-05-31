import { Feature, FeatureCardsComponent } from './../feature-cards/feature-cards.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-for-instructor',
  standalone: true,
  imports: [FeatureCardsComponent],
  templateUrl: './feature-for-instructor.component.html',
  styleUrl: './feature-for-instructor.component.scss'
})
export class FeatureForInstructorComponent {
featuresData: Feature[] = [
  {
    title: 'Course Creation',
    description: 'Easily create and organize your course content with our intuitive interface',
    icon: 'fa-edit'
  },
  {
    title: 'Quiz Management',
    description: 'Create engaging quizzes and track student performance in real-time',
    icon: 'fa-question-circle'
  },
  {
    title: 'Student Communication',
    description: 'Stay connected with your students through integrated chat features',
    icon: 'fa-comments'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track course performance and student engagement with detailed analytics',
    icon: 'fa-chart-line'
  },
  {
    title: 'Coupon Management',
    description: 'Create and manage promotional offers to boost course enrollment',
    icon: 'fa-ticket-alt'
  },
  {
    title: 'Course Settings',
    description: 'Customize course access, pricing, and content visibility',
    icon: 'fa-cog'
  }
];

}
