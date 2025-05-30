import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {
  courses = [
    {
      image: 'Images/Course/Image+Background.png',
      tag: 'Best Seller',
      tagType: 'success',
      instructorName: 'Emily Chen',
      instructorTitle: 'Digital Marketing Lead',
      title: 'Digital Marketing Masterclass',
      duration: '12 weeks',
      lessons: 24,
      rating: 5,
      reviews: 482,
      price: 129,
      oldPrice: 199
    },
        {
      image: 'Images/Course/Image+Background.png',
      tag: 'Best Seller',
      tagType: 'success',
      instructorName: 'Emily Chen',
      instructorTitle: 'Digital Marketing Lead',
      title: 'Digital Marketing Masterclass',
      duration: '12 weeks',
      lessons: 24,
      rating: 5,
      reviews: 482,
      price: 129,
      oldPrice: 199
    },
    {
      image: 'Images/Course/Image+Background.png',
      tag: 'Advanced',
      tagType: 'info',
      instructorName: 'Sarah Mitchell',
      instructorTitle: 'Data Science Lead',
      title: 'Data Science & ML Bootcamp',
      duration: '16 weeks',
      lessons: 32,
      rating: 5,
      reviews: 329,
      price: 199,
      oldPrice: 299
    },
    {
      image: 'Images/Course/Image+Background.png',
      tag: 'Popular',
      tagType: 'warning',
      instructorName: 'David Anderson',
      instructorTitle: 'Tech Lead',
      title: 'Full-Stack Development',
      duration: '20 weeks',
      lessons: 40,
      rating: 5,
      reviews: 567,
      price: 249,
      oldPrice: 399
    },
       {
      image: 'Images/Course/Image+Background.png',
      tag: 'Advanced',
      tagType: 'info',
      instructorName: 'Sarah Mitchell',
      instructorTitle: 'Data Science Lead',
      title: 'Data Science & ML Bootcamp',
      duration: '16 weeks',
      lessons: 32,
      rating: 5,
      reviews: 329,
      price: 199,
      oldPrice: 299
    },
    {
      image: 'Images/Course/Image+Background.png',
      tag: 'Advanced',
      tagType: 'info',
      instructorName: 'Sarah Mitchell',
      instructorTitle: 'Data Science Lead',
      title: 'Data Science & ML Bootcamp',
      duration: '16 weeks',
      lessons: 32,
      rating: 5,
      reviews: 329,
      price: 199,
      oldPrice: 299
    },
    {
      image: 'Images/Course/Image+Background.png',
      tag: 'Popular',
      tagType: 'warning',
      instructorName: 'David Anderson',
      instructorTitle: 'Tech Lead',
      title: 'Full-Stack Development',
      duration: '20 weeks',
      lessons: 40,
      rating: 5,
      reviews: 567,
      price: 249,
      oldPrice: 399
    },
       {
      image: 'Images/Course/Image+Background.png',
      tag: 'Advanced',
      tagType: 'info',
      instructorName: 'Sarah Mitchell',
      instructorTitle: 'Data Science Lead',
      title: 'Data Science & ML Bootcamp',
      duration: '16 weeks',
      lessons: 32,
      rating: 5,
      reviews: 329,
      price: 199,
      oldPrice: 299
    },
  ];
}
