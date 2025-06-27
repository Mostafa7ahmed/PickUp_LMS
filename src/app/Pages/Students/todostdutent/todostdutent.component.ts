import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { ITaskStudent, TaskPriority, TaskType } from './core/Interface/itask-instrctor';
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { Subscription } from 'rxjs';
import { DeleteTaskService } from './core/Service/delete-task.service';
import { GetalltaskStudentsService } from './core/Service/getalltask-students.service';
import { UpdateTaskService } from './core/Service/update-task.service';
import { DeleteTaskInstructorComponent } from './components/delete-task-instructor/delete-task-instructor.component';


@Component({
  selector: 'app-todostdutent',
  standalone: true,
  imports: [CommonModule, FormsModule , DeleteTaskInstructorComponent],
  templateUrl: './todostdutent.component.html',
  styleUrl: './todostdutent.component.scss'
})
export class TodostdutentComponent implements OnInit, OnDestroy  {
   activeFilter: string ="all";
   searchTerm: string = '';
   isLoading = false;
   isDeletePopupVisible = false;
   selectedDeleteTask: ITaskStudent | null = null;
   tasks:IPaginationResponse<ITaskStudent> = {} as IPaginationResponse<ITaskStudent>
   private tasksSubscription?: Subscription;
    @ViewChild(DeleteTaskInstructorComponent) deleteTaskComponent!: DeleteTaskInstructorComponent;
    private router = inject(Router);
   private route = inject(ActivatedRoute);
   private _deleteTaskService = inject(DeleteTaskService);
   private _getalltaskStudentsService = inject(GetalltaskStudentsService);
     private _updateTaskService = inject(UpdateTaskService);
 
   constructor( ) {}
 
   ngOnInit(): void {
     this.loadTasks()
 
   this.tasksSubscription = this._getalltaskStudentsService.tasks$.subscribe(res => {
       this.tasks.result = res;
       console.log('📋 Tasks updated in TodoInstructor:', res);
     });
    
   }
 
   loadTasks(){
       this._getalltaskStudentsService.getTasks().subscribe({
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
    this.router.navigate(['/Student', { outlets: { dialog: ['taskTodoStudent'] } }]);
   }
 
   
   openEditTaskPopup(task: ITaskStudent): void {
  
     this.router.navigate(['/Student',  { outlets: { dialog: ['edittaskTodoStudent', task.id] } }]);
   }
  
 
   // Filter methods
  
 
   setFilter(filter: string): void {
     this.activeFilter = filter;
   }
 
 
  
 
   getPriorityLabel(priority: number): string {
     return this._getalltaskStudentsService.getTaskPriorityLabel(priority);
   }
 
 
 
 
   getFilteredTasks(): ITaskStudent[] {
     let filteredTasks = [...this.tasks.result];
 
     if (this.activeFilter !== 'all') {
       const filterTypeMap: { [key: string]: TaskType } = {
         'personal': TaskType.Personal,
         'Exam': TaskType.Exam,
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
   openDeleteTaskPopup(task: ITaskStudent): void {
 
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
   toggleTaskCompletion(task: ITaskStudent): void {
 
   
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
   trackByTaskId(index: number, task: ITaskStudent): number {
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
     return this._getalltaskStudentsService.getTaskPriorityColor(priority);
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
       case TaskType.Personal: return 'Personal';
       case TaskType.Exam: return 'Exam';
       case TaskType.Study: return 'Study';
       case TaskType.Meeting: return 'Meeting';
       case TaskType.Other: return 'Other';
       default: return 'Unknown';
     }
   }
 
   getTaskPriorityLabel(priority: number): string {
     switch (priority) {
       case TaskPriority.Low: return 'Low';
       case TaskPriority.Medium: return 'Medium';
       case TaskPriority.High: return 'High';
       case TaskPriority.Urgent: return 'Urgent';
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
       case TaskType.Exam: return 'fas fa-briefcase';
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
       case 'Exam': return 'No Exam tasks found. Add a Exam task to get started!';
       case 'study': return 'No study tasks found. Add a study task to get started!';
       case 'meeting': return 'No meeting tasks found. Add a meeting task to get started!';
       case 'personal': return 'No personal tasks found. Add a personal task to get started!';
       case 'other': return 'No other tasks found. Add a task to get started!';
       default: return 'No tasks found. Add your first task to get started!';
     }
   }
 
}
