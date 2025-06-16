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

  openEditTaskPopup(task: Task): void {
    if (!task.id) {
      console.error('❌ Cannot edit task: Task ID is missing');
      return;
    }

    console.log('📝 Opening edit popup for instructor task:', task.id);
    this.router.navigate(['/', { outlets: { dialog: ['edit-task-instructor', task.id] } }]);
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

      // Handle optional dueDate
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
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

  getTaskTypeIcon(type: number): string {
    return this.taskService.getTaskTypeIcon(type);
  }

  getPriorityIcon(priority: number): string {
    return this.taskService.getPriorityIcon(priority);
  }

  getPriorityLabel(priority: number): string {
    return this.taskService.getTaskPriorityLabel(priority);
  }

  getTaskTypeLabel(type: number): string {
    return this.taskService.getTaskTypeLabel(type);
  }

  getTaskTypeColor(type: number): string {
    switch (type) {
      case 0: return '#dc2626'; // Red for Personal
      case 1: return '#1e40af'; // Blue for Work
      case 2: return '#7c3aed'; // Purple for Study
      case 3: return '#059669'; // Green for Meeting
      case 4: return '#475569'; // Gray for Other
      default: return '#6b7280'; // Default gray
    }
  }

  getTaskTypeBackgroundColor(type: number): string {
    switch (type) {
      case 0: return '#fef2f2'; // Light red for Personal
      case 1: return '#dbeafe'; // Light blue for Work
      case 2: return '#f3e8ff'; // Light purple for Study
      case 3: return '#ecfdf5'; // Light green for Meeting
      case 4: return '#f1f5f9'; // Light gray for Other
      default: return '#f9fafb'; // Default light gray
    }
  }

  getPriorityColor(priority: number): string {
    return this.taskService.getTaskPriorityColor(priority);
  }

  getPriorityBackgroundColor(priority: number): string {
    switch (priority) {
      case 0: return '#ecfdf5'; // Light Green background for Low
      case 1: return '#fffbeb'; // Light Yellow background for Medium
      case 2: return '#fef2f2'; // Light Red background for High
      case 3: return '#fef2f2'; // Light Red background for Urgent
      default: return '#f9fafb'; // Light Gray background for default
    }
  }

  // Mark task as completed
  toggleTaskCompletion(task: Task): void {
    if (!task.id) return;

    console.log('🔄 Toggling instructor task completion:', task.id, 'New state:', task.completed);

    // The checkbox has already updated task.completed via ngModel
    // So we use the current value to determine what API call to make
    if (task.completed) {
      // Task is now completed, call markTaskCompleted
      this.taskService.markTaskCompleted(task).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('✅ Instructor task marked as completed');
          } else {
            console.error('❌ Failed to mark instructor task as completed:', response.message);
            // Revert the change if API call failed
            task.completed = false;
            alert('Failed to update task: ' + response.message);
          }
        },
        error: (error) => {
          console.error('❌ Error marking instructor task as completed:', error);
          // Revert the change if API call failed
          task.completed = false;
          alert('Error updating task. Please try again.');
        }
      });
    } else {
      // Task is now incomplete, call markTaskIncomplete
      this.taskService.markTaskIncomplete(task).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('✅ Instructor task marked as incomplete');
          } else {
            console.error('❌ Failed to mark instructor task as incomplete:', response.message);
            // Revert the change if API call failed
            task.completed = true;
            alert('Failed to update task: ' + response.message);
          }
        },
        error: (error) => {
          console.error('❌ Error marking instructor task as incomplete:', error);
          // Revert the change if API call failed
          task.completed = true;
          alert('Error updating task. Please try again.');
        }
      });
    }
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
