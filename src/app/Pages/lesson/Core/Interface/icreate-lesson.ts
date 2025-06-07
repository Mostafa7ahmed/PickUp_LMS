export interface ICreateLessonRequest {
  courseId: number;
  name: string;
  description: string;
  photoUrl: string;
  introductionVideoUrl: string;
  fileUrls: string[];
  videos: ILessonVideo[];
  tags: {
    id: number;
    name: string;
  }[];
}

export interface ILessonTag {
  id: number;
  name: string;
}

export interface ILessonVideo {
  id: number;
  videoUrl: string;
  displayUrl?: string; // For UI display with baseUrlFiles
  free: boolean;
  name: string;
}

export interface ILessonFile {
  name: string;
  url: string;
  displayUrl: string; // For UI display with baseUrlFiles
  size: number;
}
