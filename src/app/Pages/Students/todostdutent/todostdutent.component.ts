import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudentTask } from './core/interface/istudent-task';
import { GetallTaskStudentService } from './core/service/getall-task-student.service';

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
  
  tasks: IStudentTask[] = [ ];
  
  // Loading state flag
  isLoading = true;
  
  // Audio feedback like instructor page
  audio = new Audio('Done.mp3');

  constructor(private router: Router, private route: ActivatedRoute , private _getallTaskStudentService:GetallTaskStudentService ) {}

  ngOnInit(): void {
    window.addEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
    // Simulate data fetching & enable loading spinner
    // If later connected to backend, replace with real HTTP call
    setTimeout(() => {
      this.tasks = this._getallTaskStudentService.tasks;
      this.isLoading = false;
    }, 300);
  }

  ngOnDestroy(): void {
    window.removeEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
  }

  openAddTaskForm(): void {
    this.openAddTaskPopup();
  }

  openAddTaskPopup(): void {
    this.router.navigate(['/Student', { outlets: { dialog: ['taskTodoStudent'] } }]);
  }

  openEditTaskPopup(task: IStudentTask): void {
    console.log('Edit task:', task);
  }

  // Filter methods
  setFilter(filter: string): void {
    this.activeFilter = filter;
  }



  getFilteredTasks(): IStudentTask[] {
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


  deleteTask(task: IStudentTask): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  // Utility methods
  trackByTaskId(index: number, task: IStudentTask): number {
    return task.id;
  }

  getTaskTypeIcon(type: string): string {
    switch (type) {
      case 'personal': return 'fas fa-user';
      case 'Task': return 'fas fa-clipboard-check';
      case 'meeting': return 'fas fa-users';
      case 'Exam': return 'fas fa-chalkboard-teacher';
      default: return 'fas fa-tasks';
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'low': return 'fas fa-arrow-down';
      case 'medium': return 'fas fa-minus';
      case 'high': return 'fas fa-arrow-up';
      case 'urgent': return 'fas fa-exclamation';
      default: return 'fas fa-question';
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

  /* -------------------------- Completion handling ------------------------- */
  toggleTaskCompletion(task: IStudentTask): void {
    // Optimistic UI update; in real app call a service here
    if (task.completed) {
      this.playSuccessSound();
    }
  }

  playSuccessSound() {
    this.audio.play();
  }

  /* -------------------------- Color & Label helpers ----------------------- */

  getTaskTypeColor(type: string): string {
    switch (type) {
      case 'personal': return '#dc2626';
      case 'Task': return '#7c3aed';
      case 'meeting': return '#059669';
      case 'Exam': return '#363570';
      default: return '#6b7280';
    }
  }

  getTaskTypeBackgroundColor(type: string): string {
    switch (type) {
      case 'personal': return '#fee2e2';
      case 'Task': return '#f3e8ff';
      case 'meeting': return '#ecfdf5';
      case 'Exam': return '#36357056';
      default: return '#f9fafb';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      case 'urgent': return '#dc2626';
      default: return '#6b7280';
    }
  }

  getPriorityBackgroundColor(priority: string): string {
    switch (priority) {
      case 'low': return '#ecfdf5';
      case 'medium': return '#fffbeb';
      case 'high': return '#fef2f2';
      case 'urgent': return '#fee2e2';
      default: return '#f9fafb';
    }
  }

  getTaskTypeLabel(type: string): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  getPriorityLabel(priority: string): string {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  }
}
