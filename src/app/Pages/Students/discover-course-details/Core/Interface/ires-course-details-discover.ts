export interface IResCourseDetailsDiscover {
  id: number
  name: string
  introductionVideo: string
  photo: string
  description: string
  rating: number
  updatedOn: string
  enrolledCount: number
  instructor: Instructor
  ratings: Rating[]
}

export interface Instructor {
  id: number
  userId: number
  name: string
  bio: string
  photo: string
  rating: number
}

export interface Rating {
  id: number
  value: number
  note: string
  createdOn: string
  student: Student
}

export interface Student {
  id: number
  userId: number
  name: string
  bio: string
  photo: string
  rating: number
}
