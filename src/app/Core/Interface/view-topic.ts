
export interface ViewTopic {
    success: boolean
    statusCode: number
    message: string
    result: Result
  }
  
  export interface Result {
    id: number
    instructorId: number
    creatorId: number
    updaterId: number
    name: string
    description: string
    color: string
    icon: string
    order: number
    default: boolean
    snapshot: Snapshot
    createdOn: string
    updatedOn: string
    creator: Creator
    updater: Updater
    stages: Stage[]
  }
  
  export interface Snapshot {
    totalPrice: number
    hasCourses: boolean
    coursesCount: number
  }
  
  export interface Creator {
    id: number
    name: string
    photo: string
  }
  
  export interface Updater {
    id: number
    name: string
    photo: string
  }
  
  export interface Stage {
    id: number
    topicId: number
    instructorId: number
    name: string
    order: number
    color: string
    icon: string
    type: number
    createdOn: string
    default: boolean
    snapshot: Snapshot2
  }
  
  export interface Snapshot2 {
    totalPrice: number
    hasCourses: boolean
    coursesCount: number
  }
  