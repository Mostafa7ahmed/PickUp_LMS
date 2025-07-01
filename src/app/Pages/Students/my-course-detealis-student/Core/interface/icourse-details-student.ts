export interface ICourseDetailsStudent {
  id: number;
  name: string;
  description: string;
  introductionVideoUrl: string;
  createdOn: string;
  instructor: {
    id: number;
    name: string;
    photo: string;
  };
  lessons: {
    id: number;
    name: string;
  }[];
  quizzes: {
    id: number;
    name: string;
    questionsCount: number;
    lessons: {
      id: number;
      name: string;
    }[];
    duration: number;
    attemps: number;
    createdOn: string;
  }[];
  ratings: {
    id: number;
    value: number;
    note: string;
    creator: {
      id: number;
      name: string;
      photo: string;
    };
  }[];
}

export interface ICourseDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: ICourseDetailsStudent;
}

export enum CourseTab {
  Overview = 'overview',
  Review = 'review',
  Lesson = "lesson",
  Quiz = "Quiz"
}