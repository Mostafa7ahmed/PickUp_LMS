import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { IntoregisterComponent } from './Pages/intoregister/intoregister.component';
import { InstructorRegisterComponent } from './Pages/Instructor/instructor-register/instructor-register.component';
import { StudentRegisterComponent } from './Pages/Students/student-register/student-register.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { PorfileComponent } from './Pages/Instructor/porfile/porfile.component';
import { HomeinstructorComponent } from './Pages/Instructor/homeinstructor/homeinstructor.component';
import { isloginguardsGuard } from './Core/Guards/isloginguards.guard';
import { notloginguardsGuard } from './Core/Guards/notloginguards.guard';
import { RoutesinstructorComponent } from './Layout/Instructor/routesinstructor/routesinstructor.component';
import { CoursesComponent } from './Pages/Courses/courses/courses.component';
import { TopicsComponent } from './Pages/Topics/topics/topics.component';
import { AddTopicComponent } from './Pages/Topics/Components/add-topic/add-topic.component';
import { AddCoursesComponent } from './Pages/Courses/Components/add-courses/add-courses.component';
import { ViewTopicandStageComponent } from './Pages/Topics/Components/view-topicand-stage/view-topicand-stage.component';
import { AddStageComponent } from './Pages/Stages/Components/add-stage/add-stage.component';
import { EditStageComponent } from './Pages/Stages/Components/edit-stage/edit-stage.component';
import { EditTopicComponent } from './Pages/Topics/Components/edit-topic/edit-topic.component';
import { ViewCourseComponent } from './Pages/Courses/Components/view-course/view-course.component';

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
    {
        path:'',
        component:RoutesinstructorComponent,
        canActivate: [notloginguardsGuard],
        children:[
            { path: '', redirectTo: 'homeInstructor', pathMatch: 'full' },
            { path: "homeInstructor", title:"Home Instrctor",component: HomeinstructorComponent},
            { path: "porfile", title:"porfile",component: PorfileComponent },
            { path: "course", title:"Course",component: CoursesComponent },
            { path: "course/:topicId/:activeTab", component: CoursesComponent, data: { defaultTab: "1" } },
            { path: "ViewCourse/:courseId", component:ViewCourseComponent },
            { path: "topics", title:"topic",component: TopicsComponent },
            {path: 'addTopic',   outlet: 'dialog',component: AddTopicComponent },
            {path: 'editTopic/:topicId',   outlet: 'dialog',component: EditTopicComponent },
            {path: 'addcourse',   outlet: 'dialog',component: AddCoursesComponent },
            { path: 'ViewTopic/:id', outlet: 'dialog', component: ViewTopicandStageComponent },
            {path: 'addStage/:StageId',   outlet: 'dialog2',component: AddStageComponent },
            {path: 'editStage/:StageId',   outlet: 'dialog2',component: EditStageComponent },
            { path: "**", title:"notFound",component: HomeinstructorComponent },


        ]
    },




];
