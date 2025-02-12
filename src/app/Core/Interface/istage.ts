export interface IStage {
    id: number
    instructorId: number
    creatorId: number
    updaterId: any
    name: string
    description: string
    color: string
    icon: string
    order: number
    default: boolean
    snapshot: any
    createdOn: string
    updatedOn: any
    creator: any
    updater: any
    stages: Stage[]
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
    snapshot: any
  }