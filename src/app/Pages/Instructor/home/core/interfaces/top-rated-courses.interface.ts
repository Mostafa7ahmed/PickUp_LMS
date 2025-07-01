export interface ITopRatedCourse {
  id: number;
  name: string;
  description: string;
  photo: string;
  topic: {
    id: number;
    instructorId: number;
    creatorId: number;
    updaterId: number | null;
    name: string;
    description: string | null;
    color: string;
    icon: string;
    order: number;
    default: boolean;
    mainId: number | null;
    isMain: boolean;
    snapshot: string | null;
    createdOn: string;
    updatedOn: string | null;
    creator: any | null;
    updater: any | null;
    stages: any[];
  };
  stage: {
    id: number;
    topicId: number;
    instructorId: number;
    name: string;
    order: number;
    color: string;
    icon: string;
    shadow: string | null;
    type: number;
    createdOn: string;
    default: boolean;
    snapshot: string | null;
    courses: any[];
  };
  enrolledStudentsCount: number;
  rating: number;
  revenue: number;
}

export interface ITopRatedCoursesResponse {
  success: boolean;
  statusCode: number;
  message: string | null;
  result: ITopRatedCourse[];
} 