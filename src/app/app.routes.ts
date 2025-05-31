import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { IntoregisterComponent } from './Pages/intoregister/intoregister.component';
import { InstructorRegisterComponent } from './Pages/Auth/instructor-register/instructor-register.component';
import { StudentRegisterComponent } from './Pages/Auth/student-register/student-register.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { isloginguardsGuard } from './Core/Guards/isloginguards.guard';
import { ForgotpasswordComponent } from './Pages/Auth/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './Pages/Auth/changepassword/changepassword.component';
import { LandingpageComponent } from './Pages/landingpage/landingpage.component';

// Import route modules
import { instructorRoutes } from './routes/instructor.routes';
import { studentRoutes } from './routes/student.routes';

export const routes: Routes = [
    // Default redirect to landing page
    { 
        path: '', 
        redirectTo: 'LandingPage', 
        pathMatch: 'full' 
    },
    
    // Landing page
    {
        path: "LandingPage",
        title: "LMS Pick Up",
        component: LandingpageComponent,
    },
    
    // Authentication routes
    {
        path: "login",
        title: "Login",
        canActivate: [isloginguardsGuard],
        component: LoginComponent
    },
    {
        path: "startregister",
        title: "Register",
        component: IntoregisterComponent,
        canActivate: [isloginguardsGuard],
    },
    {
        path: "RegisterStudent", 
        title: "Student Registration",
        component: StudentRegisterComponent,
        canActivate: [isloginguardsGuard],
    },
    {
        path: "RegisterInstructor",
        title: "Instructor Registration",
        component: InstructorRegisterComponent,
        canActivate: [isloginguardsGuard],
    },
    {
        path: "ForgotPassword",
        title: "Forgot Password",
        component: ForgotpasswordComponent,
        canActivate: [isloginguardsGuard],
    },
    {
        path: "changepassword",
        title: "Change Password",
        component: ChangepasswordComponent,
        canActivate: [isloginguardsGuard],
    },
    {
        path: "ConfirmEmail",
        title: "Confirm Email",
        component: ConfirmEmailComponent,
        canActivate: [isloginguardsGuard],
    },
    
    // Role-based routes
    ...studentRoutes,
    ...instructorRoutes,
    
    // Wildcard route - should be last
    { 
        path: '**', 
        redirectTo: 'LandingPage' 
    }
];
