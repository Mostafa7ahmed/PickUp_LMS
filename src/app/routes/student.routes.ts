import { Routes } from '@angular/router';
import { RouteStuddentsComponent } from '../Layout/Students/route-studdents/route-studdents.component';
import { notloginguardsGuard } from '../Core/Guards/notloginguards.guard';
import { studentOnlyGuard } from '../Core/Guards/role-based.guard';
import { EnrollCoursePopupComponent } from '../Pages/enrollment/enroll-course-popup/enroll-course-popup.component';

// Student Components
import { HomepageStudentComponent } from '../Pages/Students/homepage-student/homepage-student.component';
import { StudentCoursesComponent } from '../Pages/Students/student-courses/student-courses.component';
import { StudentTodoComponent } from '../Pages/Students/student-todo/student-todo.component';
import { StudentChatComponent } from '../Pages/Students/student-chat/student-chat.component';
import { StudentCourseCatalogComponent } from '../Pages/Students/student-course-catalog/student-course-catalog.component';
import { StudentProfileComponent } from '../Pages/Students/student-profile/student-profile.component';

// Import additional student components when they are created
// import { StudentProgressComponent } from '../Pages/Students/student-progress/student-progress.component';
// import { StudentQuizzesComponent } from '../Pages/Students/student-quizzes/student-quizzes.component';
// import { StudentCertificatesComponent } from '../Pages/Students/student-certificates/student-certificates.component';
import { HomestudentComponent } from '../Pages/Students/homestudent/homestudent.component';
import { MyCourseComponent } from '../Pages/Students/my-course/my-course.component';
import { TodostdutentComponent } from '../Pages/Students/todostdutent/todostdutent.component';
import { AddTaskStudentComponent } from '../Pages/Students/todostdutent/components/add-task-student/add-task-student.component';
import { ChangePasswordPopupComponent } from '../Pages/Auth/change-password-popup/change-password-popup.component';
import { DiscoverCourseComponent } from '../Pages/Students/discover-course/discover-course.component';
import { EnrollmentPopupComponent } from '../Pages/Students/discover-course/components/enrollment-popup/enrollment-popup.component';
import { WalletPopupComponent } from '../Components/wallet-popup/wallet-popup.component';

export const studentRoutes: Routes = [
    {
        path: 'Student',
        component: RouteStuddentsComponent,
        canActivate: [notloginguardsGuard('Student'), studentOnlyGuard],
        children: [
            // Default redirect
            { 
                path: '', 
                redirectTo: 'homeStudent', 
                pathMatch: 'full' 
            },
            
            // Main student dashboard
            { 
                path: 'homeStudent', 
                title: 'Student Dashboard', 
                component: HomepageStudentComponent,
                canActivate: [studentOnlyGuard]
            },
            
            // Profile Management
            { 
                path: 'profile', 
                title: 'My Profile', 
                component: StudentProfileComponent,
                canActivate: [studentOnlyGuard]
            },
            
            // Change Password Popup - accessible via dialog outlet
            { 
                path: 'ChangePasswordPopup', 
                outlet: 'dialog', 
                component: ChangePasswordPopupComponent 
            },
            
            // Course Enrollment Popup - accessible via dialog outlet
            { 
                path: 'enrollCourse/:courseId', 
                outlet: 'dialog', 
                component: EnrollCoursePopupComponent 
            },
            
            // Student learning features
            { 
                path: 'courses', 
                title: 'My Courses', 
                component: StudentCoursesComponent,
                canActivate: [studentOnlyGuard]
            },
            { 
                path: 'discover', 
                title: 'Discover Courses', 
                component: StudentCourseCatalogComponent,
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
            
            // Fallback route
            { 
                path: '**', 
                redirectTo: 'homeStudent'
            },
            { path: '', redirectTo: 'homeStudent', pathMatch: 'full' },
            { path: "homeStudent", title: "Home Student", component: HomepageStudentComponent },
            { path: "myCourse", title: "My Course", component: MyCourseComponent },
            { path: "DiscoverCourses", title: "My Course", component: DiscoverCourseComponent },
            {
                path: "Todo",
                title: "Task Management",
                component: TodostdutentComponent
            },
            {
                path: "taskTodoStudent",
                component: AddTaskStudentComponent,
                outlet: 'dialog'
            },
            {
                path: "ChangePasswordPopup",
                component: ChangePasswordPopupComponent,
                outlet: 'dialog'
            },
            {
                path: "enrollCourse",
                component: EnrollmentPopupComponent,
                outlet: 'dialog'
            },
            {
                path: "wallet",
                component: WalletPopupComponent,
                outlet: 'dialog'
            },

            { path: "**", title: "notFound", component: HomestudentComponent },
        ]
    }
];
