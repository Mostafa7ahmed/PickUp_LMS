export interface IStage {
    id: number
    topicId: number
    instructorId: number
    name: string
    order: number
    color: string
    icon: string
    shadow: string
    type: number
    createdOn: string
    default: boolean
    snapshot: Snapshot
    courses: Course[]
  }
  
  export interface Snapshot {
    id: number
    totalPrice: number
    hasCourses: boolean
    coursesCount: number
  }
  
  export interface Course {
    id: number
    instructorId: number
    name: string
    description: string
    createdOn: string
    photoUrl: string
    free: boolean
    price: number
    introductionVideoUrl: string
    discount: Discount
    fileIds: string[]
  }
  
  export interface Discount {
    amount: number
    type: number
  }
  