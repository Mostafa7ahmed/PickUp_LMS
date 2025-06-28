export interface User {
    name: string;
    userName: string;
    email: string;
    phoneNumber: string;
    type: number;
    preferredLanguage: number;
    countryId: number;
    languageId: number;
    password: string;
    confirmedPassword: string;
}

export interface validate {
    type: number
    value: string
  }
  

  export interface Decode {
    UserId:string;
    roles: string;
    UserType:userType;
    InstructorId:string;
    photo:string;
    Email:string;
    UserName:string ;
    PhoneNumber:string;
    

}

  export enum userType {
    Instructor,
    Student
  }