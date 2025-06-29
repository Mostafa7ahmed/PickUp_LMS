export interface IQuiz {
  id:number
      instructorId: number
  creatorId: number
  courseId: number
  name: string
  description: string
  difficulty: number
  updaterId: number
  createdOn: string
  updatedOn: string
  limited: boolean
  questionsCount: number
  courseName: string
  lessonsNames: string[]
  duration: number
  submissions: number
}

// This file will be replaced with new quiz API interfaces

// Quiz Duration Type Enum
export enum QuizDurationType {
  minute = 0,
  Hours = 1
}

// Quiz Difficulty Enum
export enum QuizDifficulty {
  Easy =2,
  Medium = 1,
  Hard = 0
}

// Quiz Section Type Enum (3 types as mentioned)
export enum QuizSectionType {
  Introduction = 1,    // Introductory questions
  Main = 2,           // Main content questions
  Assessment = 3      // Final assessment questions
}

// Quiz Question Interface
export interface QuizQuestion {
  id: number;
  type: 'true-false' | 'multiple-choice' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: any;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  order: number;
}

// Quiz Interface
export interface Quiz {
  id: number;
  title: string;
  description: string;
  questionsCount: number;
  duration: number;
  attempts: number;
  status: 'published' | 'draft' | 'scheduled';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  createdDate: string;
  courseId?: number;
  courseName?: string;
  lessonId?: number;
  lessonName?: string;
  questions?: QuizQuestion[];
}

// Quiz Duration Interface
export interface IQuizDuration {
  duration: number;
  type: QuizDurationType;
}

// Create Quiz Request Interface
export interface ICreateQuizRequest {
  courseId: number;
  lessonIds: number[];
  name: string;
  description: string;
  limited: boolean;
  quizDuration: IQuizDuration;
  difficulty: QuizDifficulty;
}

// Create Quiz Response Interface
export interface ICreateQuizResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: {
    id: number;
    courseId: number;
    name: string;
    description: string;
    limited: boolean;
    quizDuration: IQuizDuration;
    difficulty: QuizDifficulty;
    createdOn: string;
  };
}

// Question Type Enum
export enum QuestionType {
  TrueFalse = 0,
  ShortAnswer = 1,
  MultipleChoice = 2
}

// True/False Answer Interface
export interface ITrueFalseAnswer {
  answer: boolean;
}

// Short Answer Interface
export interface IShortAnswer {
  answer: string;
}

// Multiple Choice Option Interface
export interface IMultipleChoiceOption {
  answer: string;
  correct: boolean;
}

// Create Question Request Interface
export interface ICreateQuestionRequest {
  courseId: number;
  quizId: number;
  quizSectionId: number;
  order: number;
  hint?: string;
  text: string;
  multipleChoise?: IMultipleChoiceOption[];
  shortAnswer?: IShortAnswer;
  trueAndFalse?: ITrueFalseAnswer;
}

// Create Question Response Interface
export interface ICreateQuestionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: {
    id: number;
    courseId: number;
    quizId: number;
    quizSectionId: number;
    order: number;
    hint: string;
    text: string;
    createdOn: string;
  };
}

// Bulk Create Questions Request Interface
export interface IBulkCreateQuestionsRequest {
  questions: ICreateQuestionRequest[];
}

// Bulk Create Questions Response Interface
export interface IBulkCreateQuestionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: ICreateQuestionResponse[];
}

// Quiz Section Interface
export interface ICreateQuizSectionRequest {
  quizId: number;
  name: string;
  description: string;
  order: number;
  type?: QuizSectionType; // Optional section type
}

// Quiz Section Response Interface
export interface ICreateQuizSectionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: {
    id: number;
    quizId: number;
    name: string;
    description: string;
    order: number;
    createdOn: string;
  };
}

// Quiz Get Response Interface
export interface IGetQuizResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: IQuizDetails;
}

// Quiz Details Interface
export interface IQuizDetails {
  id: number;
  instructorId: number;
  creatorId: number;
  courseId: number;
  name: string;
  description: string;
  difficulty: QuizDifficulty;
  updaterId: number;
  createdOn: string;
  updatedOn: string;
  limited: boolean;
  questionsCount: number;
  courseName: string;
  lessonsNames: string[];
  duration: number;
  submissions: number;
}

// Quiz Pagination Request Interface
export interface IQuizPaginationRequest {
  courseId?: number;
  pageNumber?: number;
  pageSize?: number;
  orderBeforPagination?: boolean;
  orderDirection?: number;
}

// Quiz Pagination Response Interface
export interface IQuizPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: IQuizDetails[];
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  count: number;
  totalPages: number;
  moveNext: boolean;
  movePrevious: boolean;
}

// Quiz Widget Response Interface
export interface IQuizWidgetResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: IQuizWidget[];
}

// Quiz Widget Interface
export interface IQuizWidget {
  id: number;
  name: string;
  courseName: string;
  difficulty: QuizDifficulty;
  questionsCount: number;
  duration: number;
  submissions: number;
  createdOn: string;
}

// Quiz Delete Response Interface
export interface IDeleteQuizResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// Quiz Creation Progress Interface
export interface IQuizCreationProgress {
  step: 'quiz' | 'section' | 'questions' | 'completed';
  quizId?: number;
  sectionId?: number;
  completedQuestions?: number;
  totalQuestions?: number;
  error?: string;
}

// Complete Quiz Creation Request Interface
export interface ICompleteQuizCreationRequest {
  courseId: number;
  lessonIds: number[];
  name: string;
  description: string;
  limited: boolean;
  quizDuration: IQuizDuration;
  difficulty: QuizDifficulty;
  questions: ICreateQuestionRequest[];
}
