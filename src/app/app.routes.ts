import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { IntoregisterComponent } from './Pages/intoregister/intoregister.component';
import { InstructorRegisterComponent } from './Pages/Auth/instructor-register/instructor-register.component';
import { StudentRegisterComponent } from './Pages/Auth/student-register/student-register.component';
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
import { DeleteTopicComponent } from './Pages/Topics/Components/delete-topic/delete-topic.component';
import { CouponCourseComponent } from './Pages/Coupon/Components/coupon-course/coupon-course.component';
import { CouponListComponent } from './Pages/Coupon/coupon-list/coupon-list.component';
import { ForgotpasswordComponent } from './Pages/Auth/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './Pages/Auth/changepassword/changepassword.component';
import { HomestudentComponent } from './Pages/Students/homestudent/homestudent.component';
import { ChangePasswordPopupComponent } from './Pages/Auth/change-password-popup/change-password-popup.component';
import { ViewCouponComponent } from './Pages/Coupon/Components/view-coupon/view-coupon.component';
import { QuizlistComponent } from './Pages/quizlist/quizlist.component';

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
     { path: "RegisterStudent", title:"RegisterStudent",
        component: StudentRegisterComponent ,        
         canActivate: [isloginguardsGuard],
    },
    { path: "RegisterInstructor", 
        title:"RegisterInstructor",
        component: InstructorRegisterComponent,
        canActivate: [isloginguardsGuard],

     },
     { path: "ForgotPassword",
        title:"ForgotPassword", 
        component: ForgotpasswordComponent,
        canActivate: [isloginguardsGuard],

     },
     { path: "changepassword",
        title:"changepassword", 
        component: ChangepasswordComponent,
        canActivate: [isloginguardsGuard],

     },
     {   path: "ConfirmEmail",
         title:"ConfirmEmail",
         component: ConfirmEmailComponent,
         canActivate: [isloginguardsGuard],
     },
     {
         path:'',
         canActivate: [notloginguardsGuard],
         children:[
             { path: '', redirectTo: 'homeStudent', pathMatch: 'full' },
             { path: "homeStudent", title:"Home Student",component: HomestudentComponent},
 
 
 
         ]
     },
    {
        path:'',
        component:RoutesinstructorComponent,
        canActivate: [notloginguardsGuard],
        children:[
            { path: '', redirectTo: 'homeInstructor', pathMatch: 'full' },
            { path: "homeInstructor", title:"Home Instrctor",component: HomeinstructorComponent},
            { path: "porfile", title:"porfile",component: PorfileComponent },
            {path: 'ChangePasswordPopup',   outlet: 'dialog',component: ChangePasswordPopupComponent },

            { path: "course", title:"Course",component: CoursesComponent },
            { path: "quizlist", title:"Quiz List",component: QuizlistComponent },

            { path: "course/:topicId/:activeTab", component: CoursesComponent, data: { defaultTab: "1" } },
            { path: "ViewCourse/:courseId", component:ViewCourseComponent },
            { path: "topics", title:"topic",component: TopicsComponent },
            {path: 'addTopic',   outlet: 'dialog',component: AddTopicComponent },
            {path: 'deleteTopic/:deleteId',   outlet: 'dialog2',component: DeleteTopicComponent },
            {path: 'editTopic/:topicId',   outlet: 'dialog',component: EditTopicComponent },
            {path: 'addcourse',   outlet: 'dialog',component: AddCoursesComponent },
            {path: 'coupan/:CoupanId',   outlet: 'dialog',component: CouponCourseComponent },
            {path: 'viewCoupon/:CoupanId',   outlet: 'dialog',component: ViewCouponComponent },

            {path: 'Couponslist',  title:"Coupons",component: CouponListComponent },
            { path: 'ViewTopic/:id', outlet: 'dialog', component: ViewTopicandStageComponent },
            {path: 'addStage/:StageId',   outlet: 'dialog2',component: AddStageComponent },
            {path: 'editStage/:StageId',   outlet: 'dialog2',component: EditStageComponent },
            { path: "**", title:"notFound",component: HomeinstructorComponent },


        ]
    }




];
