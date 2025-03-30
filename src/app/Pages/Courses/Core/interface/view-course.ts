export interface ViewCourse {

    id: number
    photoUrl: string
    name: string
    description: string
    actualPrice: number
    hasDiscount: boolean
    priceAfterDiscount: number
    files: File[]
    topic: Topic
    stage: Stage
    discount: Discount
    customFields: CustomField[]
    tags: Tag[]
}

export interface File {
id: number
url: string
name: string
type: number
size: number
extension: string
}

export interface Topic {
id: number
name: string
color: string
icon: string
}

export interface Stage {
id: number
name: string
color: string
shadow: string
}

export interface Discount {
amount: number
type: number
}

export interface CustomField {
id: number
customFieldId: number
value: string
visible: boolean
key: string
}

export interface Tag {
id: number
name: string
}
