import { Routes } from '@angular/router';
import { RouteStuddentsComponent } from '../Layout/Students/route-studdents/route-studdents.component';
import { notloginguardsGuard } from '../Core/Guards/notloginguards.guard';

import { HomepageStudentComponent } from '../Pages/Students/homepage-student/homepage-student.component';
import { HomestudentComponent } from '../Pages/Students/homestudent/homestudent.component';
import { MyCourseComponent } from '../Pages/Students/my-course/my-course.component';
import { TodostdutentComponent } from '../Pages/Students/todostdutent/todostdutent.component';
import { AddTaskStudentComponent } from '../Pages/Students/todostdutent/components/add-task-student/add-task-student.component';
import { ChangePasswordPopupComponent } from '../Pages/Auth/change-password-popup/change-password-popup.component';
import { DiscoverCourseComponent } from '../Pages/Students/discover-course/discover-course.component';
<<<<<<< HEAD
import { EnrollmentPopupComponent } from '../Pages/Students/discover-course/components/enrollment-popup/enrollment-popup.component';
import { WalletPopupComponent } from '../Components/wallet-popup/wallet-popup.component';
=======
import { WalletPopupInstructorComponent } from '../Pages/Instructor/wallet-popup-instructor/wallet-popup-instructor.component';
import { PorfileComponent } from '../Pages/Instructor/porfile/porfile.component';
import { StudentProfileComponent } from '../Pages/Students/student-profile/student-profile.component';
import { EditStudentProfileComponent } from '../Pages/Students/student-profile/components/edit-student-profile/edit-student-profile.component';
import { CourseViewComponent } from '../Pages/Students/course-view/course-view.component';
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c

export const studentRoutes: Routes = [
    {
        path: 'Student',
        component: RouteStuddentsComponent,
        canActivate: [notloginguardsGuard('Student')],
        children: [
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
<<<<<<< HEAD
                path: "enrollCourse",
                component: EnrollmentPopupComponent,
                outlet: 'dialog'
            },
            {
                path: "wallet",
                component: WalletPopupComponent,
                outlet: 'dialog'
            },

=======
                path: "editStudentProfile",
                component: EditStudentProfileComponent,
                outlet: 'dialog'
            },
          { path: 'wallet', outlet: 'dialog', component: WalletPopupInstructorComponent },
            { path: "myprofile", title: "profile", component: StudentProfileComponent },
            { path: "course/:courseId", title: "Course Details", component: CourseViewComponent },
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
            { path: "**", title: "notFound", component: HomestudentComponent },
        ]
    },

];
