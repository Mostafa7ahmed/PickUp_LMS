# Quiz API Integration - V2

This document explains how to use the new quiz API endpoints integrated into the Angular application.

## 🎯 API Endpoints

### 1. Create Quiz
- **Endpoint**: `POST /quiz/create`
- **Description**: Creates a new quiz with basic information
- **Auto-creates**: 3 sections (MultipleChoice, TrueFalse, ShortAnswer)

### 2. Get Quiz
- **Endpoint**: `GET /quiz/get?id={quizId}`
- **Description**: Retrieves quiz details with sections and questions
- **Returns**: Complete quiz structure with populated questions

### 3. Create Questions (Bulk)
- **Endpoint**: `POST /question/bulk`
- **Description**: Creates multiple questions for a quiz
- **Supports**: All three question types in a single request

## 📁 New Files Created

```
src/app/Pages/quizlist/Core/
├── Interface/
│   └── iquiz-api.interface.ts        # New API interfaces
├── services/
│   ├── quiz-api-v2.service.ts        # Main API service
│   └── quiz-display.service.ts       # Helper for displaying quiz data
├── Components/
│   ├── quiz-viewer/
│   │   ├── quiz-viewer.component.ts   # Quiz display component
│   │   ├── quiz-viewer.component.html # Quiz display template
│   │   └── quiz-viewer.component.scss # Quiz display styles
│   └── quiz-viewer-demo/
│       └── quiz-viewer-demo.component.ts # Demo component
└── README-API-Integration.md          # This file
```

## 🔧 Services

### QuizApiV2Service
Main service for quiz operations:

```typescript
// Create a quiz
const quizData: IQuizFormData = {
  courseId: 123,
  lessonIds: [1, 2, 3],
  name: "Sample Quiz",
  description: "A test quiz",
  limited: true,
  duration: 30,
  durationType: QuizDurationType.Minutes,
  difficulty: QuizDifficulty.Medium
};

this.quizApiV2Service.createQuiz(quizData).subscribe(response => {
  console.log('Quiz created:', response.result.id);
});

// Get quiz details
this.quizApiV2Service.getQuiz(quizId).subscribe(response => {
  console.log('Quiz sections:', response.result.quizSections);
});

// Create questions
const questions: IQuestionFormData[] = [
  {
    type: QuizSectionType.TrueFalse,
    text: "Angular is a framework?",
    correctAnswer: true,
    order: 1
  },
  {
    type: QuizSectionType.MultipleChoice,
    text: "What is Angular?",
    options: ["Framework", "Library", "Language"],
    correctAnswer: 0,
    order: 2
  }
];

this.quizApiV2Service.createQuestionsBulk(quizId, courseId, sectionIds, questions);
```

### QuizDisplayService
Helper service for displaying quiz data:

```typescript
// Get formatted quiz data for UI
this.quizDisplayService.getQuizForDisplay(quizId).subscribe(quizData => {
  console.log('Quiz name:', quizData.name);
  console.log('Total questions:', quizData.totalQuestions);
  console.log('Sections:', quizData.sections);
});
```

### QuizViewerComponent
Ready-to-use component for displaying quiz details:

```typescript
// Basic usage
<app-quiz-viewer [quizId]="101" [showAsPopup]="false"></app-quiz-viewer>

// As popup
<app-quiz-viewer [quizId]="selectedQuizId" [showAsPopup]="true"></app-quiz-viewer>
```

### QuizViewerDemoComponent
Demo component showing how to use the quiz viewer:

```typescript
// Use in your component
<app-quiz-viewer-demo></app-quiz-viewer-demo>
```

## 📊 Data Flow

### Quiz Creation Workflow:
1. **Create Quiz** → Gets quiz ID + auto-generated sections
2. **Get Quiz Details** → Retrieves section IDs
3. **Create Questions** → Assigns questions to sections

### Question Types & API Format:

#### Multiple Choice
```json
{
  "multipleChoise": [
    { "answer": "Option 1", "correct": false },
    { "answer": "Option 2", "correct": true }
  ],
  "shortAnswer": null,
  "trueAndFalse": null
}
```

#### True/False
```json
{
  "multipleChoise": null,
  "shortAnswer": null,
  "trueAndFalse": { "answer": true }
}
```

