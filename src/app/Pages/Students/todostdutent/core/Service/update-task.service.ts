import { GetalltaskStudentsService } from './getalltask-students.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../Environments/environment';
import { Observable, tap } from 'rxjs';
import { IResponseOf } from '../../../../../Core/Shared/Interface/irespose';
import { IUpdateTaskRequest } from '../Interface/iupdate-task-request';
import { ITaskStudent } from '../Interface/itask-instrctor';

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskService {

  private urlTask: string;
    private getalltaskinstrctorService = inject(GetalltaskStudentsService)
  
  constructor(private _HttpClient: HttpClient) {
    this.urlTask = `${environment.baseUrl}${environment.pickup}`
  }


    getTaskById(id: number): Observable<IResponseOf<ITaskStudent>> {
    const url = `${this.urlTask}task?id=${id}`;
    console.log('🔍 Getting task by ID:', id);
    return this._HttpClient.get<IResponseOf<ITaskStudent>>(url).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task retrieved successfully:', response.result);
        } else {
          console.error('❌ Failed to get task:', response.message);
        }
      })
    );
  }
    // Mark task as completed by updating it with completed: true
  markTaskCompleted(task: ITaskStudent): Observable<IResponseOf<ITaskStudent>> {
    const updateData: IUpdateTaskRequest = {
      id: task.id,
      name: task.name,
      description: task.description,
      type: task.type,
      priority: task.priority,
      dueDate: task.dueDate || new Date().toISOString(),
      completed: true
    };

    console.log('✅ Marking instructor task as completed:', task.id, updateData);
    return this.updateTask(updateData);
  }

  markTaskIncomplete(task: ITaskStudent): Observable<IResponseOf<ITaskStudent>> {
    const updateData: IUpdateTaskRequest = {
      id: task.id,
      name: task.name,
      description: task.description,
      type: task.type,
      priority: task.priority,
      dueDate: task.dueDate || new Date().toISOString(), 
      completed: false
    };

    console.log('❌ Marking instructor task as incomplete:', task.id, updateData);
    return this.updateTask(updateData);
  }


  updateTask(taskData: IUpdateTaskRequest): Observable<IResponseOf<ITaskStudent>> {
    const url = `${this.urlTask}task`;
    console.log('📝 Updating task:', taskData);
    return this._HttpClient.put<IResponseOf<ITaskStudent>>(url, taskData).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task updated successfully:', response.result);
          this.getalltaskinstrctorService.loadTasks();
        } else {
          console.error('❌ Failed to update task:', response.message);
        }
      })
    );
  }
}
