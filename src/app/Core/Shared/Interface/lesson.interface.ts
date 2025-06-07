export interface ILesson {
  id: number;
  name: string;
  order: number;
  videosCount: number;
  durationInMinutes: number;
  viewsCount: number;
}

export interface ILessonDetail {
  id: number;
  instructorId: number;
  name: string;
  description: string;
  order: number;
  createdOn: string;
}

export interface ILessonDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: ILessonDetail;
}

export interface IApiError {
  statusCode: number;
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export interface ILessonListRequest {
  courseId: number;
  pageNumber: number;
  pageSize: number;
  orderBeforPagination: boolean;
  orderDirection: OrderDirection;
}

export interface ILessonListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: ILesson[];
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  count: number;
  totalPages: number;
  moveNext: boolean;
  movePrevious: boolean;
}

export enum OrderDirection {
  Ascending = 0,
  Descending = 1
}

export interface IPaginationInfo {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  count: number;
  totalPages: number;
  moveNext: boolean;
  movePrevious: boolean;
}
