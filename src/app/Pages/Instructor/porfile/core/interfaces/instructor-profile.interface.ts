export interface IInstructorProfile {
  id: number;
  instructorId: number;
  name: string;
  photo: string;
  email: string;
  instagram: string;
  twitter: string;
  linkedIn: string;
}

export interface IUpdateInstructorProfile {
  name: string;
  instagram: string;
  twitter: string;
  linkedIn: string;
  photo: string;
}
