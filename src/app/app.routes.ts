import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { IntoregisterComponent } from './Pages/intoregister/intoregister.component';
import { InstructorRegisterComponent } from './Pages/Instructor/instructor-register/instructor-register.component';
import { StudentRegisterComponent } from './Pages/Students/student-register/student-register.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { PorfileComponent } from './Pages/Instructor/porfile/porfile.component';
import { HomeinstructorComponent } from './Pages/Instructor/homeinstructor/homeinstructor.component';
import { HomestudentComponent } from './Pages/Students/homestudent/homestudent.component';
import { isloginguardsGuard } from './Core/Guards/isloginguards.guard';
import { notloginguardsGuard } from './Core/Guards/notloginguards.guard';
import { RoutesinstructorComponent } from './Layout/Instructor/routesinstructor/routesinstructor.component';
import { TopicComponent } from './Pages/topic/topic.component';

export const routes: Routes = [
    //  Auth Router

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: "login",
         title:"Login",
         canActivate: [isloginguardsGuard],
        component: LoginComponent 
    },
    { path: "startregister", 
      title:"startregister",
     component: IntoregisterComponent,
     canActivate: [isloginguardsGuard],

     },
     { path: "RegisterStudent", title:"startregister",
        component: StudentRegisterComponent ,        
         canActivate: [notloginguardsGuard],
    },
    { path: "RegisterInstructor", 
        title:"startregister",
        component: InstructorRegisterComponent,
        canActivate: [isloginguardsGuard],

     },
     {   path: "ConfirmEmail",
         title:"ConfirmEmail",
         component: ConfirmEmailComponent,
         canActivate: [isloginguardsGuard],
     },
    //  Instructor Router
    {
        path:'',
        component:RoutesinstructorComponent,
        canActivate: [notloginguardsGuard],
        children:[
            { path: '', redirectTo: 'homeInstructor', pathMatch: 'full' },
            { path: "homeInstructor", title:"Home Instrctor",component: HomeinstructorComponent},
            { path: "porfile", title:"porfile",component: PorfileComponent },
            { path: "topic", title:"topic",component: TopicComponent },

        ]
    },




];
