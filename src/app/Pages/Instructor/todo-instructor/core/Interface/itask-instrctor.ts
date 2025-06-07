export interface ITaskInstrctor {
      id: number;
  title: string;
  description?: string;
  type: 'teaching' | 'grading' | 'administrative' | 'meeting' | 'personal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  completed: boolean;
  createdAt: Date;

}
