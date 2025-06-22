<<<<<<< HEAD
=======
import { ListCourse } from '../../../../Courses/Core/interface/icourses';

>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
export interface IInstructorProfile {
  id: number;
  instructorId: number;
  name: string;
  photo: string;
  email: string;
  instagram: string;
  twitter: string;
  linkedIn: string;
<<<<<<< HEAD
=======
  bio: string;
}

export interface IInstructorProfileWithCourses extends IInstructorProfile {
  courses?: ListCourse[];
  totalCourses?: number;
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
}

export interface IUpdateInstructorProfile {
  name: string;
  instagram: string;
  twitter: string;
  linkedIn: string;
  photo: string;
<<<<<<< HEAD
=======
  bio: string;

>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
}
