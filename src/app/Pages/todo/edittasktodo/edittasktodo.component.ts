import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface TaskForm {
  title: string;
  description: string;
  type: 'teaching' | 'grading' | 'administrative' | 'meeting' | 'personal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  completed: boolean;
}

@Component({
  selector: 'app-edittasktodo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="add-task-page">
      <div class="task-form">
        <div class="form-header">
          <h3>
            <i class="fa-solid fa-edit"></i>
            Edit Task
          </h3>
        </div>
        
        <div class="form-body">
          <div class="form-group">
            <label for="taskTitle">Task Title *</label>
            <input type="text" 
                   id="taskTitle"
                   [(ngModel)]="taskForm.title" 
                   placeholder="Enter task title..."
                   class="form-control"
                   [class.error]="!taskForm.title.trim() && showValidation">
          </div>
          
          <div class="form-group">
            <label for="taskDescription">Description</label>
            <textarea id="taskDescription"
                      [(ngModel)]="taskForm.description" 
                      placeholder="Task description (optional)..."
                      class="form-control"
                      rows="3"></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="taskType">Type</label>
              <select id="taskType" [(ngModel)]="taskForm.type" class="form-control">
                <option value="teaching">Teaching</option>
                <option value="grading">Grading</option>
                <option value="administrative">Administrative</option>
                <option value="meeting">Meeting</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" [(ngModel)]="taskForm.priority" class="form-control">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="taskDueDate">Due Date</label>
            <input type="date" 
                   id="taskDueDate"
                   [(ngModel)]="taskForm.dueDate" 
                   class="form-control">
          </div>
        </div>
        
        <div class="form-footer">
          <button class="btn-cancel" (click)="cancel()">
            Cancel
          </button>
          <button class="btn-save" 
                  (click)="saveTask()"
                  [disabled]="!taskForm.title.trim()">
            <i class="fa-solid fa-check"></i>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../addtasktodo/addtasktodo.component.scss']
})
export class EdittasktodoComponent implements OnInit {
  showValidation = false;
  taskForm: TaskForm = {
    title: '',
    description: '',
    type: 'teaching',
    priority: 'medium',
    dueDate: '',
    completed: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the task ID from route params
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      // Here you would typically fetch the task data using the ID
      // For now, we'll simulate loading a task
      this.loadTask(taskId);
    });
  }

  private loadTask(id: number): void {
    // Simulate loading task data
    // In a real app, you would fetch this from a service
    const task = {
      title: 'Sample Task',
      description: 'Sample Description',
      type: 'teaching' as const,
      priority: 'medium' as const,
      dueDate: new Date().toISOString().split('T')[0],
      completed: false
    };

    this.taskForm = task;
  }

  saveTask(): void {
    if (!this.taskForm.title.trim()) {
      this.showValidation = true;
      return;
    }

    // Here you would typically update the task in your service
    this.closeDialog();
  }

  closeDialog(): void {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  cancel(): void {
    this.closeDialog();
  }
}
