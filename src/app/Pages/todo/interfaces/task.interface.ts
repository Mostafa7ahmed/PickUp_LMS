export interface Task {
    id: any;
    title: string;
    description: string;
    priority: string;
    priorityClass: string;
    image?: string;
    date: Date;
    comments: number;
    views: number;
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
}
