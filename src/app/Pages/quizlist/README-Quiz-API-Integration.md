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

### 4. Get Quiz by ID
- **Endpoint**: `GET https://pickup.runasp.net/pickup-lms/api/v1/quiz/get?id=1`
- **Purpose**: Returns detailed information about a specific quiz
- **Used for**: Quiz details page and quiz preview

### 5. Get Paginated Quizzes
- **Endpoint**: `GET https://pickup.runasp.net/pickup-lms/api/v1/quiz/paginate?courseId=1&pageNumber=1&pageSize=1&orderBeforPagination=true&orderDirection=0`
- **Purpose**: Returns a paginated list of quizzes
- **Parameters**:
  - `courseId`: Filter by course (0 for all courses)
  - `pageNumber`: Current page (1-based)
  - `pageSize`: Number of items per page
  - `orderBeforPagination`: Whether to order before pagination
  - `orderDirection`: Sort direction (0 = ascending, 1 = descending)
- **Used for**: The main quiz list component

### 6. Get Quiz Widget Data
- **Endpoint**: `GET https://pickup.runasp.net/pickup-lms/api/v1/quiz/widget`
- **Purpose**: Returns aggregated statistics about quizzes
- **Used for**: The quiz dashboard widget
- **Provides counts for**:
  - Total quizzes
  - Total questions
  - Average duration
  - Difficulty breakdown (easy, medium, hard)

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
   - Handles all API calls to the quiz endpoints

3. **`src/app/Pages/quizlist/Core/services/quiz.service.ts`**
   - Local service for quiz data management (as a fallback)
4. **`src/app/Pages/quizlist/Components/addquizlist/addquizlist.component.ts`**
   - Updated to use the new API service instead of localStorage
   - Added progress tracking and loading states
   - Enhanced error handling with user-friendly messages

5. **`src/app/Pages/quizlist/Components/addquizlist/addquizlist.component.html`**
   - Added progress indicator during quiz creation
   - Updated save button to show loading state
   - Disabled save button during creation process

### Component Structure
- `quizlist.component.ts`: Main container component
- `widgetquizlist.component.ts`: Displays quiz statistics from the widget API
- `cardqiuz.component.ts`: Displays the paginated list of quizzes

### Data Flow
1. The main component initializes and triggers data loading
2. Widget component loads statistics from the widget API
3. Card component loads paginated quizzes from the paginate API
4. Each component handles its own loading, error states, and data presentation

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
- All API calls include error handling with appropriate user feedback
- Fallback to local data when API calls fail
- Retry mechanisms for failed API calls
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

## Usage Notes

- Pagination controls are implemented in the card component
- Search functionality works on the client-side with the current page of results
- Advanced filtering should be implemented by changing the API parameters

## Testing

To test the integration:

1. Navigate to the quiz creation page
2. Select a course
3. Enter quiz details (title, description, duration)
4. Add questions of different types
5. Click "Save Quiz"
6. Monitor the progress indicator
7. Verify success/error messages

## Future Improvements

- Implement server-side search by adding search parameters to the API call
- Add advanced filtering options (by difficulty, date, etc.)
- Implement quiz creation and editing with proper validation
- Add real-time update capabilities for collaborative environments
