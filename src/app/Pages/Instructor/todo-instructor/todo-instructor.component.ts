import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TaskService, Task, TaskType, TaskPriority } from './core/services/task.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-todo-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './todo-instructor.component.html',
  styleUrl: '../../Students/todostdutent/todostdutent.component.scss'
})
export class TodoInstructorComponent implements OnInit, OnDestroy {
  activeFilter: string = 'all';
  searchTerm: string = '';

  // Use real tasks from API
  tasks: Task[] = [];
  isLoading = false;

  private taskService = inject(TaskService);
  private router = inject(Router);
  private tasksSubscription?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.loadTasks();

    // Subscribe to real-time task updates
    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      console.log('📋 Tasks updated in TodoInstructor:', tasks);
    });
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  // Load tasks from API
  private loadTasks(): void {
    this.isLoading = true;

    this.taskService.getTasksPaginated({
      pageNumber: 1,
      pageSize: 100, // Load more tasks for todo list
      orderBy: 2,
      orderDirection: 1
    }).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('✅ Tasks loaded successfully:', response.result);
        } else {
          console.error('❌ Failed to load tasks:', response.message);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading tasks:', error);
        this.isLoading = false;
      }
    });
  }

  openAddTaskForm(): void {
    this.openAddTaskPopup();
  }

  openAddTaskPopup(): void {
    this.router.navigate([{ outlets: { dialog: ['addTaskInstrcutor'] } }]);
  }

 

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }



  getFilteredTasks(): Task[] {
    let filteredTasks = [...this.tasks];

    // Filter by type using enum values
    if (this.activeFilter !== 'all') {
      const filterTypeMap: { [key: string]: TaskType } = {
        'personal': TaskType.Personal,
        'work': TaskType.Work,
        'study': TaskType.Study,
        'meeting': TaskType.Meeting,
        'other': TaskType.Other
      };

      const filterType = filterTypeMap[this.activeFilter];
      if (filterType !== undefined) {
        filteredTasks = filteredTasks.filter(task => task.type === filterType);
      }
    }

    // Search in name and description
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.name.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort by priority and due date
    return filteredTasks.sort((a, b) => {
      // Priority order: Urgent (3) > High (2) > Medium (1) > Low (0)
      const priorityDiff = b.priority - a.priority;
      if (priorityDiff !== 0) return priorityDiff;

      // Then by due date
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }


  deleteTask(task: Task): void {
    if (!task.id) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('✅ Task deleted successfully');
        } else {
          console.error('❌ Failed to delete task:', response.message);
        }
      },
      error: (error) => {
        console.error('❌ Error deleting task:', error);
      }
    });
  }

  trackByTaskId(_: number, task: Task): number | undefined {
    return task.id;
  }

  getTaskTypeIcon(type: TaskType): string {
    return this.taskService.getTaskTypeIcon(type);
  }

  getPriorityIcon(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.Urgent: return 'fa-solid fa-exclamation-circle';
      case TaskPriority.High: return 'fa-solid fa-arrow-up';
      case TaskPriority.Medium: return 'fa-solid fa-minus';
      case TaskPriority.Low: return 'fa-solid fa-arrow-down';
      default: return 'fa-solid fa-minus';
    }
  }

  getPriorityLabel(priority: TaskPriority): string {
    return this.taskService.getTaskPriorityLabel(priority);
  }

  getTaskTypeLabel(type: TaskType): string {
    return this.taskService.getTaskTypeLabel(type);
  }

  // Mark task as completed
  toggleTaskCompletion(task: Task): void {
    if (!task.id) return;

    this.taskService.markTaskCompleted(task.id).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('✅ Task marked as completed');
        } else {
          console.error('❌ Failed to mark task as completed:', response.message);
        }
      },
      error: (error) => {
        console.error('❌ Error marking task as completed:', error);
      }
    });
  }

  // Refresh tasks manually
  refreshTasks(): void {
    this.loadTasks();
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
      case 'work': return 'No work tasks found. Add a work task to get started!';
      case 'study': return 'No study tasks found. Add a study task to get started!';
      case 'meeting': return 'No meeting tasks found. Add a meeting task to get started!';
      case 'personal': return 'No personal tasks found. Add a personal task to get started!';
      case 'other': return 'No other tasks found. Add a task to get started!';
      default: return 'No tasks found. Add your first task to get started!';
    }
  }

}
