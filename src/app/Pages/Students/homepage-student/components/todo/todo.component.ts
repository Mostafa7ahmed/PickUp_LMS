import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GetalltaskStudentsService } from '../../../todostdutent/core/Service/getalltask-students.service';
import { ITaskStudent, TaskPriority, TaskType } from '../../../todostdutent/core/Interface/itask-instrctor';
import { UpdateTaskService } from '../../../todostdutent/core/Service/update-task.service';
import { CreateTaskService } from '../../../todostdutent/core/Service/create-task.service';
import { DeleteTaskService } from '../../../todostdutent/core/Service/delete-task.service';
import { ICreateTaskRequest } from '../../../todostdutent/core/Interface/icreate-task-request';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit, OnDestroy {
  newTask: string = '';
  tasks: ITaskStudent[] = [];
  isLoading: boolean = false;
  
  private destroy$ = new Subject<void>();
  private _getalltaskStudentsService = inject(GetalltaskStudentsService);
  private _updateTaskService = inject(UpdateTaskService);
  private _createTaskService = inject(CreateTaskService);
  private _deleteTaskService = inject(DeleteTaskService);

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTasks(): void {
    this.isLoading = true;
    this._getalltaskStudentsService.getTasks(1, 6) // Get first 6 tasks for homepage
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.tasks = response.result || [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading tasks:', error);
          this.isLoading = false;
        }
      });
  }

  addTask() {
    if (this.newTask.trim()) {
      const taskData: ICreateTaskRequest = {
        name: this.newTask.trim(),
        description: '',
        type: TaskType.Personal,
        priority: TaskPriority.Medium,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // Default due date: 1 week from now
      };

      this._createTaskService.createTask(taskData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.success) {
              // Reload tasks to get the updated list
              this.loadTasks();
              this.newTask = '';
            } else {
              console.error('Failed to create task:', response.message);
            }
          },
          error: (error) => {
            console.error('Error creating task:', error);
          }
        });
    }
  }

  removeTask(taskToRemove: ITaskStudent) {
    if (taskToRemove.id) {
      this._deleteTaskService.deleteTask(taskToRemove.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response.success) {
              // Reload tasks to get the updated list
              this.loadTasks();
            } else {
              console.error('Failed to delete task:', response.message);
            }
          },
          error: (error) => {
            console.error('Error deleting task:', error);
          }
        });
    } else {
      // If task has no ID (locally created), just remove from array
      this.tasks = this.tasks.filter(task => task !== taskToRemove);
    }
  }

  toggleTaskCompletion(task: ITaskStudent): void {
    const originalState = task.completed;
    task.completed = !task.completed;

    this._updateTaskService.markTaskCompleted(task)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            // Revert if API call failed
            task.completed = originalState;
          }
        },
        error: (error) => {
          console.error('Error updating task:', error);
          // Revert if API call failed
          task.completed = originalState;
        }
      });
  }

  getTaskTypeIcon(type: number): string {
    return this._getalltaskStudentsService.getTaskTypeIcon(type);
  }

  getPriorityColor(priority: number): string {
    return this._getalltaskStudentsService.getTaskPriorityColor(priority);
  }

  getTaskTypeLabel(type: number): string {
    return this._getalltaskStudentsService.getTaskTypeLabel(type);
  }

  getPriorityLabel(priority: number): string {
    return this._getalltaskStudentsService.getTaskPriorityLabel(priority);
  }
}
