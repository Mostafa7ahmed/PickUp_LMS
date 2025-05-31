import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
export interface Feature {
  title: string;
  description: string;
  icon: string; 
}
@Component({
  selector: 'app-feature-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-cards.component.html',
  styleUrl: './feature-cards.component.scss'
})
export class FeatureCardsComponent {
  @Input() features: Feature[] = [];

}
