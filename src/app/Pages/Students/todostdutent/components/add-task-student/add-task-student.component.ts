import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TextHeaderComponent } from '../../../../Courses/Components/text-header/text-header.component';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';

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
  constructor(private router: Router, private route: ActivatedRoute) {
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

    this.closeDialog();
  }

  closeDialog(): void {
    this.router.navigate(['/Student', { outlets: { dialog: null } }]);
  }

  cancel(): void {
    this.closeDialog();
  }
}
