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
import { WalletPopupInstructorComponent } from '../Pages/Instructor/wallet-popup-instructor/wallet-popup-instructor.component';
import { PorfileComponent } from '../Pages/Instructor/porfile/porfile.component';
import { EditTaskStudentComponent } from '../Pages/Students/todostdutent/components/edit-task-student/edit-task-student.component';
import { PorfileStudnetComponent } from '../Pages/Students/porfile-studnet/porfile-studnet.component';
import { EditProfileStudentComponent } from '../Pages/Students/porfile-studnet/Components/edit-profile-student/edit-profile-student.component';
import { DiscoverCourseDetailsComponent } from '../Pages/Students/discover-course-details/discover-course-details.component';

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
            { path: 'edittaskTodoStudent/:id', outlet: 'dialog', component: EditTaskStudentComponent },

            {
                path: "ChangePasswordPopup",
                component: ChangePasswordPopupComponent,
                outlet: 'dialog'
            },
            { path: 'wallet', outlet: 'dialog', component: WalletPopupInstructorComponent },
            { path: "myprofile", title: "porfile", component: PorfileStudnetComponent },
            { path: "DicoverDetails/:id", title: "porfile", component: DiscoverCourseDetailsComponent },

            {
                path: "editStudentProfile",
                component: EditProfileStudentComponent,
                outlet: 'dialog'
            },
            { path: "**", title: "notFound", component: HomestudentComponent },
        ]
    },

];
