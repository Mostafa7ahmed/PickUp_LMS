export interface ITopic{
  id: number;
  instructorId: number;
  creatorId: number;
  updaterId: number;
  name: string;
  color: string;
  icon: string;
  order: number;
  default: boolean;
  snapshot: SnapshotTopic;
  createdOn: string;
  updatedOn: string;
  creator: Creator;
  updater: Updater;
  stages: Stage[];
  description: string;


}

export interface SnapshotTopic {
  totalPrice: number
  hasCourses: boolean
}

export interface Creator {
  id: number
  name: string
  photo: string
}

export interface Updater {
  id: number
  name: string
  photo: string
}

export interface Stage {
  id: number
  instructorId: number
  name: string
  order: number
  color: string
  icon: string
  type: number
  createdOn: string
  default: boolean
  snapshot: SnapshotStage
}

export interface SnapshotStage {
  totalPrice: number
  hasCourses: boolean
  coursesCount: number
}
