import { publicDecrypt } from "crypto"

export interface ICreateCourseRequest {
  topicId: number
  stageId: number
  name: string
  price: number
  free: boolean
  description?: string | null
  photoUrl?: string | null
  introductionVideoUrl?: string | null
  fileUrls: string[]
  tags: NewTagRequest[]
  customFields: NewCustomFieldRequest[]
  discount?: Discount
}

export interface NewTagRequest {
  id?: number | null
  name: string
}

export interface NewCustomFieldRequest {
  id?: number | null
  key: string
  value?: string
  usage?: any | null;
  visible: boolean
}

export interface Discount {
  type: number
  amount: number
}


export interface ICreateCourseResponse {

}
