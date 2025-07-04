# 🎓  PickUp_LMS

A comprehensive Learning Management System (LMS) built with Angular, designed to facilitate online education with separate interfaces for students and instructors.

## Features

### Student Features
- Course discovery and enrollment
- Interactive lessons and quizzes
- Progress tracking
- Student profile management
- Course ratings and reviews
-  Group Chat with File Sharing
- Todo list management

### Instructor Features
- Course creation and management
- Lesson and topic management
- Student enrollment tracking
- Performance analytics
- Group Chat with File Sharing
- Instructor dashboard
- Content upload and management
- Quiz creation and grading

### General Features
- Multi-language support (Arabic/English)
- Responsive design
- Authentication system
- Password recovery
- Email notifications
- File upload and management
- Real-time updates

## Tools & Technologies

- **Supabase API** - Cloud storage and file management services for handling course materials and user uploads
- **MEGA API Client** - Alternative cloud storage solution for large file handling and sharing
- **Email Service APIs** - For sending notifications, welcome emails, and password reset communications
- **REST API Architecture** - Standard HTTP-based APIs for communication between frontend, mobile app, and backend

## 🛠 Tech Stack

- **Frontend**: Angular 18+
- **Styling**: SCSS
- **UI Components**: PrimeNG (NgPrime) 
- **Real-time Communication**: SignalR 
- **State Management**: Angular Services
- **HTTP Client**: Angular HTTP Client
- **Routing**: Angular Router
- **Forms**: Angular Reactive Forms
- **Internationalization**: Angular i18n 


## Project Structure

```
src/app/
├── Components/          # Reusable UI components
├── Core/               # Core services, guards, and interfaces
├── Layout/             # Layout components for students and instructors
├── Pages/              # Main application pages
│   ├── Auth/           # Authentication pages
│   ├── Students/       # Student-specific pages
│   ├── Instructor/     # Instructor-specific pages
│   ├── Courses/        # Course management
│   └── ...
└── routes/             # Application routing configuration
```

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd PickUp_LMS
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
ng serve
```

4. Navigate to `http://localhost:4200/`

## Development

- Run `ng generate component component-name` to generate a new component
- Run `ng build` to build the project
- Run `ng test` to execute unit tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
