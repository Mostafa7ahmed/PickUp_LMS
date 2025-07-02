import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Decode } from '../../../Core/Interface/user';
import { LoginService } from '../../../Core/Services/login.service';
import { TopRatedCoursesService } from './core/services/top-rated-courses.service';
import { ITopRatedCourse } from './core/interfaces/top-rated-courses.interface';
import { TopRatedInstructorsService } from './core/services/top-rated-instructors.service';
import { ITopRatedInstructor, IInstructorDisplay } from './core/interfaces/top-rated-instructors.interface';
import { TopStudentsService } from './core/services/top-students.service';
import { ITopStudent, IStudentDisplay } from './core/interfaces/top-students.interface';
import { InstructorWidgetsService } from './core/services/instructor-widgets.service';
import { InstructorWidgets, WidgetCard } from './core/interfaces/instructor-widgets.interface';
import { environment } from '../../../Environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule] ,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    dataUser: Decode = {} as Decode;
    private _LoginService = inject(LoginService)
    private translateService = inject(TranslateService);
    private topRatedCoursesService = inject(TopRatedCoursesService);
    private topRatedInstructorsService = inject(TopRatedInstructorsService);
    private topStudentsService = inject(TopStudentsService);
    private instructorWidgetsService = inject(InstructorWidgetsService);
    
    // API Data
    topRatedCourses: ITopRatedCourse[] = [];
    isLoadingCourses: boolean = false;
    coursesError: string = '';
    
    // Instructors API Data
    topRatedInstructors: IInstructorDisplay[] = [];
    isLoadingInstructors: boolean = false;
    instructorsError: string = '';
    
    // Students API Data
    topStudents: IStudentDisplay[] = [];
    isLoadingStudents: boolean = false;
    studentsError: string = '';
    
    // Widgets API Data
    widgetCards: WidgetCard[] = [];
    isLoadingWidgets: boolean = false;
    widgetsError: string = '';
    
    baseUrl: string = environment.baseUrlFiles;
    
    ngOnInit(): void {
              this.dataUser = this._LoginService.saveUserAuth();
        this.loadInstructorWidgets();
        this.loadTopRatedCourses();
        this.loadTopRatedInstructors();
        this.loadTopStudents();
    }

    loadTopRatedCourses(): void {
        this.isLoadingCourses = true;
        this.coursesError = '';
        
        this.topRatedCoursesService.getTopRatedCourses().subscribe({
            next: (response) => {
                this.isLoadingCourses = false;
                if (response.success) {
                    // Sort by rating (highest first) and take only top 5
                    this.topRatedCourses = response.result
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 5);
                } else {
                    this.coursesError = 'Failed to load courses data';
                    this.topRatedCourses = this.getFallbackCourses();
                }
            },
            error: (error) => {
                this.isLoadingCourses = false;
                this.coursesError = 'Failed to load courses data';
                console.error('Error loading top rated courses:', error);
                this.topRatedCourses = this.getFallbackCourses();
            }
        });
    }

    loadTopRatedInstructors(): void {
        this.isLoadingInstructors = true;
        this.instructorsError = '';
        
        this.topRatedInstructorsService.getTopRatedInstructors().subscribe({
            next: (response) => {
                this.isLoadingInstructors = false;
                if (response.success) {
                    // Sort by averageRatings (highest first) and take only top 5
                    const sortedInstructors = response.result
                        .sort((a, b) => b.averageRatings - a.averageRatings)
                        .slice(0, 5);
                    
                    // Transform API data to display format
                    this.topRatedInstructors = this.transformInstructorsData(sortedInstructors);
                } else {
                    this.instructorsError = 'Failed to load instructors data';
                    this.topRatedInstructors = this.getFallbackInstructors();
                }
            },
            error: (error) => {
                this.isLoadingInstructors = false;
                this.instructorsError = 'Failed to load instructors data';
                console.error('Error loading top rated instructors:', error);
                this.topRatedInstructors = this.getFallbackInstructors();
            }
        });
    }

    loadTopStudents(): void {
        this.isLoadingStudents = true;
        this.studentsError = '';
        
        this.topStudentsService.getTopStudents().subscribe({
            next: (response) => {
                this.isLoadingStudents = false;
                if (response.success) {
                    // Sort alphabetically by name and take only top 5
                    const sortedStudents = response.result
                        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                        .slice(0, 5);
                    
                    // Transform API data to display format
                    this.topStudents = this.transformStudentsData(sortedStudents);
                } else {
                    this.studentsError = 'Failed to load students data';
                    this.topStudents = this.getFallbackStudents();
                }
            },
            error: (error) => {
                this.isLoadingStudents = false;
                this.studentsError = 'Failed to load students data';
                console.error('Error loading top students:', error);
                this.topStudents = this.getFallbackStudents();
            }
        });
    }

    loadInstructorWidgets(): void {
        this.isLoadingWidgets = true;
        this.widgetsError = '';
        
        this.instructorWidgetsService.getInstructorWidgets().subscribe({
            next: (widgets) => {
                this.isLoadingWidgets = false;
                this.widgetCards = this.instructorWidgetsService.transformToWidgetCards(widgets);
            },
            error: (error) => {
                this.isLoadingWidgets = false;
                this.widgetsError = 'Failed to load statistics data';
                console.error('Error loading instructor widgets:', error);
                // Set fallback widget cards
                this.widgetCards = this.getFallbackWidgets();
            }
        });
    }

    getFallbackWidgets(): WidgetCard[] {
        return [
            {
                title: this.translateService.instant('InstructorHome.widgetTitles.totalStudents'),
                value: 0,
                icon: 'fas fa-users',
                color: '#4F46E5'
            },
            {
                title: this.translateService.instant('InstructorHome.widgetTitles.activeCourses'),
                value: 0,
                icon: 'fas fa-book-open',
                color: '#10B981'
            },
            {
                title: this.translateService.instant('InstructorHome.widgetTitles.totalRevenue'),
                value: '$0',
                icon: 'fas fa-dollar-sign',
                color: '#F59E0B'
            },
            {
                title: this.translateService.instant('InstructorHome.widgetTitles.averageRating'),
                value: '0.0',
                icon: 'fas fa-star',
                color: '#EF4444'
            }
        ];
    }

