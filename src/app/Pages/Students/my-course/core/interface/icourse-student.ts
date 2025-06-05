export interface IcourseStudent {
      id: number;
  title: string;
  instructor: string;
  description: string;
  image: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  rating: number;
  category: string;
  enrolledDate: Date;
  lastAccessed: Date;
}

export interface IDicoverCourse {
     id: number;
  title: string;
  instructor: string;
  description: string;
  image: string;
  discount: number;

  totalLessons: number;
  completedLessons: number;
  duration: string;
  rating: number;
  price : number;
  originalPrice: number;
  category: string;
  enrolledDate: Date;
  lastAccessed: Date;
}