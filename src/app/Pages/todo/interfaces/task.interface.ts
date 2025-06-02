export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  priorityClass: string;
  dueDate: Date;
  course?: string;
  type: 'course-prep' | 'grading' | 'administrative' | 'meeting' | 'personal';
  completed: boolean;
  status: 'todo' | 'in-progress' | 'review' | 'completed';

}   

export interface TaskColumn {
    id: any;
    title: string;
    tasks: Task[];
}
export interface StageTodo {
  name: string;
  stageNumber: number;
  color: string;
bgColor?: string;
  icon: string; 
    tasks?: Task[] ;

}
