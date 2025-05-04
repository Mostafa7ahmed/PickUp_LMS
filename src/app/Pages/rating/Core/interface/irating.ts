
  export interface ReviewsByDate {
    date: string
    ratings: Rating[]
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
    name: string
    email: string
    photoUrl: string
  }
  