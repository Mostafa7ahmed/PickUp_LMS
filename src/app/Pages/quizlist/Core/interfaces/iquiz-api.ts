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
  name: string;
  description?: string;
  order: number;
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

// Complete Quiz Creation Request (for the component)
export interface ICompleteQuizCreationRequest {
  courseId: number;
  lessonIds: number[];
  name: string;
  description: string;
  limited: boolean;
  quizDuration: IQuizDuration;
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
