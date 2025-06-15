import { Result } from './../../../../topic/Core/Interface/itopic';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, TaskType, TaskPriority, PaginationParams } from '../../core/services/task.service';

@Component({
  selector: 'app-test-task',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-container">
      <h3>🧪 Task Service Test</h3>
      
      <div class="test-section">
        <h4>Create Test Task</h4>
        <button (click)="createTestTask()" [disabled]="isLoading" class="btn-test">
          {{isLoading ? 'Creating...' : 'Create Test Task'}}
        </button>
      </div>

      <div class="test-section">
        <h4>Load Tasks</h4>
        <button (click)="loadTasks()" class="btn-test">Load All Tasks</button>
        <button (click)="loadTasksPaginated()" class="btn-test">Load Paginated Tasks</button>
        <div *ngIf="tasks.length > 0" class="tasks-list">
          <div class="pagination-info" *ngIf="paginationInfo">
            <small>Page {{paginationInfo.pageNumber}} of {{paginationInfo.totalPages}}
            ({{paginationInfo.totalCount}} total tasks)</small>
          </div>
          <div *ngFor="let task of tasks" class="task-item">
            <strong>{{task.name}}</strong> - {{getTaskTypeLabel(task.type)}} - {{getTaskPriorityLabel(task.priority)}}
          </div>
        </div>
      </div>

      <div class="test-section">
        <h4>Console Output</h4>
        <p>Check browser console for detailed logs</p>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .test-section {
      margin-bottom: 30px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    
    .btn-test {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 10px;
    }
    
    .btn-test:hover {
      background: #0056b3;
    }
    
    .btn-test:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .tasks-list {
      margin-top: 15px;
    }
    
    .task-item {
      padding: 8px;
      background: #f8f9fa;
      margin-bottom: 5px;
      border-radius: 4px;
    }

    .pagination-info {
      padding: 8px;
      background: #e3f2fd;
      border-radius: 4px;
      margin-bottom: 10px;
      text-align: center;

      small {
        color: #1976d2;
        font-weight: 500;
      }
    }
  `]
})
export class TestTaskComponent {
  private taskService = inject(TaskService);

  isLoading = false;
  tasks: any[] = [];
  paginationInfo: any = null;

  createTestTask() {
    this.isLoading = true;
    const testTask = {
      name: 'Test Task - ' + new Date().toLocaleTimeString(),
      description: 'This is a test task created from the test component',
      type: 0, // 0 = Personal
      priority: 0, // 0 = Low
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    console.log('🧪 Creating test task:', testTask);
    this.taskService.createTask(testTask).subscribe({
      next: (response: any) => {
        if (response.success) {
          console.log('✅ Test task created:', response);
          this.isLoading = false;
          this.loadTasks(); // Refresh list
        } else {
          console.error('❌ Error creating task:', response.message, response);
          alert('Error creating task: ' + (response.message || JSON.stringify(response)));
          this.isLoading = false;
        }
      },
      error: (error: any) => {
        let backendMsg = error?.error?.message || error?.error?.errors || error?.message || JSON.stringify(error);
        console.error('❌ Error creating task:', error, backendMsg);
        alert('Error creating task. Backend says: ' + backendMsg);
        this.isLoading = false;
      }
    });
  }

  loadTasks() {
    console.log('📋 Loading tasks...');
    this.taskService.getTasksPaginated().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.tasks = response.result || [];
          this.paginationInfo = {
            pageIndex: response.pageIndex,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            pageSize: response.pageSize,
            moveNext: response.moveNext,
            movePrevious: response.movePrevious
          };
        } else {
          console.error('❌ Failed to load tasks:', response.message);
        }
      },
      error: (error: any) => {
        console.error('❌ Error loading tasks:', error);
      }
    });
  }

  loadTasksPaginated() {
    console.log('📋 Loading paginated tasks...');
    const paginationParams: PaginationParams = {
      orderBy: 2,
      pageNumber: 1,
      pageSize: 10, // Smaller page size for testing
      orderBeforPagination: true,
      orderDirection: 1
    };
    this.taskService.getTasksPaginated(paginationParams).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.tasks = response.result || [];
          this.paginationInfo = {
            pageIndex: response.pageIndex,
            totalPages: response.totalPages,
            totalCount: response.totalCount,
            pageSize: response.pageSize,
            moveNext: response.moveNext,
            movePrevious: response.movePrevious
          };
          console.log('✅ Paginated tasks loaded:', {
            tasks: this.tasks,
            pagination: this.paginationInfo
          });
        } else {
          console.error('❌ Failed to load paginated tasks:', response.message);
        }
      },
      error: (error: any) => {
        console.error('❌ Error loading paginated tasks:', error);
      }
    });
  }

  getTaskTypeLabel(type: TaskType): string {
    return this.taskService.getTaskTypeLabel(type);
  }

  getTaskPriorityLabel(priority: TaskPriority): string {
    return this.taskService.getTaskPriorityLabel(priority);
  }
}