#### Short Answer
```json
{
  "multipleChoise": null,
  "shortAnswer": { "answer": "Sample answer" },
  "trueAndFalse": null
}
```

## 🎨 UI Integration

### Updated Components:
- **AddquizlistComponent**: Now uses V2 service for quiz creation
- **Progress Tracking**: Real-time progress updates during creation
- **Validation**: Enhanced validation with detailed error messages

### Usage in Component:
```typescript
// Inject the service
private quizApiV2Service = inject(QuizApiV2Service);

// Subscribe to progress
this.quizApiV2Service.progress$.subscribe(progress => {
  console.log('Current step:', progress.step);
  console.log('Progress:', progress.completedQuestions, '/', progress.totalQuestions);
});

// Create complete quiz with questions
const { quizData, questions } = this.transformToV2Format();
this.quizApiV2Service.createQuiz(quizData).subscribe(/* handle response */);
```

## 🔍 Section Types

The API automatically creates 3 sections with these types:

| Type | Value | Name | Icon |
|------|-------|------|------|
| MultipleChoice | 0 | Multiple Choice | `fas fa-list` |
| TrueFalse | 1 | True/False | `fas fa-check-circle` |
| ShortAnswer | 2 | Short Answer | `fas fa-edit` |

## ✅ Validation

### Quiz Validation:
- Name and description required
- Valid course and lesson selection
- Duration > 0

### Question Validation:
- Question text required
- Multiple choice: min 2 options, 1 correct answer
- Short answer: correct answer required
- True/false: boolean answer required

## 🎨 Quiz Viewer Features

### Display Capabilities:
- **Quiz Header**: Name, description, duration, difficulty, question count
- **Section Organization**: Groups questions by type (Multiple Choice, True/False, Short Answer)
- **Question Cards**: Shows question text, options, correct answers, hints
- **Visual Indicators**: Color-coded sections, difficulty badges, correct answer highlighting
- **Responsive Design**: Mobile-friendly layout

### Component Features:
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages with retry functionality
- **Empty States**: Graceful handling of quizzes without questions
- **Professional Styling**: Modern card-based design with hover effects

### Usage Modes:
- **Standalone View**: Full-page quiz display
- **Popup Mode**: Modal overlay for quick preview
- **Demo Mode**: Interactive demo with quiz ID input

## 📊 API Response Structure

Based on the actual API response from `GET /quiz/get?id=101`:

```json
{
  "success": true,
  "result": {
    "id": 101,
    "name": "test",
    "description": "Quiz for c# loop",
    "difficulty": 1,
    "quizDuration": { "duration": 30, "type": 1 },
    "quizSections": [
      {
        "type": 1,
        "name": "TrueFalse",
        "questions": [
          {
            "text": "jhjhjhjk",
            "trueAndFalseAnswer": { "answer": true },
            "multipleChoiceQuestionAnswers": [],
            "shortQuestionAnswer": null
          }
        ]
      }
    ]
  }
}
```

## 🚀 Benefits

1. **Real API Integration**: Uses actual backend endpoints
2. **Type Safety**: Full TypeScript interfaces  
3. **Error Handling**: Comprehensive error management
4. **Progress Tracking**: Real-time creation progress
5. **Validation**: Client-side validation before API calls
6. **Extensible**: Easy to add new question types
7. **Professional UI**: Beautiful, responsive quiz display
8. **Ready Components**: Drop-in components for immediate use

## 📝 Example Usage

See `AddquizlistComponent.saveQuestions()` for a complete implementation example of:
- Form data transformation
- API calls sequence
- Error handling
- Progress tracking
- Success/failure scenarios

## 🔧 Troubleshooting

### Common Issues:
1. **Missing Sections**: Quiz sections are auto-created, ensure API creates all 3 types
2. **Question Assignment**: Questions must be assigned to correct section based on type
3. **Validation Errors**: Use service validation methods before API calls
4. **Progress Tracking**: Subscribe to progress$ observable for real-time updates

### Debug Tips:
- Check browser console for detailed API logs
- Verify section IDs match question assignments
- Ensure question data format matches API expectations
- Test with minimal data first, then add complexity 