export interface ITopRatedInstructor {
  id: number;
  name: string;
  photo: string;
  bio: string | null;
  coursesCount: number;
  averageRatings: number;
}

export interface ITopRatedInstructorsResponse {
  success: boolean;
  statusCode: number;
  message: string | null;
  result: ITopRatedInstructor[];
}

// Helper interface for display purposes
export interface IInstructorDisplay {
  id: number;
  initials: string;
  name: string;
  subject: string;
  rating: number;
  courses: number;
  bgColor: string;
  photo: string;
  bio: string;
} 