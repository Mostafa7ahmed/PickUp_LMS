export interface ILessonRes {

  id: number
  instructorId: number
  name: string
  introductionVideoUrl: string
  description: string
  order: number
  createdOn: string
  videos: Video[]
  tags: Tag[]
}

export interface Video {
  id: number
  instructorId: number
  lessonId: number
  languageId: number
  url: string
  createdOn: string
  streamMetaDataId: number
  name: string
  free: boolean
  order: number
  creatorId: number
  durationInSeconds: number
  deleterId: number
  deletedOn: string
  deleted: boolean
}

export interface Tag {
  id: number
  instructorId: number
  name: string
  createdOn: string
}
