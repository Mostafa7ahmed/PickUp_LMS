import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentTask {
  id?: number;
  name: string;
  description: string;
  type: number;
  priority: number;
  dueDate: string;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  result: T;
  message: string;
  errors?: string[];
}

export interface PaginationParams {
  orderBy?: number;
  pageNumber?: number;
  pageSize?: number;
  orderBeforPagination?: boolean;
  orderDirection?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  result: T[];
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  count: number;
  totalPages: number;
  moveNext: boolean;
  movePrevious: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StudentTaskService {
  private readonly baseUrl = 'https://pickup.runasp.net/pickup-lms/api/v1';

  constructor(private http: HttpClient) {}

  // Get all tasks (paginated, with optional search)
  getTasksPaginated(params?: PaginationParams & { search?: string }): Observable<PaginatedResponse<StudentTask>> {
    const url = `${this.baseUrl}/task/paginate`;
    const defaultParams: PaginationParams = {
      orderBy: 2,
      pageNumber: 1,
      pageSize: 50,
      orderBeforPagination: true,
      orderDirection: 1
    };
    const finalParams = { ...defaultParams, ...params };
    let httpParams = new HttpParams();
    Object.entries(finalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });
    return this.http.get<PaginatedResponse<StudentTask>>(url, { params: httpParams });
  }

  // Create new task
  createTask(taskData: Omit<StudentTask, 'id'>): Observable<ApiResponse<StudentTask>> {
    const url = `${this.baseUrl}/task`;
    return this.http.post<ApiResponse<StudentTask>>(url, taskData);
  }

  // Update task
  updateTask(id: number, taskData: Partial<StudentTask>): Observable<ApiResponse<StudentTask>> {
    const url = `${this.baseUrl}/task`;
    return this.http.put<ApiResponse<StudentTask>>(url, { id, ...taskData });
  }

  // Delete task
  deleteTask(id: number): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/task`;
    return this.http.delete<ApiResponse<any>>(url, { headers: { id: id.toString() } });
  }
}
