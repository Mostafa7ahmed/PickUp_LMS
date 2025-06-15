export interface Icourses {
    result: CourseResult[]

    
}

  
  export interface CourseResult {
    id: number
    instructorId: number
    creatorId: number
    updaterId: number
    name: string
    description: string
    photoUrl: string
    quizzesCount: number
    studentsCount: number
    lessonssCount: number
    free: boolean
    rating: number
    createdOn: string
    updatedOn: string
    profit: number
    coupons: number

    videos: number

    duration: number
    price: number
    priceAfterDiscount: number
    discount: Discount
    creator: Creator
    updater: Updater
    stage: Stage
  }
  export interface ListCourse{
    photoUrl: string;
    id: number;
    name: string;
    price: number;
    enrollmentCount: number;
    couponsCount: number;
    createdOn: string;
    topic: {
      id: number;
      instructorId: number;
      creatorId: number;
      updaterId: number;
      name: string;
      description: string;
      color: string;
      icon: string;
      order: number;
      default: boolean;
      mainId: number;
      isMain: boolean;
      snapshot: {
        totalPrice: number;
        hasCourses: boolean;
        coursesCount: number;
      };
      createdOn: string;
      updatedOn: string;
      creator: {
        id: number;
        name: string;
        photo: string;
      };
      updater: {
        id: number;
        name: string;
        photo: string;
      };
      stages: {
        id: number;
        topicId: number;
        instructorId: number;
        name: string;
        order: number;
        color: string;
        icon: string;
        shadow: string;
        type: number;
        createdOn: string;
        default: boolean;
        snapshot: {
          id: number;
          totalPrice: number;
          hasCourses: boolean;
          coursesCount: number;
        };
        courses: {
          id: number;
          instructorId: number;
          name: string;
          description: string;
          createdOn: string;
          photoUrl: string;
          free: boolean;
          price: number;
          introductionVideoUrl: string;
          discount: {
            amount: number;
            type: number;
          };
          fileIds: string[];
        }[];
      }[];
    };
    lessonsCount: number;
    totalDuration: number;
    rating: number;
    description?: string;
  }
  export interface Discount {
    amount: number
    type: number
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
    topicId: number
    instructorId: number
    name: string
    order: number
    color: string
    icon: string
    type: number
    createdOn: string
    default: boolean
    snapshot: Snapshot
  courses: Course[]
}

export interface Course {
  id: number
  instructorId: number
  name: string
  description: any
  createdOn: string
  photoUrl: string
  free: boolean
  price: number
  introductionVideoUrl: any
  discount: any
  fileIds: any[]
}

  export interface Snapshot {
    id: number
    totalPrice: number
    hasCourses: boolean
    coursesCount: number
  }
