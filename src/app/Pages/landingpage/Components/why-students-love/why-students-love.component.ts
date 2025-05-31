import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-why-students-love',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-students-love.component.html',
  styleUrl: './why-students-love.component.scss'
})
export class WhyStudentsLoveComponent {
    features = [
    {
      icon: 'fas fa-laptop-code',
      title: 'Learn Anywhere',
      description: 'Access courses on any device, anytime, anywhere'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Earn Certificates',
      description: 'Get recognized for your achievements with verified certificates'
    },
    {
      icon: 'fas fa-user-graduate',
      title: 'Expert Support',
      description: 'Get help from instructors and peers whenever you need'
    },
    {
      icon: 'fas fa-clock',
      title: 'Self-Paced',
      description: 'Learn at your own pace with lifetime access to courses'
    }
  ];
  @ViewChildren('ddddd') cards!: QueryList<ElementRef>;

ngAfterViewInit() {
  console.log("Observer initialized");

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
