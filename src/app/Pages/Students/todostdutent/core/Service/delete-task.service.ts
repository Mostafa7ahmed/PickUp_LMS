import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IResponseOf } from '../../../../../Core/Shared/Interface/irespose';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteTaskService {

 private urlTask: string;
  constructor(private _HttpClient: HttpClient) {
    this.urlTask = `${environment.baseUrl}${environment.pickup}`
  }

    deleteTask(id: number): Observable<IResponseOf<any>> {
    const url = `${this.urlTask}task`;
    console.log('🗑️ Deleting task:', id);
    return this._HttpClient.delete<IResponseOf<any>>(url, {
      headers: { id: id.toString() }
    }).pipe(
      tap(response => {
        if (response.success) {
          console.log('✅ Task deleted successfully');
        } else {
          console.error('❌ Failed to delete task:', response.message);
        }
      })
    );
  }
}
