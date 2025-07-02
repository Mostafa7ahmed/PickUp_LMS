import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { ITaskInstrctor  , TaskType , TaskPriority}   from './core/Interface/itask-instrctor';
import { GetalltaskinstrctorService } from './core/Service/getalltaskinstrctor.service';
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { Subscription } from 'rxjs';
import { DeleteTaskInstructorComponent } from './components/delete-task-instructor/delete-task-instructor.component';
import { DeleteTaskService } from './core/Service/delete-task.service';
import { UpdateTaskService } from './core/Service/update-task.service';
@Component({
  selector: 'app-todo-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, DeleteTaskInstructorComponent],
  templateUrl: './todo-instructor.component.html',
  styleUrl: '../../Students/todostdutent/todostdutent.component.scss'
})
export class TodoInstructorComponent implements OnInit, OnDestroy {
  activeFilter: string ="all";
  searchTerm: string = '';
  isLoading = false;
  isDeletePopupVisible = false;
  selectedDeleteTask: ITaskInstrctor | null = null;
  tasks:IPaginationResponse<ITaskInstrctor> = {} as IPaginationResponse<ITaskInstrctor>
  private tasksSubscription?: Subscription;
 @ViewChild(DeleteTaskInstructorComponent) deleteTaskComponent!: DeleteTaskInstructorComponent;
   private router = inject(Router);
  private route = inject(ActivatedRoute);
  private translateService = inject(TranslateService);
  private _deleteTaskService = inject(DeleteTaskService);
  private _getalltaskinstrctorService = inject(GetalltaskinstrctorService);
    private _updateTaskService = inject(UpdateTaskService);

  constructor( ) {}

  ngOnInit(): void {
    this.loadTasks()

  this.tasksSubscription = this._getalltaskinstrctorService.tasks$.subscribe(res => {
      this.tasks.result = res;
      console.log('📋 Tasks updated in TodoInstructor:', res);
    });
   
  }

  loadTasks(){
      this._getalltaskinstrctorService.getTasks().subscribe({
    next:(res)=>{
      this.tasks.result=res.result

      console.log(res)
    }

  });
  }
    ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  openAddTaskForm(): void {
    this.openAddTaskPopup();
  }

  openAddTaskPopup(): void {
    this.router.navigate([{ outlets: { dialog: ['addTaskInstrcutor'] } }]);
  }

  
  openEditTaskPopup(task: ITaskInstrctor): void {
 
    this.router.navigate([ { outlets: { dialog: ['editTaskinstructor', task.id] } }]);
  }
 

