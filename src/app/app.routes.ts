import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { IntoregisterComponent } from './Pages/intoregister/intoregister.component';
import { InstructorRegisterComponent } from './Pages/instructor-register/instructor-register.component';
import { StudentRegisterComponent } from './Pages/student-register/student-register.component';

export const routes: Routes = [


    { path: "", title:"Login",component: LoginComponent },
    { path: "startregister", title:"startregister",component: IntoregisterComponent },

    { path: "RegisterInstructor", title:"startregister",component: InstructorRegisterComponent },
    { path: "RegisterStudent", title:"startregister",component: StudentRegisterComponent },
];
