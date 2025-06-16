import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  isLoading: boolean = false;

  tasks: StudentTask[] = [];

  constructor(private router: Router, private studentTaskService: StudentTaskService) {
    // Subscribe to tasks from service
    this.studentTaskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnInit(): void {
    window.addEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
    window.addEventListener('taskAdded', this.onTaskAdded.bind(this));
    window.addEventListener('focus', this.onWindowFocus.bind(this));
    this.loadTasks();
  }

  ngOnDestroy(): void {
    window.removeEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
    window.removeEventListener('taskAdded', this.onTaskAdded.bind(this));
    window.removeEventListener('focus', this.onWindowFocus.bind(this));
  }

  onTaskAdded(): void {
    console.log('📋 Task added event received, refreshing tasks...');
    this.loadTasks();
  }

  onWindowFocus(): void {
    // Refresh tasks when window regains focus (e.g., returning from dialog)
    console.log('📋 Window focused, refreshing tasks...');
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    console.log('📋 Loading student tasks...');

    this.studentTaskService.getTasksPaginated().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          console.log('✅ Student tasks loaded:', response.result.length);
        } else {
          console.error('❌ Failed to load tasks:', response.message);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('❌ Error loading student tasks:', err);
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
      const filterType = parseInt(this.activeFilter);
      if (!isNaN(filterType)) {
        filteredTasks = filteredTasks.filter(task => task.type === filterType);
      }
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

      // Handle optional dueDate
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  // Task management methods
  toggleTaskCompletion(task: StudentTask): void {
    if (!task.id) return;

    // Toggle the completion status
    if (task.completed) {
      this.studentTaskService.markTaskIncomplete(task).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('✅ Student task marked as incomplete');
          } else {
            console.error('❌ Failed to mark student task as incomplete:', response.message);
            // Revert the change if API call failed
            task.completed = true;
          }
        },
        error: (error) => {
          console.error('❌ Error marking student task as incomplete:', error);
          // Revert the change if API call failed
          task.completed = true;
        }
      });
    } else {
      this.studentTaskService.markTaskCompleted(task).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('✅ Student task marked as completed');
          } else {
            console.error('❌ Failed to mark student task as completed:', response.message);
            // Revert the change if API call failed
            task.completed = false;
          }
        },
        error: (error) => {
          console.error('❌ Error marking student task as completed:', error);
          // Revert the change if API call failed
          task.completed = false;
        }
      });
    }
  }

  deleteTask(task: StudentTask): void {
    if (!task.id) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.studentTaskService.deleteTask(task.id).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('✅ Student task deleted successfully');
          } else {
            console.error('❌ Failed to delete student task:', response.message);
            alert('Failed to delete task: ' + response.message);
          }
        },
        error: (error) => {
          console.error('❌ Error deleting student task:', error);
          alert('Error deleting task. Please try again.');
        }
      });
    }
  }

  // Utility methods
  trackByTaskId(_: number, task: StudentTask): number {
    return task.id;
  }

  getTaskTypeIcon(type: number): string {
    switch (type) {
      case 0: return 'fas fa-user'; // Personal
      case 1: return 'fas fa-briefcase'; // Work
      case 2: return 'fas fa-book'; // Study
      case 3: return 'fas fa-users'; // Meeting
      case 4: return 'fas fa-tasks'; // Other
      default: return 'fas fa-tasks';
    }
  }

  getPriorityIcon(priority: number): string {
    switch (priority) {
      case 0: return 'fas fa-arrow-down'; // Low
      case 1: return 'fas fa-minus'; // Medium
      case 2: return 'fas fa-arrow-up'; // High
      case 3: return 'fas fa-exclamation'; // Urgent
      default: return 'fas fa-minus';
    }
  }

  getTaskTypeLabel(type: number): string {
    switch (type) {
      case 0: return 'Personal';
      case 1: return 'Work';
      case 2: return 'Study';
      case 3: return 'Meeting';
      case 4: return 'Other';
      default: return 'Task';
    }
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

  getPriorityLabel(priority: number): string {
    switch (priority) {
      case 0: return 'Low';
      case 1: return 'Medium';
      case 2: return 'High';
      case 3: return 'Urgent';
      default: return 'Medium';
    }
  }

  getPriorityColor(priority: number): string {
    switch (priority) {
      case 0: return '#10b981'; // Green for Low
      case 1: return '#f59e0b'; // Yellow/Orange for Medium
      case 2: return '#ef4444'; // Red for High
      case 3: return '#dc2626'; // Dark Red for Urgent
      default: return '#6b7280'; // Gray for default
    }
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
      case '0': return 'No personal tasks found. Add a personal task to get started!';
      case '1': return 'No work tasks found. Add a work task to get started!';
      case '2': return 'No study tasks found. Add a study task to get started!';
      case '3': return 'No meeting tasks found. Add a meeting task to get started!';
      case '4': return 'No other tasks found. Add a task to get started!';
      default: return 'No tasks found. Add your first task to get started!';
    }
  }

  // Refresh tasks manually
  refreshTasks(): void {
    this.loadTasks();
  }

  // Test API connectivity (for debugging)
  testApiConnection(): void {
    console.log('🧪 Testing student task API connection...');

    // Test pagination endpoint
    this.studentTaskService.getTasksPaginated({ pageSize: 5 }).subscribe({
      next: (response) => {
        console.log('✅ Student task API test successful:', response);
      },
      error: (error) => {
        console.error('❌ Student task API test failed:', error);
      }
    });
  }
}