  // Filter methods
 

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }


 

  getPriorityLabel(priority: number): string {
    return this._getalltaskinstrctorService.getTaskPriorityLabel(priority);
  }




  getFilteredTasks(): ITaskInstrctor[] {
    let filteredTasks = [...this.tasks.result];

    if (this.activeFilter !== 'all') {
      const filterTypeMap: { [key: string]: TaskType } = {
        'personal': TaskType.Personal,
        'work': TaskType.Work,
        'study': TaskType.Study,
        'meeting': TaskType.Meeting,
        'other': TaskType.Other
      };

      const filterType = filterTypeMap[this.activeFilter];
      if (filterType !== undefined) {
        filteredTasks = filteredTasks.filter(task => task.type === filterType);
      }
    }

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.name.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    }

    return filteredTasks;
  }





  // Delete Task management methods
  openDeleteTaskPopup(task: ITaskInstrctor): void {

    this.isDeletePopupVisible = true;
    this.selectedDeleteTask = task;
  }

    deleteTask(): void {
    if (!this.selectedDeleteTask?.id) {
      console.error('❌ No task selected for deletion');
      return;
    }


    this._deleteTaskService.deleteTask(this.selectedDeleteTask.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.closeDeletePopup();
        this.loadTasks();

        } else {
          alert('Failed to delete task: ' + response.message);
          this.resetDeleteComponentState();
        }
      },
      error: (error) => {
        alert('Error deleting task. Please try again.');
        this.resetDeleteComponentState();
      }
    });
  }
 resetDeleteComponentState(): void {
    if (this.deleteTaskComponent) {
      this.deleteTaskComponent.resetLoadingState();
    }
  }

  closeDeletePopup(): void {
    this.isDeletePopupVisible = false;
    this.selectedDeleteTask = null;
  }
  // Complect Task management methods
  toggleTaskCompletion(task: ITaskInstrctor): void {

  
    if (task.completed) {
      this._updateTaskService.markTaskCompleted(task).subscribe({
        next: (response) => {
          if (response.success) {
                        this.playSuccessSound()

          } 
          else {
            task.completed = false;
          }
        },
        error: (error) => {
          task.completed = false;
        }
      });
    } else {
      this._updateTaskService.markTaskIncomplete(task).subscribe({
        next: (response) => {
          if (response.success) {
          } else {
            task.completed = true;
          }
        },
        error: (error) => {
          task.completed = true;
        }
      });
    }
  }
  audio = new Audio('Done.mp3');


  playSuccessSound() {
    this.audio.play();
  }
  // Utility methods
  trackByTaskId(index: number, task: ITaskInstrctor): number {
    return task.id;
  }





  getTaskTypeColor(type: number): string {
    switch (type) {
      case 0: return '#dc2626'; 
      case 1: return '#1e40af'; 
      case 2: return '#7c3aed';
      case 3: return '#059669';
      case 4: return '#475569'; 
      default: return '#6b7280';
    }
  }

  getTaskTypeBackgroundColor(type: number): string {
    switch (type) {
      case 0: return '#fef2f2';
      case 1: return '#dbeafe'; 
      case 2: return '#f3e8ff'; 
      case 3: return '#ecfdf5'; 
      case 4: return '#f1f5f9'; 
      default: return '#f9fafb'; 
    }
  }

  getPriorityColor(priority: number): string {
    return this._getalltaskinstrctorService.getTaskPriorityColor(priority);
  }

  getPriorityBackgroundColor(priority: number): string {
    switch (priority) {
      case 0: return '#ecfdf5';
      case 1: return '#fffbeb';
      case 2: return '#fef2f2'; 
      case 3: return '#fef2f2'; 
      default: return '#f9fafb';
    }
  }

  getTaskTypeLabel(type: number): string {
    switch (type) {
      case TaskType.Personal: return this.translateService.instant('TaskManagement.taskTypes.personal');
      case TaskType.Work: return this.translateService.instant('TaskManagement.taskTypes.work');
      case TaskType.Study: return this.translateService.instant('TaskManagement.taskTypes.study');
      case TaskType.Meeting: return this.translateService.instant('TaskManagement.taskTypes.meeting');
      case TaskType.Other: return this.translateService.instant('TaskManagement.taskTypes.other');
      default: return 'Unknown';
    }
  }

  getTaskPriorityLabel(priority: number): string {
    switch (priority) {
      case TaskPriority.Low: return this.translateService.instant('TaskManagement.priorities.low');
      case TaskPriority.Medium: return this.translateService.instant('TaskManagement.priorities.medium');
      case TaskPriority.High: return this.translateService.instant('TaskManagement.priorities.high');
      case TaskPriority.Urgent: return this.translateService.instant('TaskManagement.priorities.urgent');
      default: return 'Unknown';
    }
  }

  getTaskPriorityColor(priority: number): string {
    switch (priority) {
      case TaskPriority.Low: return '#10b981';
      case TaskPriority.Medium: return '#f59e0b';
      case TaskPriority.High: return '#ef4444';
      case TaskPriority.Urgent: return '#dc2626';
      default: return '#6b7280';
    }
  }

  getTaskTypeIcon(type: number): string {
    switch (type) {
      case TaskType.Personal: return 'fas fa-user';
      case TaskType.Work: return 'fas fa-briefcase';
      case TaskType.Study: return 'fas fa-book';
      case TaskType.Meeting: return 'fas fa-users';
      case TaskType.Other: return 'fas fa-tasks';
      default: return 'fas fa-task';
    }
  }

  getPriorityIcon(priority: number): string {
    switch (priority) {
      case TaskPriority.Low: return 'fas fa-arrow-down';
      case TaskPriority.Medium: return 'fas fa-minus';
      case TaskPriority.High: return 'fas fa-arrow-up';
      case TaskPriority.Urgent: return 'fas fa-exclamation';
      default: return 'fas fa-question';
    }
  }
   getEmptyStateMessage(): string {
    switch (this.activeFilter) {
      case 'work': return this.translateService.instant('TaskManagement.emptyStates.work');
      case 'study': return this.translateService.instant('TaskManagement.emptyStates.study');
      case 'meeting': return this.translateService.instant('TaskManagement.emptyStates.meeting');
      case 'personal': return this.translateService.instant('TaskManagement.emptyStates.personal');
      case 'other': return this.translateService.instant('TaskManagement.emptyStates.other');
      default: return this.translateService.instant('TaskManagement.emptyStates.allTasks');
    }
  }

}
