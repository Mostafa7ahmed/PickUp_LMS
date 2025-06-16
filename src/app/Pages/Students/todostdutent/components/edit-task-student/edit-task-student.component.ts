import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TextHeaderComponent } from '../../../../Courses/Components/text-header/text-header.component';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';
import { StudentTaskService, StudentTask } from '../../core/service/student-task.service';

interface EditTaskForm {
  title: string;
  description: string;
  type: 'personal' | 'work' | 'study' | 'meeting' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  completed: boolean;
}

@Component({
  selector: 'app-edit-task-student',
  standalone: true,
  imports: [CommonModule, FormsModule, TextHeaderComponent, TopPopComponent],
  templateUrl: './edit-task-student.component.html',
  styleUrl: './edit-task-student.component.scss'
})
export class EditTaskStudentComponent implements OnInit {
  @Output() taskUpdated = new EventEmitter<EditTaskForm>();

  showValidation = false;
  isLoading = false;
  taskId: number | null = null;
  originalTask: StudentTask | null = null;

  taskForm: EditTaskForm = {
    title: '',
    description: '',
    type: 'personal',
    priority: 'medium',
    dueDate: '',
    completed: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentTaskService: StudentTaskService
  ) {}

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
    console.log('📋 Loading task for editing:', this.taskId);

    this.studentTaskService.getTaskById(this.taskId).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.result) {
          this.originalTask = response.result;
          this.populateForm(response.result);
          console.log('✅ Task loaded for editing:', response.result);
        } else {
          console.error('❌ Failed to load task:', response.message);
          alert('Failed to load task: ' + response.message);
          this.closeDialog();
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Error loading task:', error);
        alert('Error loading task. Please try again.');
        this.closeDialog();
      }
    });
  }

  populateForm(task: StudentTask): void {
    this.taskForm = {
      title: task.name,
      description: task.description || '',
      type: this.mapEnumToType(task.type),
      priority: this.mapEnumToPriority(task.priority),
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      completed: task.completed
    };
  }

  mapEnumToType(typeEnum: number): 'personal' | 'work' | 'study' | 'meeting' | 'other' {
    switch (typeEnum) {
      case 0: return 'personal';
      case 1: return 'work';
      case 2: return 'study';
      case 3: return 'meeting';
      case 4: return 'other';
      default: return 'other';
    }
  }

  mapEnumToPriority(priorityEnum: number): 'low' | 'medium' | 'high' | 'urgent' {
    switch (priorityEnum) {
      case 0: return 'low';
      case 1: return 'medium';
      case 2: return 'high';
      case 3: return 'urgent';
      default: return 'medium';
    }
  }

  mapTypeToEnum(type: string): number {
    switch (type) {
      case 'personal': return 0;
      case 'work': return 1;
      case 'study': return 2;
      case 'meeting': return 3;
      case 'other': return 4;
      default: return 4;
    }
  }

  mapPriorityToEnum(priority: string): number {
    switch (priority) {
      case 'low': return 0;
      case 'medium': return 1;
      case 'high': return 2;
      case 'urgent': return 3;
      default: return 1;
    }
  }

  updateTask(): void {
    if (!this.taskForm.title.trim()) {
      this.showValidation = true;
      return;
    }

    if (!this.taskId || !this.originalTask) {
      alert('Task information is missing. Please try again.');
      return;
    }

    this.showValidation = false;

    // Map form to backend model
    const updateData = {
      id: this.taskId,
      name: this.taskForm.title.trim(),
      description: this.taskForm.description.trim(),
      type: this.mapTypeToEnum(this.taskForm.type),
      priority: this.mapPriorityToEnum(this.taskForm.priority),
      dueDate: this.taskForm.dueDate ? new Date(this.taskForm.dueDate).toISOString() : new Date().toISOString(),
      completed: this.taskForm.completed
    };

    console.log('📝 Updating student task:', updateData);

    this.studentTaskService.updateTask(updateData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('✅ Student task updated successfully:', response.result);
          this.taskUpdated.emit(this.taskForm);
          this.closeDialog();
        } else {
          console.error('❌ Failed to update student task:', response.message);
          alert('Failed to update task: ' + response.message);
        }
      },
      error: (error) => {
        console.error('❌ Error updating student task:', error);
        alert('Error updating task. Please try again.');
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
