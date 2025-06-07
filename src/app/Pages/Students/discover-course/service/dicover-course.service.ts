import { Injectable } from '@angular/core';
import { IDicoverCourse } from '../../my-course/core/interface/icourse-student';

@Injectable({
  providedIn: 'root'
})
export class DicoverCourseService {

  constructor() { }
    courses: IDicoverCourse[] = [
    {
      id: 1,
      title: 'Advanced Angular Development',
      instructor: 'Dr. Sarah Wilson',
      description: 'Master advanced Angular concepts including RxJS, state management, and performance optimization.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
      instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      originalPrice: 149.99,
      discount: 40,

      totalLessons: 24,
      completedLessons: 18,
      duration: '8 weeks',
      rating: 4.8,
      category: 'Web Development',
      enrolledDate: new Date('2024-01-15'),
      lastAccessed: new Date('2024-03-10')
    },
    {
      id: 2,
      title: 'Database Design & Management',
      instructor: 'Prof. Michael Chen',
      description: 'Learn database design principles, SQL optimization, and modern database technologies.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
            instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      originalPrice: 149.99,
      discount: 40, totalLessons: 20,
      completedLessons: 9,
      duration: '6 weeks',
      rating: 4.6,
      category: 'Database',
      enrolledDate: new Date('2024-02-01'),
      lastAccessed: new Date('2024-03-08')
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Introduction to machine learning algorithms, data preprocessing, and model evaluation.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
      originalPrice: 149.99,
            instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      discount: 40, totalLessons: 32,
      completedLessons: 10,
      duration: '12 weeks',
      rating: 4.9,
      category: 'AI/ML',
      enrolledDate: new Date('2024-02-15'),
      lastAccessed: new Date('2024-03-09')
    },
    {
      id: 4,
      title: 'Cybersecurity Essentials',
      instructor: 'Prof. David Thompson',
      description: 'Essential cybersecurity concepts, threat analysis, and security best practices.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
      originalPrice: 149.99,
      discount: 40, totalLessons: 16,
            instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      completedLessons: 14,
      duration: '4 weeks',
      rating: 4.7,
      category: 'Security',
      enrolledDate: new Date('2024-01-10'),
      lastAccessed: new Date('2024-03-11')
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Introduction to machine learning algorithms, data preprocessing, and model evaluation.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
      originalPrice: 149.99,
      discount: 40, totalLessons: 32,
            instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      completedLessons: 10,
      duration: '12 weeks',
      rating: 4.9,
      category: 'AI/ML',
      enrolledDate: new Date('2024-02-15'),
      lastAccessed: new Date('2024-03-09')
    },
    {
      id: 4,
      title: 'Cybersecurity Essentials',
      instructor: 'Prof. David Thompson',
      description: 'Essential cybersecurity concepts, threat analysis, and security best practices.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
      originalPrice: 149.99,
      discount: 40, totalLessons: 16,
      completedLessons: 14,
            instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      duration: '4 weeks',
      rating: 4.7,
      category: 'Security',
      enrolledDate: new Date('2024-01-10'),
      lastAccessed: new Date('2024-03-11')
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Introduction to machine learning algorithms, data preprocessing, and model evaluation.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
      originalPrice: 149.99,
      discount: 40, totalLessons: 32,
      completedLessons: 10,
            instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      duration: '12 weeks',
      rating: 4.9,
      category: 'AI/ML',
      enrolledDate: new Date('2024-02-15'),
      lastAccessed: new Date('2024-03-09')
    },
    {
      id: 4,
      title: 'Cybersecurity Essentials',
            instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      instructor: 'Prof. David Thompson',
      description: 'Essential cybersecurity concepts, threat analysis, and security best practices.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
      originalPrice: 149.99,
      discount: 40, totalLessons: 16,
      completedLessons: 14,
      duration: '4 weeks',
      rating: 4.7,
      category: 'Security',
      enrolledDate: new Date('2024-01-10'),
      lastAccessed: new Date('2024-03-11')
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
            instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      description: 'Introduction to machine learning algorithms, data preprocessing, and model evaluation.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
      originalPrice: 149.99,
      discount: 40, totalLessons: 32,
      completedLessons: 10,
      duration: '12 weeks',
      rating: 4.9,
      category: 'AI/ML',
      enrolledDate: new Date('2024-02-15'),
      lastAccessed: new Date('2024-03-09')
    },
    {
      id: 4,
      title: 'Cybersecurity Essentials',
            instructorPhoto: 'https://randomuser.me/api/portraits/women/68.jpg',

      instructor: 'Prof. David Thompson',
      description: 'Essential cybersecurity concepts, threat analysis, and security best practices.',
      image: 'Images/Course/Image+Background.png',
      price: 89.99,
      originalPrice: 149.99,
      discount: 40, totalLessons: 16,
      completedLessons: 14,
      duration: '4 weeks',
      rating: 4.7,
      category: 'Security',
      enrolledDate: new Date('2024-01-10'),
      lastAccessed: new Date('2024-03-11')
    }
  ];
}
