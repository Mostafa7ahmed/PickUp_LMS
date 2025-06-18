export interface ILessonDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: ILessonDetail;
}

export interface ILessonDetail {
  id: number;
  instructorId: number;
  name: string;
  introductionVideoUrl: string;
  description: string;
  order: number;
  createdOn: string;
  videos: ILessonDetailVideo[];
  tags: ILessonDetailTag[];
}

export interface ILessonDetailVideo {
  id: number;
  instructorId: number;
  lessonId: number;
  languageId: number;
  url: string;
  createdOn: string;
  streamMetaDataId: number;
  name: string;
  free: boolean;
  order: number;
  creatorId: number;
  durationInSeconds: number;
  deleterId: number;
  deletedOn: string;
  deleted: boolean;
}

export interface ILessonDetailTag {
  id: number;
  instructorId: number;
  name: string;
  createdOn: string;
}
