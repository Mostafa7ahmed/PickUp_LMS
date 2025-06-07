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

  constructor(private router: Router, private route: ActivatedRoute , private _getallTaskStudentService:GetallTaskStudentService ) {}

  ngOnInit(): void {
    window.addEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
    this.tasks = this._getallTaskStudentService.tasks
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
