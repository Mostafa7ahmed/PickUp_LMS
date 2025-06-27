export interface IcourseStudent {
  courseProgressPercentage: number
  name: any
  description: any
  id: number
  photo: string
  instructor: Instructor
  lessonsCount: number
  totalDuration: number
  rating: number
  progressStatus: number
  topicName: string
}

export interface Instructor {
  id: number
  roleId: number
  name: string
  userName: any
  email: any
  phoneNumber: any
  photo: string
}

export interface IDicoverCourse {
   id: number;
  title: string;
  instructor: string;
  description: string;
  image: string;
  discount: number;
instructorPhoto: string;
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