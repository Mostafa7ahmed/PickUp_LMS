import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-all-instructor',
  standalone: true,
  imports: [CommonModule , CarouselModule],
  templateUrl: './all-instructor.component.html',
  styleUrl: './all-instructor.component.scss'
})
export class AllInstructorComponent {
  instructors = [
    {
      name: 'Sarah Mitchell',
      role: 'Data Science Lead',
      description: 'Former Data Scientist at Google with 8+ years of industry experience',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      courses: 24,
      students: '2.8k',
      rating: 4.9,
      color: '#00b894'
    },
    {
      name: 'David Anderson',
      role: 'Software Engineering',
      description: 'Tech Lead at Microsoft with expertise in cloud architecture',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      courses: 18,
      students: '3.2k',
      rating: 4.8,
      color: '#0984e3'
    },
    {
      name: 'Emily Chen',
      role: 'Digital Marketing',
      description: 'Marketing Director with experience at top Fortune 500 companies',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      courses: 15,
      students: '2.5k',
      rating: 4.9,
      color: '#6c5ce7'
    },
    {
      name: 'Michael Roberts',
      role: 'Business Strategy',
      description: 'Former CEO and business consultant with 15+ years experience',
      image: 'https://randomuser.me/api/portraits/men/55.jpg',
      courses: 12,
      students: '1.9k',
      rating: 4.7,
      color: '#fd7e14'
    },
        {
      name: 'Sarah Mitchell',
      role: 'Data Science Lead',
      description: 'Former Data Scientist at Google with 8+ years of industry experience',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      courses: 24,
      students: '2.8k',
      rating: 4.9,
      color: '#00b894'
    },
    {
      name: 'David Anderson',
      role: 'Software Engineering',
      description: 'Tech Lead at Microsoft with expertise in cloud architecture',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      courses: 18,
      students: '3.2k',
      rating: 4.8,
      color: '#0984e3'
    },
    {
      name: 'Emily Chen',
      role: 'Digital Marketing',
      description: 'Marketing Director with experience at top Fortune 500 companies',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      courses: 15,
      students: '2.5k',
      rating: 4.9,
      color: '#6c5ce7'
    },
    {
      name: 'Michael Roberts',
      role: 'Business Strategy',
      description: 'Former CEO and business consultant with 15+ years experience',
      image: 'https://randomuser.me/api/portraits/men/55.jpg',
      courses: 12,
      students: '1.9k',
      rating: 4.7,
      color: '#fd7e14'
    },
    
  ];

  responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1
  }
];

autoplay: number = 5000;

pauseCarousel() {
  this.autoplay = 0;
}

resumeCarousel() {
  this.autoplay = 5000;
}
}
