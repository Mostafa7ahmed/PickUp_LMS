import { Routes } from '@angular/router';
import { RouteStuddentsComponent } from '../Layout/Students/route-studdents/route-studdents.component';
import { studentGuard } from '../Core/Guards/student.guard';
import { notloginguardsGuard } from '../Core/Guards/notloginguards.guard';
import { studentOnlyGuard } from '../Core/Guards/role-based.guard';
import { ChangePasswordPopupComponent } from '../Pages/Auth/change-password-popup/change-password-popup.component';

import { HomepageStudentComponent } from '../Pages/Students/homepage-student/homepage-student.component';
import { StudentCoursesComponent } from '../Pages/Students/student-courses/student-courses.component';
import { StudentTodoComponent } from '../Pages/Students/student-todo/student-todo.component';
import { StudentChatComponent } from '../Pages/Students/student-chat/student-chat.component';

// Import additional student components when they are created
// import { StudentProgressComponent } from '../Pages/Students/student-progress/student-progress.component';
// import { StudentQuizzesComponent } from '../Pages/Students/student-quizzes/student-quizzes.component';
// import { StudentProfileComponent } from '../Pages/Students/student-profile/student-profile.component';
// import { StudentCertificatesComponent } from '../Pages/Students/student-certificates/student-certificates.component';

export const studentRoutes: Routes = [
    {
        path: 'Student',
        component: RouteStuddentsComponent,
        canActivate: [notloginguardsGuard('Student'), studentOnlyGuard],
        children: [
            // Main student dashboard
            { path: '', redirectTo: 'homeStudent', pathMatch: 'full' },
            { 
                path: 'homeStudent', 
                title: 'Student Dashboard', 
                component: HomepageStudentComponent,
                canActivate: [studentOnlyGuard]
            },
            
            // Change Password Popup - accessible via dialog outlet
            { 
                path: 'ChangePasswordPopup', 
                outlet: 'dialog', 
                component: ChangePasswordPopupComponent 
            },
            
            // Student learning features
            { 
                path: 'courses', 
                title: 'My Courses', 
                component: StudentCoursesComponent,
                canActivate: [studentOnlyGuard]
            },
            { 
                path: 'todo', 
                title: 'My Tasks', 
                component: StudentTodoComponent,
                canActivate: [studentOnlyGuard]
            },
            { 
                path: 'chat', 
                title: 'Messages', 
                component: StudentChatComponent,
                canActivate: [studentOnlyGuard]
            },
            
            // Additional student features (will be uncommented when components are created)
            // { 
            //     path: 'progress', 
            //     title: 'Learning Progress', 
            //     component: StudentProgressComponent,
            //     canActivate: [studentOnlyGuard]
            // },
            // { 
            //     path: 'quizzes', 
            //     title: 'My Quizzes', 
            //     component: StudentQuizzesComponent,
            //     canActivate: [studentOnlyGuard]
            // },
            // { 
            //     path: 'certificates', 
            //     title: 'Certificates', 
            //     component: StudentCertificatesComponent,
            //     canActivate: [studentOnlyGuard]
            // },
            // { 
            //     path: 'profile', 
            //     title: 'My Profile', 
            //     component: StudentProfileComponent,
            //     canActivate: [studentOnlyGuard]
            // },
            
            // Course viewing and interaction routes (will be enabled when components are created)
            // { 
            //     path: 'course/:courseId', 
            //     title: 'Course Details',
            //     component: StudentCourseViewComponent,
            //     canActivate: [studentOnlyGuard]
            // },
            // { 
            //     path: 'lesson/:lessonId', 
            //     title: 'Lesson View',
            //     component: StudentLessonViewComponent,
            //     canActivate: [studentOnlyGuard]
            // },
            // { 
            //     path: 'quiz/:quizId', 
            //     title: 'Take Quiz',
            //     component: StudentQuizTakeComponent,
            //     canActivate: [studentOnlyGuard]
            // },
            
            // Redirect any other routes to student dashboard to prevent unauthorized access
            { 
                path: '**', 
                redirectTo: 'homeStudent'
            }
        ]
    }
];
