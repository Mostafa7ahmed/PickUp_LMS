export interface ITopic {
    id: number
    instructorId: number
    creatorId: number
    updaterId: any
    name: string
    color: string
    icon: string
    order: number
    default: boolean
    snapshot: SnapshotTopic
    createdOn: string
    updatedOn: any
    creator: Creator
    updater: any
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
  
  export interface Stage {
    id: number
    instructorId: number
    name: string
    order: number
    color: string
    icon: string
    createdOn: string
    default: boolean
    snapshot: SnapshotStage
  }
  
  export interface SnapshotStage {
    totalPrice: number
    hasCourses: boolean
    coursesCount: number
  }
  