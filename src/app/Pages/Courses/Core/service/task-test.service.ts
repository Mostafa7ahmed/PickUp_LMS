import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { 
  ITask, 
  ICreateTaskRequest, 
  IUpdateTaskRequest, 
  ITaskApiResponse, 
  ITaskPaginatedResponse, 
  ITaskPaginationParams,
  TaskType,
  TaskPriority 
} from '../interface/itask';

/**
 * Task Test Service
 * 
 * This service provides methods to test all task management API endpoints
 * and verify that the interfaces match the actual API responses.
 */
@Injectable({
  providedIn: 'root'
})
export class TaskTestService {
  private readonly baseUrl = 'https://pickup.runasp.net/pickup-lms/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Test creating a new task
   */
  testCreateTask(): Observable<ITaskApiResponse<ITask>> {
    const testTask: ICreateTaskRequest = {
      name: 'Test Task - ' + new Date().toLocaleTimeString(),
      description: 'This is a test task created to verify API connectivity',
      type: TaskType.Personal,
      priority: TaskPriority.Medium,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    console.log('🧪 Testing CREATE task endpoint:', testTask);
    
    return this.http.post<ITaskApiResponse<ITask>>(`${this.baseUrl}/task`, testTask).pipe(
      tap(response => {
        console.log('✅ CREATE task response:', response);
        if (response.success && response.result) {
          console.log('✅ Task created with ID:', response.result.id);
        } else {
          console.error('❌ CREATE task failed:', response.message);
        }
      })
    );
  }

  /**
   * Test getting paginated tasks
   */
  testGetPaginatedTasks(): Observable<ITaskPaginatedResponse<ITask>> {
    const params: ITaskPaginationParams = {
      orderBy: 2,
      pageNumber: 1,
      pageSize: 10,
      orderBeforPagination: true,
      orderDirection: 0
    };

    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    console.log('🧪 Testing PAGINATE tasks endpoint with params:', params);
    
    return this.http.get<ITaskPaginatedResponse<ITask>>(`${this.baseUrl}/task/paginate`, { params: httpParams }).pipe(
      tap(response => {
        console.log('✅ PAGINATE tasks response:', response);
        if (response.success) {
          console.log('✅ Retrieved tasks:', {
            count: response.result.length,
            totalCount: response.totalCount,
            pageIndex: response.pageIndex,
            totalPages: response.totalPages
          });
        } else {
          console.error('❌ PAGINATE tasks failed:', response.message);
        }
      })
    );
  }

  /**
   * Test getting a single task by ID
   */
  testGetTaskById(id: number): Observable<ITaskApiResponse<ITask>> {
    console.log('🧪 Testing GET task by ID endpoint:', id);
    
    return this.http.get<ITaskApiResponse<ITask>>(`${this.baseUrl}/task?id=${id}`).pipe(
      tap(response => {
        console.log('✅ GET task by ID response:', response);
        if (response.success && response.result) {
          console.log('✅ Retrieved task:', response.result);
        } else {
          console.error('❌ GET task by ID failed:', response.message);
        }
      })
    );
  }

  /**
   * Test updating a task
   */
  testUpdateTask(taskId: number): Observable<ITaskApiResponse<ITask>> {
    const updateData: IUpdateTaskRequest = {
      id: taskId,
      name: 'Updated Test Task - ' + new Date().toLocaleTimeString(),
      description: 'This task has been updated via API test',
      type: TaskType.Work,
      priority: TaskPriority.High,
      dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      completed: false
    };

    console.log('🧪 Testing UPDATE task endpoint:', updateData);
    
    return this.http.put<ITaskApiResponse<ITask>>(`${this.baseUrl}/task`, updateData).pipe(
      tap(response => {
        console.log('✅ UPDATE task response:', response);
        if (response.success && response.result) {
          console.log('✅ Task updated:', response.result);
        } else {
          console.error('❌ UPDATE task failed:', response.message);
        }
      })
    );
  }

  /**
   * Test deleting a task
   */
  testDeleteTask(id: number): Observable<ITaskApiResponse<any>> {
    console.log('🧪 Testing DELETE task endpoint:', id);
    
    return this.http.delete<ITaskApiResponse<any>>(`${this.baseUrl}/task`, { 
      headers: { id: id.toString() } 
    }).pipe(
      tap(response => {
        console.log('✅ DELETE task response:', response);
        if (response.success) {
          console.log('✅ Task deleted successfully');
        } else {
          console.error('❌ DELETE task failed:', response.message);
        }
      })
    );
  }

  /**
   * Run a complete test suite for all endpoints
   */
  runCompleteTest(): void {
    console.log('🧪 Starting complete task API test suite...');
    
    let createdTaskId: number;

    // Step 1: Test pagination (should work even with no tasks)
    this.testGetPaginatedTasks().subscribe({
      next: (paginateResponse) => {
        // Step 2: Create a test task
        this.testCreateTask().subscribe({
          next: (createResponse) => {
            if (createResponse.success && createResponse.result) {
              createdTaskId = createResponse.result.id;
              
              // Step 3: Get the created task by ID
              this.testGetTaskById(createdTaskId).subscribe({
                next: (getResponse) => {
                  // Step 4: Update the task
                  this.testUpdateTask(createdTaskId).subscribe({
                    next: (updateResponse) => {
                      // Step 5: Delete the task
                      this.testDeleteTask(createdTaskId).subscribe({
                        next: (deleteResponse) => {
                          console.log('🎉 Complete test suite finished successfully!');
                        },
                        error: (error) => {
                          console.error('❌ DELETE test failed:', error);
                        }
                      });
                    },
                    error: (error) => {
                      console.error('❌ UPDATE test failed:', error);
                    }
                  });
                },
                error: (error) => {
                  console.error('❌ GET by ID test failed:', error);
                }
              });
            }
          },
          error: (error) => {
            console.error('❌ CREATE test failed:', error);
          }
        });
      },
      error: (error) => {
        console.error('❌ PAGINATE test failed:', error);
      }
    });
  }
}
