import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TextHeaderComponent } from '../../../../Courses/Components/text-header/text-header.component';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';
import { StudentTaskService } from '../../core/service/student-task.service';

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
    @Output() taskAdded = new EventEmitter<TaskForm>();
  
  showValidation = false;
  taskForm: TaskForm = {
    title: '',
    description: '',
    type: 'teaching',
    priority: 'medium',
    dueDate: '',
    completed: false
  };
  constructor(private router: Router, private route: ActivatedRoute, private studentTaskService: StudentTaskService) {
    this.setDefaultDueDate();
  }

  private setDefaultDueDate(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.taskForm.dueDate = tomorrow.toISOString().split('T')[0];
  }

  saveTask(): void {
    if (!this.taskForm.title.trim()) {
      this.showValidation = true;
      return;
    }
    // Map form to backend model
    const backendTask = {
      name: this.taskForm.title,
      description: this.taskForm.description,
      type: this.mapTypeToEnum(this.taskForm.type),
      priority: this.mapPriorityToEnum(this.taskForm.priority),
      dueDate: this.taskForm.dueDate,
      isCompleted: this.taskForm.completed
    };
    this.studentTaskService.createTask(backendTask).subscribe({
      next: (response) => {
        if (response.success) {
          this.taskAdded.emit(this.taskForm);
          this.closeDialog();
        } else {
          // handle error
        }
      },
      error: (err) => {
        // handle error
      }
    });
  }

  mapTypeToEnum(type: string): number {
    switch (type) {
      case 'personal': return 0;
      case 'teaching': return 2; // Map to Study or Exam as needed
      case 'grading': return 1; // Map to Work or Task as needed
      case 'meeting': return 3;
      default: return 4; // Other
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

  closeDialog(): void {
    this.router.navigate(['/Student', { outlets: { dialog: null } }]);
  }

  cancel(): void {
    this.closeDialog();
  }
}
