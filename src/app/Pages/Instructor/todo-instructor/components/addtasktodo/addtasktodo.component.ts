import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-addtasktodo',
  standalone: true,
  imports: [CommonModule, FormsModule ,TextHeaderComponent, TopPopComponent],
  templateUrl: './addtasktodo.component.html',
  styleUrl: './addtasktodo.component.scss'
})
export class AddtasktodoComponent {
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

    this.taskAdded.emit(this.taskForm);
    this.closeDialog();
  }

  closeDialog(): void {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  cancel(): void {
    this.closeDialog();
  }
}
