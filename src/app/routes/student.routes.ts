import { Routes } from '@angular/router';
import { RouteStuddentsComponent } from '../Layout/Students/route-studdents/route-studdents.component';
import { studentGuard } from '../Core/Guards/student.guard';
import { notloginguardsGuard } from '../Core/Guards/notloginguards.guard';

import { HomepageStudentComponent } from '../Pages/Students/homepage-student/homepage-student.component';
import { HomestudentComponent } from '../Pages/Students/homestudent/homestudent.component';
import { MyCourseComponent } from '../Pages/Students/my-course/my-course.component';

export const studentRoutes: Routes = [
    {
        path: 'Student',
        component: RouteStuddentsComponent,
        canActivate: [notloginguardsGuard('Student')],
        children: [
            { path: '', redirectTo: 'homeStudent', pathMatch: 'full' },
            { path: "homeStudent", title: "Home Student", component: HomepageStudentComponent },
            { path: "myCourse", title: "My Course", component: MyCourseComponent },

            { path: "**", title: "notFound", component: HomestudentComponent },

        ]
    },

];
