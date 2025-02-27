import { IResponseOf } from "../../../../Core/Shared/Interface/irespose"
export interface IKanbanResponse {
    topic: ITopicKanbaResult
}

export interface ITopicKanbaResult {
    topicId: number
    instructorId: number
    icon: string
    color: string
    default: boolean
    name: string
    description: string
    order: number
    stages: IStageKanban[]
}

export interface IStageKanban {
    stageId: number
    name: string
    color: string
    icon: string
    shadow: any
    default: boolean
    totalPrice: number
    coursesCount: number
    courses: ICourseKanban[]
}

export interface ICourseKanban  {
    courseId: number
    name: string
    creatorId: number
    totalProfit: number
    lessonseCount: number
    rating: number
    numberOfUnReadedMessages: number
    enrollmentsCount: number
    studentsCompletedCourse: number
    price: number
    createdOn: Date
    creator:Creator
    likesCount: number
}

export interface Creator {
    id: number
    name: string
    photo: string
  }