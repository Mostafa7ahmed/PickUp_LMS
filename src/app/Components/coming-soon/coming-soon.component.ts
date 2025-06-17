import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {
  launchDate = new Date('2025-07-01T00:00:00').getTime();
  countdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  email = '';
  message = '';
  messageClass = '';

  ngOnInit(): void {
    setInterval(() => this.updateCountdown(), 1000);
    this.initTypewriter();
    this.initRandomShapeMovement();
  }

  initTypewriter(): void {
    const text = 'Coming Soon';
    const typewriterElement = document.getElementById('typewriter');

    if (typewriterElement) {
      typewriterElement.textContent = '';

      // Start typewriter effect after a delay
      setTimeout(() => {
        this.typeWriter(typewriterElement, text, 0);
      }, 1500);
    }
  }

  typeWriter(element: HTMLElement, text: string, index: number): void {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => {
        this.typeWriter(element, text, index + 1);
      }, 200); // Speed of typing
    } else {
      // After typing is complete, start the cursor blinking
      setTimeout(() => {
        const cursor = document.querySelector('.cursor') as HTMLElement;
        if (cursor) {
          cursor.style.animation = 'blink 1s infinite';
        }
      }, 500);
    }
  }

  initRandomShapeMovement(): void {
    // Add random movement to shapes every few seconds
    setInterval(() => {
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape, index) => {
        if (index >= 6) { // Only affect additional shapes (7-20)
          const randomX = Math.random() * 20 - 10; // -10 to 10px
          const randomY = Math.random() * 20 - 10; // -10 to 10px
          const randomRotate = Math.random() * 360; // 0 to 360 degrees
          const randomScale = 0.3 + Math.random() * 0.7; // 0.3 to 1.0

          (shape as HTMLElement).style.transform += ` translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg) scale(${randomScale})`;
        }
      });
    }, 3000); // Every 3 seconds

    // Add mouse interaction for shapes
    document.addEventListener('mousemove', (e) => {
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape, index) => {
        if (index >= 6) { // Only affect additional shapes
          const rect = shape.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          if (distance < 100) { // Within 100px of mouse
            const moveX = (deltaX / distance) * -20; // Move away from mouse
            const moveY = (deltaY / distance) * -20;
            (shape as HTMLElement).style.transform += ` translate(${moveX}px, ${moveY}px)`;
          }
        }
      });
    });
  }

  updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.launchDate - now;

    if (distance < 0) {
      this.countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      return;
    }

    this.countdown.days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    this.countdown.hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    this.countdown.minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    this.countdown.seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
  }

  onSubmit(): void {
    if (!this.email.includes('@')) {
      this.message = 'Please enter a valid email.';
      this.messageClass = 'error';
    } else {
      this.message = 'Thanks! We will notify you.';
      this.messageClass = 'success';
      this.email = '';
    }
    setTimeout(() => this.message = '', 4000);
  }
}
