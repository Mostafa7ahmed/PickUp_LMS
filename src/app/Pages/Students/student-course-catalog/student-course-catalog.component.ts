import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  instructorPhoto: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  studentsCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  imageUrl: string;
  features: string[];
  isEnrolled: boolean;
  isFavorite: boolean;
}

@Component({
  selector: 'app-student-course-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-course-catalog.component.html',
  styleUrls: ['./student-course-catalog.component.scss']
})
export class StudentCourseCatalogComponent implements OnInit {
  
  private router = inject(Router);

  // Filter and search properties
  searchTerm = '';
  selectedCategory = 'all';
  selectedLevel = 'all';
  sortBy = 'newest';
  
  categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'languages', label: 'Languages' }
  ];

  levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  // Sample courses data
  allCourses: Course[] = [
    {
      id: 1,
      title: 'Complete React Development Course',
      description: 'Master React.js from basics to advanced concepts including Hooks, Context API, and state management.',
      instructor: 'Sarah Johnson',
      instructorPhoto: 'assets/images/instructors/sarah.jpg',
      price: 89.99,
      originalPrice: 149.99,
      discount: 40,
      rating: 4.8,
      studentsCount: 12450,
      duration: '32 hours',
      level: 'Intermediate',
      category: 'programming',
      imageUrl: 'assets/images/courses/react-course.jpg',
      features: ['32 hours of video', 'Certificate of completion', 'Lifetime access', 'Mobile friendly'],
      isEnrolled: false,
      isFavorite: false
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the principles of user interface and user experience design with hands-on projects.',
      instructor: 'Michael Chen',
      instructorPhoto: 'assets/images/instructors/michael.jpg',
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      rating: 4.9,
      studentsCount: 8920,
      duration: '28 hours',
      level: 'Beginner',
      category: 'design',
      imageUrl: 'assets/images/courses/ux-design.jpg',
      features: ['28 hours of video', 'Design tools included', 'Portfolio projects', 'Industry insights'],
      isEnrolled: false,
      isFavorite: true
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      description: 'Complete guide to digital marketing including SEO, social media, and paid advertising.',
      instructor: 'Emma Rodriguez',
      instructorPhoto: 'assets/images/instructors/emma.jpg',
      price: 99.99,
      rating: 4.7,
      studentsCount: 15230,
      duration: '45 hours',
      level: 'Intermediate',
      category: 'marketing',
      imageUrl: 'assets/images/courses/digital-marketing.jpg',
      features: ['45 hours of content', 'Real case studies', 'Marketing tools', 'Campaign templates'],
      isEnrolled: true,
      isFavorite: false
    },
    {
      id: 4,
      title: 'Python for Data Science',
      description: 'Learn Python programming specifically for data analysis, visualization, and machine learning.',
      instructor: 'Dr. Alex Kumar',
      instructorPhoto: 'assets/images/instructors/alex.jpg',
      price: 119.99,
      originalPrice: 199.99,
      discount: 40,
      rating: 4.8,
      studentsCount: 9876,
      duration: '52 hours',
      level: 'Advanced',
      category: 'data-science',
      imageUrl: 'assets/images/courses/python-data.jpg',
      features: ['52 hours of content', 'Jupyter notebooks', 'Real datasets', 'ML projects'],
      isEnrolled: false,
      isFavorite: false
    },
    {
      id: 5,
      title: 'Business Strategy & Leadership',
      description: 'Develop strategic thinking and leadership skills for modern business challenges.',
      instructor: 'Prof. Lisa Wang',
      instructorPhoto: 'assets/images/instructors/lisa.jpg',
      price: 149.99,
      rating: 4.6,
      studentsCount: 5432,
      duration: '38 hours',
      level: 'Advanced',
      category: 'business',
      imageUrl: 'assets/images/courses/business-strategy.jpg',
      features: ['38 hours of content', 'Case studies', 'Templates included', 'Expert interviews'],
      isEnrolled: false,
      isFavorite: false
    },
    {
      id: 6,
      title: 'Spanish Conversation Course',
      description: 'Improve your Spanish speaking skills through interactive conversations and practical exercises.',
      instructor: 'Carlos Martinez',
      instructorPhoto: 'assets/images/instructors/carlos.jpg',
      price: 69.99,
      originalPrice: 99.99,
      discount: 30,
      rating: 4.9,
      studentsCount: 7654,
      duration: '24 hours',
      level: 'Beginner',
      category: 'languages',
      imageUrl: 'assets/images/courses/spanish.jpg',
      features: ['24 hours of content', 'Interactive exercises', 'Audio practice', 'Cultural insights'],
      isEnrolled: false,
      isFavorite: true
    }
  ];

  filteredCourses: Course[] = [];

  ngOnInit(): void {
    this.filteredCourses = [...this.allCourses];
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allCourses];

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === this.selectedCategory);
    }

    // Apply level filter
    if (this.selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === this.selectedLevel);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'popular':
          return b.studentsCount - a.studentsCount;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
        default:
          return b.id - a.id; // Assuming higher ID means newer
      }
    });

    this.filteredCourses = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  toggleFavorite(course: Course): void {
    course.isFavorite = !course.isFavorite;
    // In real app, you would call a service to update favorites
    console.log(`Course ${course.title} ${course.isFavorite ? 'added to' : 'removed from'} favorites`);
  }

  enrollInCourse(course: Course): void {
    // Open enrollment popup with course data
    this.router.navigate(['/Student', { outlets: { dialog: ['enrollCourse', course.id] } }]);
  }

  viewCourseDetails(course: Course): void {
    // Navigate to course details page
    this.router.navigate(['/Student/course-details', course.id]);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedLevel = 'all';
    this.sortBy = 'newest';
    this.applyFilters();
  }

  getDiscountedPrice(course: Course): number {
    if (course.originalPrice && course.discount) {
      return course.originalPrice * (1 - course.discount / 100);
    }
    return course.price;
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  getCategoryLabel(categoryValue: string): string {
    const category = this.categories.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }
} 