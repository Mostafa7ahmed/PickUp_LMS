import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TextHeaderComponent } from '../../../../Courses/Components/text-header/text-header.component';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';
import { ICreateTaskRequest } from '../../core/Interface/icreate-task-request';
import { TaskPriority, TaskType } from '../../core/Interface/itask-instrctor';
import { CreateTaskService } from '../../core/Service/create-task.service';

interface TaskForm {
  title: string;
  description: string;
  type: 'teaching' | 'grading' | 'administrative' | 'meeting' | 'personal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  completed: boolean;
}
@Component({
  selector: 'app-add-task-student',
  standalone: true,
  imports: [CommonModule, FormsModule ,TextHeaderComponent, TopPopComponent],
  templateUrl: './add-task-student.component.html',
  styleUrl: './add-task-student.component.scss'
})
export class AddTaskStudentComponent {
 private taskService = inject(CreateTaskService);
  private router = inject(Router);

  showValidation = false;
  isLoading = false;

  taskForm: ICreateTaskRequest = {
    name: '',
    description: '',
    type: TaskType.Exam,
    priority: TaskPriority.Medium,
    dueDate: ''
  };

  // Task type options for dropdown
  taskTypes = [
    { value: TaskType.Personal, label: 'Personal', icon: 'fas fa-user' },
    { value: TaskType.Exam, label: 'Exam', icon: 'fas fa-briefcase' },
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
    if (!this.taskForm.name.trim()) {
      this.showValidation = true;
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
          this.closeDialog();
        } else {
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }
  closeDialog(): void {
    this.router.navigate(['/Student', { outlets: { dialog: null } }]);
  }

  cancel(): void {
    this.closeDialog();
  }
}
