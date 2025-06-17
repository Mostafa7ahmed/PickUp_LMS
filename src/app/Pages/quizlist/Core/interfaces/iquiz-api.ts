// Quiz Duration Type Enum
export enum QuizDurationType {
  minute = 0,
  Hours = 1
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
  difficulty: number; // 1 = Easy, 2 = Medium, 3 = Hard
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
    createdOn: string;
  };
}

// Quiz Section Request Interface
export interface ICreateQuizSectionRequest {
  quizId: number;
  order: number;
  name: string;
  type: number;
}

// Quiz Section Response Interface
export interface ICreateQuizSectionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: {
    id: number;
    quizId: number;
    order: number;
    name: string;
    type: number;
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
  type: QuestionType;
  trueAndFalse?: ITrueFalseAnswer;
  shortAnswer?: IShortAnswer;
  multipleChoise?: IMultipleChoiceOption[];
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
    type: QuestionType;
    createdOn: string;
  };
}

// Bulk Question Creation Request Interface
export interface IBulkQuestionRequest {
  questions: ICreateQuestionRequest[];
}

// Bulk Question Creation Response Interface
export interface IBulkQuestionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: ICreateQuestionResponse[];
}

// Delete Question Response Interface
export interface IDeleteQuestionResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// Complete Quiz Creation Request (for the component)
export interface ICompleteQuizCreationRequest {
  courseId: number;
  lessonIds: number[];
  name: string;
  description: string;
  limited: boolean;
  quizDuration: IQuizDuration;
  difficulty: number; // 1 = Easy, 2 = Medium, 3 = Hard
  questions: ICreateQuestionRequest[];
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

// New interfaces for the API endpoints

// Quiz Detail Response Interface
export interface IQuizDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: {
    id: number;
    instructorId: number;
    creatorId: number;
    courseId: number;
    name: string;
    description: string;
    difficulty: number;
    updaterId: number;
    createdOn: string;
    updatedOn: string;
    limited: boolean;
    questionsCount: number;
    courseName: string;
    lessonsNames: string[];
    duration: number;
    submissions: number;
  };
}

// Quiz Item Interface (for pagination results)
export interface IQuizItem {
  instructorId: number;
  creatorId: number;
  courseId: number;
  name: string;
  description: string;
  difficulty: number; // 1 = Easy, 2 = Medium, 3 = Hard
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

// Quiz Pagination Response Interface
export interface IQuizPaginationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: IQuizItem[];
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
  result?: {
    totalQuizzes: number;
    totalQuestions: number;
    avgDuration: number;
    easyCount: number;
    mediumCount: number;
    hardCount: number;
  };
}