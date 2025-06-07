export interface IStudentTask {
   id: number;
  title: string;
  description?: string;
  type: 'Exam' | 'Task' | 'meeting' | 'personal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskForm {
    title: '',
    description: '',
    type: 'Exam',
    priority: 'medium',
    dueDate: ''  | any ,
    completed: false
}
