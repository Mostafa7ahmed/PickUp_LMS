export interface IAddStage {
    topicId: number
    stages: Stage[]
  }
  
  export interface Stage {
    name: string
    color: string
    icon: string
    order: number
    shadow: string
  }
  