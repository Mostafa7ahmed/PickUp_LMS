export interface IUpdateTopic {
    id: number
    name: string
    color: string
    icon: string
    description: string
    isMain: boolean
    mainId: string | null
}
