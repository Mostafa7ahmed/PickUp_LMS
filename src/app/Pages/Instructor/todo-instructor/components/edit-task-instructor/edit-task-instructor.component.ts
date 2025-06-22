import { ITaskInstrctor, TaskPriority, TaskType } from './../../core/Interface/itask-instrctor';
import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextHeaderComponent } from '../../../../Courses/Components/text-header/text-header.component';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';
import { Router, ActivatedRoute } from '@angular/router';
import { IUpdateTask } from '../../core/Interface/iupdate-task';
import { UpdateTaskService } from '../../core/Service/update-task.service';
import { IUpdateTaskRequest } from '../../core/Interface/iupdate-task-request';

@Component({
  selector: 'app-edit-task-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule, TextHeaderComponent, TopPopComponent],
  templateUrl: './edit-task-instructor.component.html',
  styleUrl: './edit-task-instructor.component.scss'
})
export class EditTaskInstructorComponent {
@Output() taskUpdated = new EventEmitter<IUpdateTask>();

  private taskService = inject(UpdateTaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  showValidation = false;
  isLoading = false;
  taskId: number | null = null;
  originalTask: ITaskInstrctor | null = null;

  taskForm: IUpdateTask = {
    name: '',
    description: '',
    type: +TaskType.Work,
    priority: +TaskPriority.Medium,
    dueDate: '',
    completed: false
  };

  // Task type options for dropdown
  taskTypes = [
    { value: TaskType.Personal, label: 'Personal', icon: 'fas fa-user' },
    { value: TaskType.Work, label: 'Work', icon: 'fas fa-briefcase' },
    { value: TaskType.Study, label: 'Study', icon: 'fas fa-book' },
    { value: TaskType.Meeting, label: 'Meeting', icon: 'fas fa-users' },
    { value: TaskType.Other, label: 'Other', icon: 'fas fa-tasks' }
  ];

  // Priority options for dropdown
  priorityOptions = [
    { value: TaskPriority.Low, label: 'Low', color: '#10b981' },
    { value: TaskPriority.Medium, label: 'Medium', color: '#f59e0b' },
    { value: TaskPriority.High, label: 'High', color: '#ef4444' },
    { value: TaskPriority.Urgent, label: 'Urgent', color: '#dc2626' }
  ];

  ngOnInit(): void {
    // Get task ID from route parameters
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.taskId = parseInt(params['id']);
        this.loadTask();
      }
    });
  }

  loadTask(): void {
    if (!this.taskId) return;

    this.isLoading = true;
    console.log('📋 Loading instructor task for editing:', this.taskId);

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.result) {
          this.originalTask = response.result;
          this.populateForm(response.result);
          console.log('✅ Instructor task loaded for editing:', response.result);
        } else {
          console.error('❌ Failed to load instructor task:', response.message);
          this.closeDialog();
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Error loading instructor task:', error);
        this.closeDialog();
      }
    });
  }

  populateForm(task: ITaskInstrctor): void {
    this.taskForm = {
      name: task.name,
      description: task.description || '',
      type: task.type,
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      completed: task.completed
    };
  }

  updateTask(): void {
    if (!this.taskForm.name.trim()) {
      this.showValidation = true;
      return;
    }

    if (!this.taskId || !this.originalTask) {
      return;
    }

    this.isLoading = true;
    this.showValidation = false;

    // Prepare update data for API
    const updateData: IUpdateTaskRequest = {
      id: this.taskId,
      name: this.taskForm.name.trim(),
      description: this.taskForm.description.trim(),
      type: + this.taskForm.type,
      priority: + this.taskForm.priority,
      dueDate: this.taskForm.dueDate ? new Date(this.taskForm.dueDate).toISOString() : new Date().toISOString(),
      completed: this.taskForm.completed
    };

    console.log('📝 Updating instructor task:', updateData);

    this.taskService.updateTask(updateData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('✅ Instructor task updated successfully:', response.result);
          this.taskUpdated.emit(this.taskForm);
          this.closeDialog();
        } else {
          console.error('❌ Failed to update instructor task:', response.message);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error updating instructor task:', error);
        this.isLoading = false;
      }
    });
  }

  closeDialog(): void {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  cancel(): void {
    this.closeDialog();
  }


}
