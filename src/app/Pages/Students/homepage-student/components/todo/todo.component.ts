import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  newTask: string = '';
  tasks: Task[] = [
    { title: 'Complete Database ER diagram', completed: false },
    { title: 'Review algorithm complexity notes', completed: false },
    { title: 'Schedule meeting with advisor', completed: true },
    { title: 'Prepare for AI ethics presentation', completed: false },
    { title: 'Register for summer courses', completed: false },
    { title: 'Submit research paper draft', completed: true },
  ];

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.unshift({ title: this.newTask.trim(), completed: false });
      this.newTask = '';
    }
  }

  removeTask(taskToRemove: Task) {
    this.tasks = this.tasks.filter(task => task !== taskToRemove);
  }
}
