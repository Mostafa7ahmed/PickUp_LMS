export interface ITopic {
      success: boolean
      statusCode: number
      message: string
      pageSize: number
      pageIndex: number
      totalCount: number
      count: number
      totalPages: number
      moveNext: boolean
      movePrevious: boolean
      result: Result[]
}
export interface IViewTopic {
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
  snapshot: SnapshotTopic
  createdOn: string
  updatedOn: string
  creator: Creator
  updater: Updater
  stages: Stage[]
}

export interface SnapshotTopic {
    totalPrice: number
    hasCourses: boolean
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
    instructorId: number
    name: string
    order: number
    color: string
    icon: string
    type: number
    createdOn: string
    default: boolean
    snapshot: SnapshotStage
    topicId:number
  
  }
  
  export interface SnapshotStage {
    totalPrice: number
    hasCourses: boolean
    coursesCount: number
  }
  


