export interface ITaskStudent {
  id: number;
  userId: number;
  name: string;
  description: string;
  type: TaskType;
  completed: boolean;
  priority: TaskPriority;
  dueDate?: string; // Added dueDate field for UI compatibility
  createdOn: string;
  updatedOn: string;
}

export enum TaskType {
  Personal = 0,
  Exam = 1,
  Study = 2,
  Meeting = 3,
  Other = 4
}

export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3
}
