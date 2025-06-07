import { Routes } from '@angular/router';
import { RoutesinstructorComponent } from '../Layout/Instructor/routesinstructor/routesinstructor.component';
import { notloginguardsGuard } from '../Core/Guards/notloginguards.guard';
import { instructorOnlyGuard } from '../Core/Guards/role-based.guard';

// Main Components
import { HomeComponent } from '../Pages/Instructor/home/home.component';
import { PorfileComponent } from '../Pages/Instructor/porfile/porfile.component';
import { ChangePasswordPopupComponent } from '../Pages/Auth/change-password-popup/change-password-popup.component';
import { EnrollCoursePopupComponent } from '../Pages/enrollment/enroll-course-popup/enroll-course-popup.component';

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
<<<<<<< HEAD

// Task Management
import { TodoComponent } from '../Pages/todo/todo.component';

// Chat Management
import { InstructorChatComponent } from '../Pages/Instructor/instructor-chat/instructor-chat.component';

=======
import { CouponListComponent } from '../Pages/Coupon/coupon-list/coupon-list.component';
import { ViewTopicandStageComponent } from '../Pages/Topics/Components/view-topicand-stage/view-topicand-stage.component';
import { EditStageComponent } from '../Pages/Stages/Components/edit-stage/edit-stage.component';
import { AddStageComponent } from '../Pages/Stages/Components/add-stage/add-stage.component';
import { HomeinstructorComponent } from '../Pages/Instructor/homeinstructor/homeinstructor.component';
import { TodoInstructorComponent } from '../Pages/Instructor/todo-instructor/todo-instructor.component';
import { AddtasktodoComponent } from '../Pages/Instructor/todo-instructor/components/addtasktodo/addtasktodo.component';
import { ViewLessonComponent } from '../Pages/lesson/Components/view-lesson/view-lesson.component';
<<<<<<< HEAD
>>>>>>> 64669af2d189050710502789c0020a0a1285f09a
=======
import { ManageProfileComponent } from '../Pages/Instructor/porfile/components/manage-profile/manage-profile.component';
import { WalletPopupComponent } from '../Components/wallet-popup/wallet-popup.component';
>>>>>>> 95dcfafd060ca53bafcd474026778f589261ec07
export const instructorRoutes: Routes = [
    {
        path: 'Instructor',
        component: RoutesinstructorComponent,
        canActivate: [notloginguardsGuard('Instructor'), instructorOnlyGuard],
        children: [
<<<<<<< HEAD
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
                component: HomeComponent,
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
            
            // Course Enrollment Popup
            { 
                path: 'enrollCourse/:courseId', 
                outlet: 'dialog', 
                component: EnrollCoursePopupComponent 
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
=======
            { path: 'instructor', redirectTo: 'homeInstructor', pathMatch: 'full' },
            { path: "homeInstructor", title: "Home Instrctor", component: HomeComponent },
            { path: "myprofile", title: "porfile", component: PorfileComponent },
            { path: 'ChangePasswordPopup', outlet: 'dialog', component: ChangePasswordPopupComponent },
            { path: 'manageProfile', outlet: 'dialog', component: ManageProfileComponent },
            { path: 'wallet', outlet: 'dialog', component: WalletPopupComponent },
            { path: "course", title: "Course", component: CoursesComponent },
            { path: "todo", title: "Task Management", component: TodoInstructorComponent },
            { path: 'addTaskInstrcutor', outlet: 'dialog', component: AddtasktodoComponent },
            { path: "quizlist", title: "Quiz List", component: QuizlistComponent },
            { path: "course/:topicId/:activeTab", component: CoursesComponent, data: { defaultTab: "1" } },
            { path: "ViewCourse/:courseId", component: ViewCourseComponent },
            { path: "topics", title: "topic", component: TopicsComponent },
>>>>>>> 64669af2d189050710502789c0020a0a1285f09a
            { path: 'addTopic', outlet: 'dialog', component: AddTopicComponent },
            { path: 'editTopic/:topicId', outlet: 'dialog', component: EditTopicComponent },
            { path: 'ViewTopic/:id', outlet: 'dialog', component: ViewTopicandStageComponent },
            { path: 'deleteTopic/:deleteId', outlet: 'dialog2', component: DeleteTopicComponent },
            
            { path: 'addcourse', outlet: 'dialog', component: AddCoursesComponent },
            { path: 'addLesson/:courseId', outlet: 'dialog', component: CreateLessonComponent },
<<<<<<< HEAD
            
            { path: 'addQuiz', outlet: 'dialog', component: AddquizlistComponent },
            
=======
            { path: 'coupan/:CoupanId', outlet: 'dialog', component: CouponCourseComponent },
            { path: 'viewLesson/:lessonId', title:"View Lesson", component: ViewLessonComponent },
            { path: 'viewCoupon/:CoupanId', outlet: 'dialog', component: ViewCouponComponent },
            { path: 'Couponslist', title: "Coupons", component: CouponListComponent },
            { path: 'ViewTopic/:id', outlet: 'dialog', component: ViewTopicandStageComponent },
>>>>>>> 64669af2d189050710502789c0020a0a1285f09a
            { path: 'addStage/:StageId', outlet: 'dialog2', component: AddStageComponent },
            { path: 'editStage/:StageId', outlet: 'dialog2', component: EditStageComponent },
            
            { path: 'coupan/:CoupanId', outlet: 'dialog', component: CouponCourseComponent },
            { path: 'viewCoupon/:CoupanId', outlet: 'dialog', component: ViewCouponComponent },
            
            // Fallback route
            { 
                path: '**', 
                redirectTo: 'homeInstructor'
            }
        ]
    }
];
