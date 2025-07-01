// New Quiz API Interfaces - Based on actual API responses

// Quiz Duration Type Enum (from API)
export enum QuizDurationType {
  Minutes = 0,
  Hours = 1
}

// Quiz Difficulty Enum (from API)
export enum QuizDifficulty {
  Hard = 0,
  Medium = 1,
  Easy = 2
}

// Quiz Section Type Enum (from API response)
export enum QuizSectionType {
  MultipleChoice = 0,
  TrueFalse = 1,
  ShortAnswer = 2
}

// ===== Quiz Creation =====

export interface IQuizDuration {
  duration: number;
  type: QuizDurationType;
}

export interface ICreateQuizRequest {
  courseId: number;
  lessonIds: number[];
  name: string;
  description: string;
  limited: boolean;
  quizDuration: IQuizDuration;
  difficulty: QuizDifficulty;
}

export interface IQuizCreationResult {
  id: number;
  creatorId: number;
  courseId: number;
  name: string;
  description: string;
  difficulty: number;
  createdOn: string;
  updatedOn: string | null;
  limited: boolean;
  quizDuration: IQuizDuration;
}

export interface ICreateQuizResponse {
  success: boolean;
  statusCode: number;
  message: string | null;
  result: IQuizCreationResult;
}

// ===== Quiz Sections (from get quiz API) =====

export interface IQuizSection {
  id: number;
  quizId: number;
  order: number;
  name: string;
  type: QuizSectionType;
  creatorId: number;
  createdOn: string;
  updatedOn: string | null;
  questions: IQuizQuestion[];
}

export interface IQuizQuestion {
  quizSectionId: number;
  hint: string;
  text: string;
  order: number;
  creatorId: number;
  updaterId?: number | null;
  updatedOn: string | null;
  createdOn: string;
  multipleChoiceQuestionAnswers: IMultipleChoiceOption[];
  trueAndFalseAnswer?: ITrueFalseAnswer | null;
  shortQuestionAnswer?: IShortAnswer | null;
}

// ===== Get Quiz Response =====

export interface IQuizDetails {
  id: number;
  creatorId: number;
  courseId: number;
  name: string;
  description: string;
  difficulty: number;
  createdOn: string;
  updatedOn: string | null;
  limited: boolean;
  quizDuration: IQuizDuration;
  quizSections: IQuizSection[];
}

export interface IGetQuizResponse {
  success: boolean;
  statusCode: number;
  message: string | null;
  result: IQuizDetails;
}

// ===== Question Creation =====

export interface IMultipleChoiceOption {
  answer: string;
  correct: boolean;
}

export interface IShortAnswer {
  answer: string;
}

export interface ITrueFalseAnswer {
  answer: boolean;
}

export interface ICreateQuestionRequest {
  courseId: number;
  quizId: number;
  quizSectionId: number;
  order: number;
  hint?: string;
  text: string;
  multipleChoise?: IMultipleChoiceOption[] | null;
  shortAnswer?: IShortAnswer | null;
  trueAndFalse?: ITrueFalseAnswer | null;
}

export interface IBulkCreateQuestionsRequest {
  questions: ICreateQuestionRequest[];
}

export interface ICreateQuestionResult {
  id: number;
  courseId: number;
  quizId: number;
  quizSectionId: number;
  order: number;
  hint: string;
  text: string;
  createdOn: string;
}

export interface IBulkCreateQuestionsResponse {
  success: boolean;
  statusCode: number;
  message: string | null;
  result: ICreateQuestionResult[];
}

// ===== Form Data Interfaces =====

export interface IQuizFormData {
  courseId: number;
  lessonIds: number[];
  name: string;
  description: string;
  limited: boolean;
  duration: number;
  durationType: QuizDurationType;
  difficulty: QuizDifficulty;
}

export interface IQuestionFormData {
  type: QuizSectionType;
  text: string;
  hint?: string;
  options?: string[];
  correctAnswer?: any;
  order: number;
}

// ===== Progress Tracking =====

export interface IQuizCreationProgress {
  step: 'quiz' | 'sections' | 'questions' | 'completed';
  quizId?: number;
  sectionIds?: number[];
  completedQuestions?: number;
  totalQuestions?: number;
  error?: string;
  currentSection?: QuizSectionType;
} 