import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren('card') cards!: QueryList<ElementRef>;

ngAfterViewInit() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  this.cards.forEach(card => {
    const el = card.nativeElement as HTMLElement;
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

}
