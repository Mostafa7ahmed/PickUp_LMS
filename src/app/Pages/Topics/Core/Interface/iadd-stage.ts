export interface IAddStage {
    topicId: number
    newStages: NewStage[]
    updatedStages: UpdatedStage[]
  }

  export interface NewStage {
    name: string
    color: string
    icon: string
    order: number
    shadow: string
  }

  export interface UpdatedStage {
    id: number
    name: string
    color: string
    icon: string
    shadow: string
    order: number
  }

  // Legacy interface for backward compatibility
  export interface IAddStageLegacy {
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
  