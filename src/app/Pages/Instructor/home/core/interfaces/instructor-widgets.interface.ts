export interface InstructorWidgetsResponse {
  success: boolean;
  statusCode: number;
  message: string | null;
  result: InstructorWidgets;
}

export interface InstructorWidgets {
  totalStudents: number;
  activeCourses: number;
  totalRevenue: number;
  averageRating: number;
}

export interface WidgetCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
} 