import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentTaskService, StudentTask } from './core/service/student-task.service';

@Component({
  selector: 'app-todostdutent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todostdutent.component.html',
  styleUrl: './todostdutent.component.scss'
})
export class TodostdutentComponent implements OnInit, OnDestroy  {
  // Filter and search
  activeFilter: string = 'all';
  searchTerm: string = '';
  
  tasks: StudentTask[] = [ ];

  constructor(private router: Router, private route: ActivatedRoute, private studentTaskService: StudentTaskService) {}

  ngOnInit(): void {
    window.addEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
    this.loadTasks();
  }

  ngOnDestroy(): void {
    window.removeEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
  }

  loadTasks(): void {
    this.studentTaskService.getTasksPaginated().subscribe({
      next: (response) => {
        if (response.success) {
          this.tasks = response.result;
        } else {
          this.tasks = [];
        }
      },
      error: (err) => {
        console.error('Error loading student tasks:', err);
        this.tasks = [];
      }
    });
  }

  openAddTaskForm(): void {
    this.openAddTaskPopup();
  }

  openAddTaskPopup(): void {
    this.router.navigate(['/Student', { outlets: { dialog: ['taskTodoStudent'] } }]);
  }

  openEditTaskPopup(task: StudentTask): void {
    console.log('Edit task:', task);
  }

  // Filter methods
  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  getFilteredTasks(): StudentTask[] {
    let filteredTasks = [...this.tasks];

    // Filter by type (if not 'all')
    if (this.activeFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => String(task.type) === this.activeFilter);
    }

    // Search by name or description
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.name.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort by priority (numeric) and due date
    const priorityOrder = new Map<number, number>([[3, 0], [2, 1], [1, 2], [0, 3]]); // urgent:3, high:2, medium:1, low:0
    return filteredTasks.sort((a, b) => {
      const priorityDiff = (priorityOrder.get(a.priority) ?? 99) - (priorityOrder.get(b.priority) ?? 99);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  // Task management methods
  deleteTask(task: StudentTask): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  // Utility methods
  trackByTaskId(index: number, task: StudentTask): number {
    return task.id!;
  }

  getTaskTypeIcon(type: string): string {
    switch (type) {
      case 'Exam': return 'fa-solid fa-chalkboard-teacher';
      case 'Task': return 'fa-solid fa-clipboard-check';
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

  getTaskTypeLabel(type: number): string {
    // Adjust these labels to match your backend enum mapping
    switch (type) {
      case 0: return 'Personal';
      case 1: return 'Work';
      case 2: return 'Study';
      case 3: return 'Meeting';
      case 4: return 'Other';
      default: return 'Task';
    }
  }

  getPriorityLabel(priority: number): string {
    switch (priority) {
      case 0: return 'Low';
      case 1: return 'Medium';
      case 2: return 'High';
      case 3: return 'Urgent';
      default: return 'Medium';
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
      case 'Exam': return 'No Exam tasks found. Add a Exam task to get started!';
      case 'Task': return 'No Task tasks found. Add a Task task to get started!';
      case 'meeting': return 'No meeting tasks found. Add a meeting task to get started!';
      case 'personal': return 'No personal tasks found. Add a personal task to get started!';
      default: return 'No tasks found. Add your first task to get started!';
    }
  }
}
