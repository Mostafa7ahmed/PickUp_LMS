import { HomeComponent } from './Pages/Instructor/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { IntoregisterComponent } from './Pages/intoregister/intoregister.component';
import { InstructorRegisterComponent } from './Pages/Auth/instructor-register/instructor-register.component';
import { StudentRegisterComponent } from './Pages/Auth/student-register/student-register.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { isloginguardsGuard } from './Core/Guards/isloginguards.guard';
// Todo components moved to student routes

import { ForgotpasswordComponent } from './Pages/Auth/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './Pages/Auth/changepassword/changepassword.component';

import { instructorRoutes } from './routes/instructor.routes';
import { studentRoutes } from './routes/student.routes';
import { LandingpageComponent } from './Pages/landingpage/landingpage.component';
import { TopicComponent } from './Pages/topic/topic.component';

export const routes: Routes = [

    { path: '', redirectTo: 'LandingPage', pathMatch: 'full' },
      {
        path: "LandingPage",
        title: "LMS Pick Up",
        canActivate: [isloginguardsGuard],
        component: LandingpageComponent,

    },
    {
        path: "login",
        title: "Login",
        canActivate: [isloginguardsGuard],
        component: LoginComponent
    },
        {
        path: "trrrrr",
        title: "trrrrr",
        component: TopicComponent
    },
    {
        path: "startregister",
        title: "startregister",
        component: IntoregisterComponent,
        canActivate: [isloginguardsGuard],

    },
    {
        path: "RegisterStudent", title: "RegisterStudent",
        component: StudentRegisterComponent,
        canActivate: [isloginguardsGuard],
    },
    {
        path: "RegisterInstructor",
        title: "RegisterInstructor",
        component: InstructorRegisterComponent,
        canActivate: [isloginguardsGuard],

    },
    {
        path: "ForgotPassword",
        title: "ForgotPassword",
        component: ForgotpasswordComponent,
        canActivate: [isloginguardsGuard],

    },
    {
        path: "changepassword",
        title: "changepassword",
        component: ChangepasswordComponent,
        canActivate: [isloginguardsGuard],

    },

    {
        path: "ConfirmEmail",
        title: "ConfirmEmail",
        component: ConfirmEmailComponent,
        canActivate: [isloginguardsGuard],
    },    // Todo routes moved to student.routes.ts
    ...studentRoutes,
    ...instructorRoutes,
   





];
