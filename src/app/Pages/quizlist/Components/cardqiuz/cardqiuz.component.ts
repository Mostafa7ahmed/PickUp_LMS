import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cardqiuz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cardqiuz.component.html',
  styleUrl: './cardqiuz.component.scss'
})
export class CardqiuzComponent {

  private router = inject(Router);

  // Search and filter properties
  searchTerm = '';

  // Sample quiz data
  sampleQuizzes = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and DOM manipulation.',
      questionsCount: 25,
      duration: 30,
      attempts: 156,
      status: 'published',
      difficulty: 'easy',
      tags: ['JavaScript', 'Programming', 'Web Dev'],
      createdDate: 'Jan 15, 2024'
    },
    {
      id: 2,
      title: 'React Advanced Concepts',
      description: 'Advanced React concepts including hooks, context, and performance optimization techniques.',
      questionsCount: 40,
      duration: 45,
      attempts: 89,
      status: 'draft',
      difficulty: 'hard',
      tags: ['React', 'Frontend', 'Advanced'],
      createdDate: 'Jan 20, 2024'
    },
    {
      id: 3,
      title: 'CSS Grid & Flexbox',
      description: 'Master modern CSS layout techniques with Grid and Flexbox for responsive design.',
      questionsCount: 18,
      duration: 25,
      attempts: 234,
      status: 'published',
      difficulty: 'medium',
      tags: ['CSS', 'Layout', 'Design'],
      createdDate: 'Jan 10, 2024'
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      description: 'Learn server-side development with Node.js, Express, and database integration.',
      questionsCount: 35,
      duration: 50,
      attempts: 67,
      status: 'scheduled',
      difficulty: 'hard',
      tags: ['Node.js', 'Backend', 'API'],
      createdDate: 'Jan 25, 2024'
    },
    {
      id: 5,
      title: 'HTML5 & Semantic Web',
      description: 'Understanding HTML5 features, semantic elements, and accessibility best practices.',
      questionsCount: 20,
      duration: 20,
      attempts: 312,
      status: 'published',
      difficulty: 'easy',
      tags: ['HTML', 'Semantic', 'Accessibility'],
      createdDate: 'Jan 5, 2024'
    },
    {
      id: 6,
      title: 'TypeScript Deep Dive',
      description: 'Advanced TypeScript features including generics, decorators, and type manipulation.',
      questionsCount: 30,
      duration: 40,
      attempts: 45,
      status: 'draft',
      difficulty: 'hard',
      tags: ['TypeScript', 'Advanced', 'Types'],
      createdDate: 'Jan 30, 2024'
    }
  ];

  openPopup() {
    this.router.navigate([{ outlets: { dialog: ['addQuiz'] } }]);
  }

}
