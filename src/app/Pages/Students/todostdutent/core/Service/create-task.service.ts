import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../Environments/environment';
import { Observable, tap } from 'rxjs';
import { IResponseOf } from '../../../../../Core/Shared/Interface/irespose';
import { GetalltaskStudentsService } from './getalltask-students.service';
import { ICreateTaskRequest } from '../Interface/icreate-task-request';
@Injectable({
  providedIn: 'root'
})
export class CreateTaskService {
  private getalltaskinstrctorService = inject(GetalltaskStudentsService)

  private urlTask: string;
  constructor(private _HttpClient: HttpClient) {
    this.urlTask = `${environment.baseUrl}${environment.pickup}`
  }




  createTask(taskData: ICreateTaskRequest): Observable<IResponseOf<ICreateTaskRequest>> {
    const url = `${this.urlTask}task`;
    console.log('📝 Creating task:', taskData);
    return this._HttpClient.post<IResponseOf<ICreateTaskRequest>>(url, taskData).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task created successfully:', response.result);
          this.getalltaskinstrctorService.loadTasks()
        } else {
          console.error('❌ Failed to create task:', response.message);
        }
      })
    );
  }


}
