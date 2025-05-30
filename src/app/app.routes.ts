import { HomeComponent } from './Pages/Instructor/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { IntoregisterComponent } from './Pages/intoregister/intoregister.component';
import { InstructorRegisterComponent } from './Pages/Auth/instructor-register/instructor-register.component';
import { StudentRegisterComponent } from './Pages/Auth/student-register/student-register.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { isloginguardsGuard } from './Core/Guards/isloginguards.guard';

import { ForgotpasswordComponent } from './Pages/Auth/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './Pages/Auth/changepassword/changepassword.component';

import { instructorRoutes } from './routes/instructor.routes';
import { studentRoutes } from './routes/student.routes';
import { RoutesinstructorComponent } from './Layout/Instructor/routesinstructor/routesinstructor.component';
import { notloginguardsGuard } from './Core/Guards/notloginguards.guard';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: "login",
        title: "Login",
        canActivate: [isloginguardsGuard],
        component: LoginComponent
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
    },
    ...studentRoutes,
      
{
  path: 'Instructor',
  component: RoutesinstructorComponent,
  canActivate: [notloginguardsGuard('Instructor')],
  children: instructorRoutes 
}
      





];
