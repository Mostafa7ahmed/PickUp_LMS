import { Routes } from '@angular/router';
import { RoutesinstructorComponent } from '../Layout/Instructor/routesinstructor/routesinstructor.component';
import { notloginguardsGuard } from '../Core/Guards/notloginguards.guard';
import { instructorOnlyGuard } from '../Core/Guards/role-based.guard';

// Main Components
import { HomeinstructorComponent } from '../Pages/Instructor/homeinstructor/homeinstructor.component';
import { PorfileComponent } from '../Pages/Instructor/porfile/porfile.component';
import { ChangePasswordPopupComponent } from '../Pages/Auth/change-password-popup/change-password-popup.component';

// Course Management
import { CoursesComponent } from '../Pages/Courses/courses/courses.component';
import { ViewCourseComponent } from '../Pages/Courses/Components/view-course/view-course.component';
import { AddCoursesComponent } from '../Pages/Courses/Components/add-courses/add-courses.component';

// Topic Management  
import { TopicsComponent } from '../Pages/Topics/topics/topics.component';
import { AddTopicComponent } from '../Pages/Topics/Components/add-topic/add-topic.component';
import { EditTopicComponent } from '../Pages/Topics/Components/edit-topic/edit-topic.component';
import { DeleteTopicComponent } from '../Pages/Topics/Components/delete-topic/delete-topic.component';
import { ViewTopicandStageComponent } from '../Pages/Topics/Components/view-topicand-stage/view-topicand-stage.component';

// Stage Management
import { AddStageComponent } from '../Pages/Stages/Components/add-stage/add-stage.component';
import { EditStageComponent } from '../Pages/Stages/Components/edit-stage/edit-stage.component';

// Quiz Management
import { QuizlistComponent } from '../Pages/quizlist/quizlist.component';
import { AddquizlistComponent } from '../Pages/quizlist/Components/addquizlist/addquizlist.component';

// Lesson Management
import { CreateLessonComponent } from '../Pages/lesson/Components/create-lesson/create-lesson.component';

// Coupon Management
import { CouponListComponent } from '../Pages/Coupon/coupon-list/coupon-list.component';
import { ViewCouponComponent } from '../Pages/Coupon/Components/view-coupon/view-coupon.component';
import { CouponCourseComponent } from '../Pages/Coupon/Components/coupon-course/coupon-course.component';

// Task Management
import { TodoComponent } from '../Pages/todo/todo.component';

// Chat Management
import { InstructorChatComponent } from '../Pages/Instructor/instructor-chat/instructor-chat.component';

export const instructorRoutes: Routes = [
    {
        path: 'Instructor',
        component: RoutesinstructorComponent,
        canActivate: [notloginguardsGuard('Instructor'), instructorOnlyGuard],
        children: [
            // Default redirect
            { 
                path: '', 
                redirectTo: 'homeInstructor', 
                pathMatch: 'full' 
            },
            
            // Main Dashboard
            { 
                path: 'homeInstructor', 
                title: 'Instructor Dashboard', 
                component: HomeinstructorComponent,
                canActivate: [instructorOnlyGuard]
            },
            
            // Profile Management
            { 
                path: 'myprofile', 
                title: 'My Profile', 
                component: PorfileComponent,
                canActivate: [instructorOnlyGuard]
            },
            
            // Change Password Popup
            { 
                path: 'ChangePasswordPopup', 
                outlet: 'dialog', 
                component: ChangePasswordPopupComponent 
            },
            
            // Course Management
            { 
                path: 'courses', 
                title: 'My Courses', 
                component: CoursesComponent,
                canActivate: [instructorOnlyGuard]
            },
            { 
                path: 'course/:topicId/:activeTab', 
                title: 'Course Details',
                component: CoursesComponent, 
                data: { defaultTab: '1' },
                canActivate: [instructorOnlyGuard]
            },
            { 
                path: 'ViewCourse/:courseId', 
                title: 'View Course',
                component: ViewCourseComponent,
                canActivate: [instructorOnlyGuard]
            },
            
            // Topic Management
            { 
                path: 'topics', 
                title: 'Topics', 
                component: TopicsComponent,
                canActivate: [instructorOnlyGuard]
            },
            
            // Quiz Management
            { 
                path: 'quizzes', 
                title: 'Quiz Management', 
                component: QuizlistComponent,
                canActivate: [instructorOnlyGuard]
            },
            
            // Task Management
            { 
                path: 'todo', 
                title: 'Task Management', 
                component: TodoComponent,
                canActivate: [instructorOnlyGuard]
            },
            
            // Chat Management
            { 
                path: 'chat', 
                title: 'Course Chats', 
                component: InstructorChatComponent,
                canActivate: [instructorOnlyGuard]
            },
            
            // Coupon Management
            { 
                path: 'coupons', 
                title: 'Coupons', 
                component: CouponListComponent,
                canActivate: [instructorOnlyGuard]
            },
            
            // Popup Dialog Routes
            { path: 'addTopic', outlet: 'dialog', component: AddTopicComponent },
            { path: 'editTopic/:topicId', outlet: 'dialog', component: EditTopicComponent },
            { path: 'ViewTopic/:id', outlet: 'dialog', component: ViewTopicandStageComponent },
            { path: 'deleteTopic/:deleteId', outlet: 'dialog2', component: DeleteTopicComponent },
            
            { path: 'addcourse', outlet: 'dialog', component: AddCoursesComponent },
            { path: 'addLesson/:courseId', outlet: 'dialog', component: CreateLessonComponent },
            
            { path: 'addQuiz', outlet: 'dialog', component: AddquizlistComponent },
            
            { path: 'addStage/:StageId', outlet: 'dialog2', component: AddStageComponent },
            { path: 'editStage/:StageId', outlet: 'dialog2', component: EditStageComponent },
            
            { path: 'coupon/:CoupanId', outlet: 'dialog', component: CouponCourseComponent },
            { path: 'viewCoupon/:CoupanId', outlet: 'dialog', component: ViewCouponComponent },
            
            // Fallback route
            { 
                path: '**', 
                redirectTo: 'homeInstructor'
            }
        ]
    }
];
