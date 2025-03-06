export interface ITopic {
       result: TopicResult[]
   
  }
  export interface TopicResult {
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
    snapshot: Snapshot2
    topicId:number
  
  }
  
  export interface Snapshot2 {
    totalPrice: number
    hasCourses: boolean
    coursesCount: number
  }
  