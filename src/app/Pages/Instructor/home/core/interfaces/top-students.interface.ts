export interface ITopStudent {
  id: number;
  name: string;
  photo: string;
  completedCourses: number;
}

export interface ITopStudentsResponse {
  success: boolean;
  statusCode: number;
  message: string | null;
  result: ITopStudent[];
}

// Helper interface for display purposes
export interface IStudentDisplay {
  id: number;
  initials: string;
  name: string;
  completed: number;
  title: string;
  score: string;
  bgColor: string;
  photo: string;
} 