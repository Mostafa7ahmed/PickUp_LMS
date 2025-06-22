import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TextHeaderComponent } from '../../../../Courses/Components/text-header/text-header.component';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';
import { CreateTaskService } from '../../core/Service/create-task.service';
import { ICreateTaskRequest } from '../../core/Interface/icreate-task-request';
import { TaskPriority, TaskType } from '../../core/Interface/itask-instrctor';
import { NzMessageService } from 'ng-zorro-antd/message';




@Component({
  selector: 'app-addtasktodo',
  standalone: true,
  imports: [CommonModule, FormsModule ,TextHeaderComponent, TopPopComponent],
  templateUrl: './addtasktodo.component.html',
  styleUrl: './addtasktodo.component.scss'
})
export class AddtasktodoComponent {
 private taskService = inject(CreateTaskService);
  private router = inject(Router);
  private _messageService = inject(NzMessageService);

  showValidation = false;
  isLoading = false;

  taskForm: ICreateTaskRequest = {
    name: '',
    description: '',
    type: TaskType.Work,
    priority: TaskPriority.Medium,
    dueDate: ''
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

  constructor() {
    this.setDefaultDueDate();
  }

  private setDefaultDueDate(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.taskForm.dueDate = tomorrow.toISOString().split('T')[0];
  }

  saveTask(): void {
    // Enhanced validation
    if (!this.taskForm.name.trim()) {
      this.showValidation = true;
      this._messageService.error('عنوان المهمة مطلوب');
      return;
    }

    if (this.taskForm.name.trim().length < 3) {
      this.showValidation = true;
      this._messageService.error('عنوان المهمة يجب أن يكون 3 أحرف على الأقل');
      return;
    }

    if (this.taskForm.name.trim().length > 100) {
      this.showValidation = true;
      this._messageService.error('عنوان المهمة لا يمكن أن يتجاوز 100 حرف');
      return;
    }

    if (this.taskForm.description.trim().length > 500) {
      this.showValidation = true;
      this._messageService.error('وصف المهمة لا يمكن أن يتجاوز 500 حرف');
      return;
    }

    // Validate due date is not in the past
    const selectedDate = new Date(this.taskForm.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      this.showValidation = true;
      this._messageService.error('تاريخ الاستحقاق لا يمكن أن يكون في الماضي');
      return;
    }

    this.isLoading = true;
    this.showValidation = false;

    const taskData: ICreateTaskRequest = {
      name: this.taskForm.name.trim(),
      description: this.taskForm.description.trim(),
      type: +this.taskForm.type,
      priority: +this.taskForm.priority,
      dueDate: new Date(this.taskForm.dueDate).toISOString()
    };

    console.log('📝 Saving task:', taskData);

    this.taskService.createTask(taskData).subscribe({
      next: (response) => {
        if (response.success) {
          this._messageService.success('تم إنشاء المهمة بنجاح');
          this.closeDialog();
        } else {
          this._messageService.error(response.message || 'فشل في إنشاء المهمة');
        }
        this.isLoading = false;
      },
      error: (error) => {
        this._messageService.error('حدث خطأ أثناء إنشاء المهمة');
        console.error('Error creating task:', error);
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

  // Validation helper methods
  isTaskNameInvalid(): boolean {
    return this.showValidation && (!this.taskForm.name.trim() || 
           this.taskForm.name.trim().length < 3 || 
           this.taskForm.name.trim().length > 100);
  }

  isDescriptionInvalid(): boolean {
    return this.showValidation && this.taskForm.description.trim().length > 500;
  }

  isDueDateInvalid(): boolean {
    if (!this.showValidation) return false;
    const selectedDate = new Date(this.taskForm.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
  }

  getTaskNameError(): string {
    if (!this.taskForm.name.trim()) {
      return 'عنوان المهمة مطلوب';
    }
    if (this.taskForm.name.trim().length < 3) {
      return 'عنوان المهمة يجب أن يكون 3 أحرف على الأقل';
    }
    if (this.taskForm.name.trim().length > 100) {
      return 'عنوان المهمة لا يمكن أن يتجاوز 100 حرف';
    }
    return '';
  }

  getDescriptionError(): string {
    if (this.taskForm.description.trim().length > 500) {
      return 'وصف المهمة لا يمكن أن يتجاوز 500 حرف';
    }
    return '';
  }

  getDueDateError(): string {
    const selectedDate = new Date(this.taskForm.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return 'تاريخ الاستحقاق لا يمكن أن يكون في الماضي';
    }
    return '';
  }
}
