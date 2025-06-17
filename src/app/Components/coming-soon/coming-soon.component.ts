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
  launchDate = new Date('2025-07-15T00:00:00').getTime();
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
