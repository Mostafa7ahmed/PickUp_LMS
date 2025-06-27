
export interface IStudentProfile {
  id: number;
  studentId: number;
  name: string;
  photo: string;
  email: string;
  bio?: string;
  instagram?: string;
  twitter?: string;
  linkedIn?: string;
}

export interface IUpdateStudentProfile {
  name?: string;
  bio?: string;
  instagram?: string;
  twitter?: string;
  linkedIn?: string;
  photo?: string;
} 