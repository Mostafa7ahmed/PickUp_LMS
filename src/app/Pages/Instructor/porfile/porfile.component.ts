import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../Core/Services/login.service';
import { Decode } from '../../../Core/Interface/user';

export interface Follower {
  name: string;
  title: string;
  image: string;
  joinDate: Date;
  courses: number;
  rating: number;
}

export interface InstructorStats {
  totalStudents: number;
  totalCourses: number;
  avgRating: number;
  yearsExperience: number;
  certifications: number;
  completionRate: number;
}

@Component({
  selector: 'app-porfile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './porfile.component.html',
  styleUrl: './porfile.component.scss'
})
export class PorfileComponent implements OnInit {
  private _LoginService = inject(LoginService);
  dataUser: Decode = {} as Decode;
  
  searchText = '';
<<<<<<< HEAD
  isEditing = false;
  
  // Enhanced instructor data
  instructorProfile = {
    name: 'Dr. Amr Mausad',
    title: 'Senior Data Science Instructor | AI Researcher',
    bio: 'With over 15 years of experience in data science and machine learning, I specialize in making complex technical concepts accessible to learners of all levels. My research focuses on practical applications of AI in business and healthcare.',
    expertise: ['Machine Learning', 'Data Science', 'Python', 'AI Research', 'Deep Learning'],
    education: [
      'Ph.D. in Computer Science - Stanford University',
      'M.S. in Data Science - MIT',
      'B.S. in Mathematics - Cairo University'
    ],
    achievements: [
      'Published 50+ research papers in top AI conferences',
      'Mentored 500+ students in data science careers',
      'Winner of Best Instructor Award 2023',
      'Lead researcher on 3 major AI projects'
    ]
  };

  stats: InstructorStats = {
    totalStudents: 1247,
    totalCourses: 12,
    avgRating: 4.9,
    yearsExperience: 15,
    certifications: 8,
    completionRate: 94
  };

  followers: Follower[] = [
    { 
      name: 'Nehad Naiem', 
      title: 'Data Analyst at TechCorp', 
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      joinDate: new Date('2024-01-15'),
      courses: 3,
      rating: 4.8
    },
    { 
      name: 'Mohamed Yasser', 
      title: 'ML Engineer at AI Solutions', 
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      joinDate: new Date('2024-02-08'),
      courses: 5,
      rating: 4.9
    },
    { 
      name: 'Mahmoud Gamal', 
      title: 'Student at MIT', 
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      joinDate: new Date('2024-01-22'),
      courses: 2,
      rating: 5.0
    },
    { 
      name: 'Sarah Johnson', 
      title: 'Data Scientist at HealthTech', 
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      joinDate: new Date('2023-12-10'),
      courses: 4,
      rating: 4.7
    },
    { 
      name: 'Olivia Martinez', 
      title: 'AI Researcher at Google', 
      image: 'https://randomuser.me/api/portraits/women/22.jpg',
      joinDate: new Date('2024-03-05'),
      courses: 6,
      rating: 4.9
    },
    { 
      name: 'Robert Taylor', 
      title: 'CTO at DataWorks', 
      image: 'https://randomuser.me/api/portraits/men/65.jpg',
      joinDate: new Date('2024-01-30'),
      courses: 3,
      rating: 4.8
    },
    { 
      name: 'Amina Ali', 
      title: 'Student at Stanford', 
      image: 'https://randomuser.me/api/portraits/women/30.jpg',
      joinDate: new Date('2024-02-18'),
      courses: 2,
      rating: 5.0
    },
    { 
      name: 'Kareem Abdallah', 
      title: 'AI Intern at OpenAI', 
      image: 'https://randomuser.me/api/portraits/men/28.jpg',
      joinDate: new Date('2024-03-12'),
      courses: 4,
      rating: 4.9
    },
    { 
      name: 'Lana Rose', 
      title: 'ML Research Assistant', 
      image: 'https://randomuser.me/api/portraits/women/16.jpg',
      joinDate: new Date('2024-01-05'),
      courses: 3,
      rating: 4.7
    },
    { 
      name: 'Ahmed Tarek', 
      title: 'Data Engineer at IBM', 
      image: 'https://randomuser.me/api/portraits/men/40.jpg',
      joinDate: new Date('2024-02-25'),
      courses: 5,
      rating: 4.8
    },
    { 
      name: 'Fatima Zahra', 
      title: 'AI Ethics Researcher', 
      image: 'https://randomuser.me/api/portraits/women/55.jpg',
      joinDate: new Date('2024-03-08'),
      courses: 2,
      rating: 5.0
    },
    { 
      name: 'James Brown', 
      title: 'Full Stack Developer', 
      image: 'https://randomuser.me/api/portraits/men/53.jpg',
      joinDate: new Date('2024-01-12'),
      courses: 3,
      rating: 4.6
    }
  ];

  ngOnInit() {
    this.dataUser = this._LoginService.saveUserAuth();
  }
=======
followers: Follower[] = [
  { name: 'Nehad Naiem', title: 'Data Analyst at TechCorp', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Mohamed Yasser', title: 'ML Engineer at AI Solutions', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Mahmoud Gamal', title: 'Student at MIT', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Sarah Johnson', title: 'Data Scientist at HealthTech', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Olivia Martinez', title: 'AI Researcher at Google', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Robert Taylor', title: 'CTO at DataWorks', image: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Amina Ali', title: 'Student at Stanford', image: 'https://randomuser.me/api/portraits/women/30.jpg' },
  { name: 'Kareem Abdallah', title: 'AI Intern at OpenAI', image: 'https://randomuser.me/api/portraits/men/28.jpg' },
  { name: 'Lana Rose', title: 'ML Research Assistant', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { name: 'Ahmed Tarek', title: 'Data Engineer at IBM', image: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { name: 'Fatima Zahra', title: 'AI Ethics Researcher', image: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { name: 'James Brown', title: 'Full Stack Developer', image: 'https://randomuser.me/api/portraits/men/53.jpg' },
    { name: 'Nehad Naiem', title: 'Data Analyst at TechCorp', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Mohamed Yasser', title: 'ML Engineer at AI Solutions', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Mahmoud Gamal', title: 'Student at MIT', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Sarah Johnson', title: 'Data Scientist at HealthTech', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Olivia Martinez', title: 'AI Researcher at Google', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Robert Taylor', title: 'CTO at DataWorks', image: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Amina Ali', title: 'Student at Stanford', image: 'https://randomuser.me/api/portraits/women/30.jpg' },
  { name: 'Kareem Abdallah', title: 'AI Intern at OpenAI', image: 'https://randomuser.me/api/portraits/men/28.jpg' },
  { name: 'Lana Rose', title: 'ML Research Assistant', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { name: 'Ahmed Tarek', title: 'Data Engineer at IBM', image: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { name: 'Fatima Zahra', title: 'AI Ethics Researcher', image: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { name: 'James Brown', title: 'Full Stack Developer', image: 'https://randomuser.me/api/portraits/men/53.jpg' },
];
>>>>>>> 64669af2d189050710502789c0020a0a1285f09a

  filteredFollowers(): Follower[] {
    return this.followers.filter(f =>
      f.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      f.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    this.isEditing = false;
    console.log('Profile saved:', this.instructorProfile);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  getStarDisplay(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(5 - Math.ceil(rating));
  }
}
