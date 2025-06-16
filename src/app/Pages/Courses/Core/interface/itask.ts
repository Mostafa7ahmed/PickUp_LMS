// Unified Task Management Interfaces for PickUp LMS
// These interfaces match the exact API response structure from the task management endpoints

// Task interface matching the exact API response structure
export interface ITask {
  id: number;
  userId: number;
  name: string;
  description: string;
  type: number;
  completed: boolean;
  priority: number;
  dueDate?: string; // Optional for UI compatibility
  createdOn: string;
  updatedOn: string;
}

// Request interface for creating tasks (matches API request structure)
export interface ICreateTaskRequest {
  name: string;
  description: string;
  type: number;
  priority: number;
  dueDate: string;
}

// Request interface for updating tasks (matches API request structure)
export interface IUpdateTaskRequest {
  id: number;
  name: string;
  description: string;
  type: number;
  priority: number;
  dueDate: string;
  completed: boolean;
}

// API Response interface matching the exact API response structure
export interface ITaskApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  result?: T;
}

// Pagination parameters interface
export interface ITaskPaginationParams {
  orderBy?: number;
  pageNumber?: number;
  pageSize?: number;
  orderBeforPagination?: boolean;
  orderDirection?: number;
}

// Paginated response interface
export interface ITaskPaginatedResponse<T> {
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

// Task Type Enum (matches API values)
export enum TaskType {
  Personal = 0,
  Work = 1,
  Study = 2,
  Meeting = 3,
  Other = 4
}

// Task Priority Enum (matches API values)
export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3
}

// Task form interface for UI components
export interface ITaskForm {
  name: string;
  description: string;
  type: number;
  priority: number;
  dueDate: string;
}

// Task filter options for UI
export interface ITaskFilter {
  type?: number;
  priority?: number;
  completed?: boolean;
  search?: string;
}

// Task statistics interface
export interface ITaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
  byType: {
    personal: number;
    work: number;
    study: number;
    meeting: number;
    other: number;
  };
}

// Helper interfaces for UI components
export interface ITaskTypeOption {
  value: number;
  label: string;
  icon: string;
}

export interface ITaskPriorityOption {
  value: number;
  label: string;
  color: string;
  icon: string;
}

// Task validation interface
export interface ITaskValidation {
  isValid: boolean;
  errors: {
    name?: string;
    description?: string;
    type?: string;
    priority?: string;
    dueDate?: string;
  };
}

// Task service configuration interface
export interface ITaskServiceConfig {
  baseUrl: string;
  endpoints: {
    create: string;
    update: string;
    delete: string;
    get: string;
    paginate: string;
  };
  defaultPagination: ITaskPaginationParams;
}
