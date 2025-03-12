export interface ICreateCourse {

    topicId: number
    stageId: number
    languageId: number
    name: string
    price: number
    free: boolean
    description: string
    photoUrl: string
    introductionVideoUrl: string
    fileUrls: string[]
    tags: Tag[]
    customFields: CustomField[]
    discount: Discount
  }
  
  export interface Tag {
    id: number
    name: string
  }
  
  export interface CustomField {
    id: number
    key: string
    value: string
    visible: boolean
  }
  
  export interface Discount {
    type: number
    amount: number
  }
  