// Static instructors data replaced by API integration

  transformInstructorsData(instructors: ITopRatedInstructor[]): IInstructorDisplay[] {
    const colors = ['#ccfbf1', '#bbf7d0', '#f3e8ff', '#ffedd5', '#fecaca'];
    
    return instructors.map((instructor, index) => ({
      id: instructor.id,
      initials: this.generateInitials(instructor.name),
      name: instructor.name.trim(),
      subject: instructor.bio || 'Professional Instructor',
      rating: instructor.averageRatings,
      courses: instructor.coursesCount,
      bgColor: colors[index % colors.length],
      photo: instructor.photo,
      bio: instructor.bio || ''
    }));
  }

  generateInitials(name: string): string {
    return name
      .split(' ')
      .filter(n => n.length > 0)
      .slice(0, 2)
      .map(n => n[0].toUpperCase())
      .join('');
  }

  getFallbackInstructors(): IInstructorDisplay[] {
    return [
      { id: 1, initials: 'MH', name: 'Mostafa Hamed', subject: 'Frontend Development', rating: 5, courses: 30, bgColor: '#ccfbf1', photo: '', bio: 'Frontend expert' },
      { id: 2, initials: 'AM', name: 'Dr. Amr Mausad', subject: 'Data Science', rating: 4.8, courses: 18, bgColor: '#bbf7d0', photo: '', bio: 'Data Science expert' },
      { id: 3, initials: 'AA', name: 'Ahmed Adel', subject: 'Software Engineering', rating: 4.7, courses: 15, bgColor: '#f3e8ff', photo: '', bio: 'Software development' },
      { id: 4, initials: 'MH', name: 'Mahmoud Hassan', subject: 'Web Development', rating: 4.6, courses: 12, bgColor: '#ffedd5', photo: '', bio: 'Web development expert' },
      { id: 5, initials: 'SH', name: 'Samah Hassan', subject: 'UI/UX Design', rating: 4.5, courses: 10, bgColor: '#fecaca', photo: '', bio: 'Design specialist' }
    ];
  }

  transformStudentsData(students: ITopStudent[]): IStudentDisplay[] {
    const colors = ['#e5e7eb', '#bbf7d0', '#f3e8ff', '#ffedd5', '#fecaca'];
    const titles = ['Top Achiever', 'Fast Learner', 'Most Engaged', 'Rising Star', 'Dedicated Student'];
    
    return students.map((student, index) => ({
      id: student.id,
      initials: this.generateInitials(student.name),
      name: student.name.trim(),
      completed: student.completedCourses,
      title: titles[index % titles.length],
      score: this.generateScore(student.completedCourses),
      bgColor: colors[index % colors.length],
      photo: student.photo
    }));
  }

  generateScore(completedCourses: number): string {
    // Generate a score based on completed courses with some variation
    const baseScore = Math.max(85, 100 - (5 - completedCourses) * 3);
    const variation = Math.floor(Math.random() * 5);
    return `${Math.min(100, baseScore + variation)}%`;
  }

  getFallbackStudents(): IStudentDisplay[] {
    const fallbackStudents = [
      { id: 1, initials: 'DA', name: 'Doha Amr', completed: 15, title: 'Top Achiever', score: '98%', bgColor: '#e5e7eb', photo: '' },
      { id: 2, initials: 'MH', name: 'Mostafa Hamed', completed: 12, title: 'Fast Learner', score: '95%', bgColor: '#bbf7d0', photo: '' },
      { id: 3, initials: 'EG', name: 'Elena Garcia', completed: 10, title: 'Most Engaged', score: '92%', bgColor: '#f3e8ff', photo: '' },
      { id: 4, initials: 'JW', name: 'Jordan Wilson', completed: 8, title: 'Rising Star', score: '90%', bgColor: '#ffedd5', photo: '' },
      { id: 5, initials: 'AH', name: 'Ahmed Hassan', completed: 6, title: 'Dedicated Student', score: '88%', bgColor: '#fecaca', photo: '' }
    ];
    
    // Sort alphabetically by name and return top 5
    return fallbackStudents.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).slice(0, 5);
  }

  students = [
      { initials: 'AT', name: 'Doha Amr', completed: 15, title: 'Top Achiever', score: '98%', bgColor: '#e5e7eb' },
    { initials: 'MN', name: 'Mostafa Hamed', completed: 12, title: 'Fast Learner', score: '95%', bgColor: '#bbf7d0' },
    { initials: 'EG', name: 'Elena Garcia', completed: 10, title: 'Most Engaged', score: '92%', bgColor: '#bbf7d0' },
    { initials: 'JW', name: 'Jordan Wilson', completed: 8, title: 'Rising Star', score: '90%', bgColor: '#f3e8ff' },
    { initials: 'AT', name: 'Doha Amr', completed: 15, title: 'Top Achiever', score: '98%', bgColor: '#e5e7eb' },
    { initials: 'MN', name: 'Mostafa Hamed', completed: 12, title: 'Fast Learner', score: '95%', bgColor: '#bbf7d0' },
    { initials: 'EG', name: 'Elena Garcia', completed: 10, title: 'Most Engaged', score: '92%', bgColor: '#bbf7d0' },
    { initials: 'JW', name: 'Jordan Wilson', completed: 8, title: 'Rising Star', score: '90%', bgColor: '#f3e8ff' },
  ];


  getFallbackCourses(): ITopRatedCourse[] {
    const fallbackCourses = [
    {
        id: 1,
      name: 'Advanced JavaScript Masterclass',
        description: 'Master JavaScript with advanced concepts',
        photo: '',
        topic: {
          id: 1, instructorId: 0, creatorId: 0, updaterId: null, name: 'Web Development',
          description: null, color: '#ccfbf1', icon: 'fa fa-code', order: 0, default: false,
          mainId: null, isMain: false, snapshot: null, createdOn: '', updatedOn: null,
          creator: null, updater: null, stages: []
        },
        stage: {
          id: 1, topicId: 0, instructorId: 0, name: 'Published', order: 0, color: '#48b29a',
          icon: 'fa-check', shadow: null, type: 0, createdOn: '', default: false, snapshot: null, courses: []
        },
        enrolledStudentsCount: 1245, rating: 5, revenue: 18675
      },
      {
        id: 2,
      name: 'UI/UX Design Principles',
        description: 'Complete guide to modern design',
        photo: '',
        topic: {
          id: 2, instructorId: 0, creatorId: 0, updaterId: null, name: 'Design',
          description: null, color: '#f3e8ff', icon: 'fa fa-paint-brush', order: 0, default: false,
          mainId: null, isMain: false, snapshot: null, createdOn: '', updatedOn: null,
          creator: null, updater: null, stages: []
        },
        stage: {
          id: 2, topicId: 0, instructorId: 0, name: 'Published', order: 0, color: '#48b29a',
          icon: 'fa-check', shadow: null, type: 0, createdOn: '', default: false, snapshot: null, courses: []
        },
        enrolledStudentsCount: 986, rating: 4.8, revenue: 14790
      },
      {
        id: 3,
      name: 'Data Science Fundamentals',
        description: 'Complete data analysis course',
        photo: '',
        topic: {
          id: 3, instructorId: 0, creatorId: 0, updaterId: null, name: 'Data Science',
          description: null, color: '#bbf7d0', icon: 'fa fa-chart-bar', order: 0, default: false,
          mainId: null, isMain: false, snapshot: null, createdOn: '', updatedOn: null,
          creator: null, updater: null, stages: []
        },
        stage: {
          id: 3, topicId: 0, instructorId: 0, name: 'Published', order: 0, color: '#48b29a',
          icon: 'fa-check', shadow: null, type: 0, createdOn: '', default: false, snapshot: null, courses: []
        },
        enrolledStudentsCount: 845, rating: 4.7, revenue: 12675
      },
      {
        id: 4,
      name: 'Digital Marketing Strategies',
        description: 'Modern marketing techniques',
        photo: '',
        topic: {
          id: 4, instructorId: 0, creatorId: 0, updaterId: null, name: 'Marketing',
          description: null, color: '#fee2e2', icon: 'fa fa-bullhorn', order: 0, default: false,
          mainId: null, isMain: false, snapshot: null, createdOn: '', updatedOn: null,
          creator: null, updater: null, stages: []
        },
        stage: {
          id: 4, topicId: 0, instructorId: 0, name: 'Published', order: 0, color: '#48b29a',
          icon: 'fa-check', shadow: null, type: 0, createdOn: '', default: false, snapshot: null, courses: []
        },
        enrolledStudentsCount: 632, rating: 4.5, revenue: 9480
      },
      {
        id: 5,
      name: 'Project Management Professional',
        description: 'Professional project management',
        photo: '',
        topic: {
          id: 5, instructorId: 0, creatorId: 0, updaterId: null, name: 'Business',
          description: null, color: '#fde68a', icon: 'fa fa-tasks', order: 0, default: false,
          mainId: null, isMain: false, snapshot: null, createdOn: '', updatedOn: null,
          creator: null, updater: null, stages: []
        },
        stage: {
          id: 5, topicId: 0, instructorId: 0, name: 'New', order: 0, color: '#3e97ff',
          icon: 'fa-plus', shadow: null, type: 0, createdOn: '', default: false, snapshot: null, courses: []
        },
        enrolledStudentsCount: 524, rating: 4.4, revenue: 7860
      }
    ];
    
    // Sort by rating (highest first) and return top 5
    return fallbackCourses.sort((a, b) => b.rating - a.rating).slice(0, 5);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  trackByCourse(index: number, course: ITopRatedCourse): number {
    return course.id;
  }

  onImageError(event: any): void {
    event.target.src = 'Images/Course/Image+Background.png';
  }

  onInstructorImageError(event: any, instructor: IInstructorDisplay): void {
    event.target.style.display = 'none';
    // Show avatar fallback by removing photo property
    instructor.photo = '';
  }

  onStudentImageError(event: any, student: IStudentDisplay): void {
    event.target.style.display = 'none';
    // Show avatar fallback by removing photo property
    student.photo = '';
  }

  getRankClass(rank: number): string {
    switch (rank) {
      case 1: return 'rank-gold';
      case 2: return 'rank-silver';
      case 3: return 'rank-bronze';
      default: return 'rank-default';
    }
  }
}
