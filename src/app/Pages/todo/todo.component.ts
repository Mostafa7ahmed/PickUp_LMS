import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';

interface InstructorTask {
  id: number;
  title: string;
  description?: string;
  type: 'teaching' | 'grading' | 'administrative' | 'meeting' | 'personal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterOutlet],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit, OnDestroy {
  // Filter and search
  activeFilter: string = 'all';
  searchTerm: string = '';
  
  // Sample tasks for instructor
  tasks: InstructorTask[] = [
    {
      id: 1,
      title: 'Prepare lecture slides for Web Development',
      description: 'Create slides for React components and state management',
      type: 'teaching',
      priority: 'high',
      dueDate: '2024-03-20',
      completed: false,
      createdAt: new Date('2024-03-15')
    },
    {
      id: 2,
      title: 'Grade midterm exams',
      description: 'Grade JavaScript fundamentals midterm exams for 45 students',
      type: 'grading',
      priority: 'urgent',
      dueDate: '2024-03-18',
      completed: false,
      createdAt: new Date('2024-03-14')
    },
    {
      id: 3,
      title: 'Faculty meeting preparation',
      description: 'Prepare curriculum update proposal',
      type: 'administrative',
      priority: 'medium',
      dueDate: '2024-03-22',
      completed: true,
      createdAt: new Date('2024-03-13')
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Add event listener for external task form trigger
    window.addEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
  }

  ngOnDestroy(): void {
    // Clean up event listener
    window.removeEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
  }

  openAddTaskForm(): void {
    this.openAddTaskPopup();
  }

  openAddTaskPopup(): void {
    this.router.navigate(['/Student', { outlets: { dialog: ['addTask'] } }]);
  }

  openEditTaskPopup(task: InstructorTask): void {
    console.log('Edit task:', task);
  }

  // Filter methods
  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  getFilterTitle(): string {
    switch (this.activeFilter) {
      case 'teaching': return 'Teaching Tasks';
      case 'grading': return 'Grading Tasks';
      case 'administrative': return 'Administrative Tasks';
      default: return 'All Tasks';
    }
  }

  getFilteredTasks(): InstructorTask[] {
    let filteredTasks = [...this.tasks];

    if (this.activeFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.type === this.activeFilter);
    }

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort tasks by priority and due date
    return filteredTasks.sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  // Task management methods
  updateTaskStatus(task: InstructorTask): void {
    // Task status is already updated via two-way binding
    // You could add additional logic here like saving to backend
  }

  deleteTask(task: InstructorTask): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  // Utility methods
  trackByTaskId(index: number, task: InstructorTask): number {
    return task.id;
  }

  getTaskTypeIcon(type: string): string {
    switch (type) {
      case 'teaching': return 'fa-solid fa-chalkboard-teacher';
      case 'grading': return 'fa-solid fa-clipboard-check';
      case 'administrative': return 'fa-solid fa-briefcase';
      case 'meeting': return 'fa-solid fa-users';
      case 'personal': return 'fa-solid fa-user';
      default: return 'fa-solid fa-tasks';
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'urgent': return 'fa-solid fa-exclamation-circle';
      case 'high': return 'fa-solid fa-arrow-up';
      case 'medium': return 'fa-solid fa-minus';
      case 'low': return 'fa-solid fa-arrow-down';
      default: return 'fa-solid fa-minus';
    }
  }

  isOverdue(dueDate: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dueDate) < today;
  }

  formatDueDate(dueDate: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dueDateTime = new Date(dueDate);

    if (dueDateTime.getTime() === today.getTime()) return 'Today';
    if (dueDateTime.getTime() === tomorrow.getTime()) return 'Tomorrow';
    return dueDateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getEmptyStateMessage(): string {
    switch (this.activeFilter) {
      case 'teaching': return 'No teaching tasks found. Add a teaching task to get started!';
      case 'grading': return 'No grading tasks found. Add a grading task to get started!';
      case 'administrative': return 'No administrative tasks found. Add an administrative task to get started!';
      case 'meeting': return 'No meeting tasks found. Add a meeting task to get started!';
      case 'personal': return 'No personal tasks found. Add a personal task to get started!';
      default: return 'No tasks found. Add your first task to get started!';
    }
  }
}
