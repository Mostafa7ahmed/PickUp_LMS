export interface ITopicListResult {
    Result:ItopicList[] 

}

export interface ItopicList {
    id: number
    name: string
    color: string
    icon: string
    order: number
    default: boolean
    stages: Stage[]
}
export interface Stage {
    id: number
    order: number
    name: string
    color: string
    icon: string
    shadow: string
    type: number
  }
  