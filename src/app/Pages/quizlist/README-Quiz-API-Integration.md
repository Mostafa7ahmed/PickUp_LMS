# Quiz API Integration Documentation

## Overview

The quiz creation functionality has been integrated with the backend API using a 3-step workflow as specified in the API documentation.

## API Endpoints Used

### 1. Create Quiz
- **Endpoint**: `POST /pickup-lms/api/v1/quiz/create`
- **Purpose**: Creates the main quiz entity
- **Request Body**:
```json
{
  "courseId": 0,
  "lessonIds": [0],
  "name": "string",
  "description": "string",
  "limited": true,
  "quizDuration": {
    "duration": 0,
    "type": 0
  }
}
```

### 2. Create Quiz Section
- **Endpoint**: `POST /pickup-lms/api/v1/quiz-section/create`
- **Purpose**: Creates a section within the quiz to organize questions
- **Request Body**:
```json
{
  "quizId": 0,
  "name": "string",
  "description": "string",
  "order": 1
}
```

### 3. Create Questions
- **Endpoint**: `POST /pickup-lms/api/v1/question/create`
- **Purpose**: Creates individual questions within the quiz section
- **Request Body**:
```json
{
  "courseId": 0,
  "quizId": 0,
  "quizSectionId": 0,
  "order": 0,
  "hint": "string",
  "text": "string",
  "type": 0,
  "trueAndFalse": {
    "answer": true
  },
  "shortAnswer": {
    "answer": "string"
  },
  "multipleChoise": [
    {
      "answer": "string",
      "correct": true
    }
  ]
}
```

## Quiz Duration Types

```typescript
public enum QuizDurationType {
  minute = 0,
  Hours = 1
}
```

## Question Types

```typescript
export enum QuestionType {
  TrueFalse = 0,
  ShortAnswer = 1,
  MultipleChoice = 2
}
```

## Implementation Details

### Files Created/Modified

1. **`src/app/Pages/quizlist/Core/interfaces/iquiz-api.ts`**
   - Contains all TypeScript interfaces for API requests and responses
   - Defines enums for QuizDurationType and QuestionType

2. **`src/app/Pages/quizlist/Core/services/quiz-api.service.ts`**
   - Handles the 3-step quiz creation workflow
   - Provides progress tracking via Observable
   - Includes error handling and logging

3. **`src/app/Pages/quizlist/Components/addquizlist/addquizlist.component.ts`**
   - Updated to use the new API service instead of localStorage
   - Added progress tracking and loading states
   - Enhanced error handling with user-friendly messages

4. **`src/app/Pages/quizlist/Components/addquizlist/addquizlist.component.html`**
   - Added progress indicator during quiz creation
   - Updated save button to show loading state
   - Disabled save button during creation process

### Workflow Process

1. **User fills out quiz form** (title, description, course selection, questions)
2. **Validation** ensures all required fields are filled
3. **API calls are made in sequence**:
   - Step 1: Create quiz entity
   - Step 2: Create quiz section
   - Step 3: Create all questions in batch
4. **Progress is tracked** and displayed to user
5. **Success/error feedback** is provided

### Progress Tracking

The service provides real-time progress updates through an Observable:

```typescript
// Subscribe to progress updates
this.quizApiService.progress$.subscribe(progress => {
  console.log('Current step:', progress.step);
  console.log('Completed questions:', progress.completedQuestions);
  console.log('Total questions:', progress.totalQuestions);
});
```

### Error Handling

- Network errors are caught and displayed to user
- Validation errors prevent API calls
- Progress is reset on errors
- User-friendly error messages are shown

## Usage Example

```typescript
// Create complete quiz with questions
const quizRequest: ICompleteQuizCreationRequest = {
  courseId: 123,
  lessonIds: [456],
  name: "JavaScript Basics Quiz",
  description: "Test your JavaScript knowledge",
  limited: true,
  quizDuration: {
    duration: 30,
    type: QuizDurationType.minute
  },
  questions: [
    {
      courseId: 123,
      quizId: 0, // Will be set by service
      quizSectionId: 0, // Will be set by service
      order: 1,
      text: "JavaScript is a compiled language",
      type: QuestionType.TrueFalse,
      trueAndFalse: { answer: false }
    }
  ]
};

this.quizApiService.createCompleteQuiz(quizRequest).subscribe({
  next: (response) => console.log('Quiz created!', response),
  error: (error) => console.error('Failed to create quiz:', error)
});
```

## Testing

To test the integration:

1. Navigate to the quiz creation page
2. Select a course
3. Enter quiz details (title, description, duration)
4. Add questions of different types
5. Click "Save Quiz"
6. Monitor the progress indicator
7. Verify success/error messages

## Notes

- The implementation follows the exact API specification provided
- All API calls include proper error handling
- Progress tracking provides real-time feedback
- The UI is disabled during creation to prevent multiple submissions
- Questions are validated before API calls are made
