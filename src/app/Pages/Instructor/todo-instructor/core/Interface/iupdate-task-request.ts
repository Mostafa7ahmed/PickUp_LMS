export interface IUpdateTaskRequest {
      id: number;
  name: string;
  description: string;
  type: number;
  priority: number;
  dueDate: string;
  completed: boolean;
}
