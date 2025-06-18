export interface IQuiz {
      instructorId: number
  creatorId: number
  courseId: number
  name: string
  description: string
  difficulty: number
  updaterId: number
  createdOn: string
  updatedOn: string
  limited: boolean
  questionsCount: number
  courseName: string
  lessonsNames: string[]
  duration: number
  submissions: number
}
