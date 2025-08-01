import { Routes } from '@angular/router';
import { instructorGuard } from '../Core/Guards/instructor.guard';
import { RoutesinstructorComponent } from '../Layout/Instructor/routesinstructor/routesinstructor.component';

import { notloginguardsGuard } from '../Core/Guards/notloginguards.guard';
import { HomeComponent } from '../Pages/Instructor/home/home.component';
import { PorfileComponent } from '../Pages/Instructor/porfile/porfile.component';
import { ChangePasswordPopupComponent } from '../Pages/Auth/change-password-popup/change-password-popup.component';
import { CoursesComponent } from '../Pages/Courses/courses/courses.component';
import { QuizlistComponent } from '../Pages/quizlist/quizlist.component';
import { ViewCourseComponent } from '../Pages/Courses/Components/view-course/view-course.component';
import { TopicsComponent } from '../Pages/Topics/topics/topics.component';
import { AddTopicComponent } from '../Pages/Topics/Components/add-topic/add-topic.component';
import { AddquizlistComponent } from '../Pages/quizlist/Components/addquizlist/addquizlist.component';
import { QuizPreviewComponent } from '../Pages/quizlist/Components/quiz-preview/quiz-preview.component';
import { DeleteTopicComponent } from '../Pages/Topics/Components/delete-topic/delete-topic.component';
import { EditTopicComponent } from '../Pages/Topics/Components/edit-topic/edit-topic.component';
import { AddCoursesComponent } from '../Pages/Courses/Components/add-courses/add-courses.component';
import { CreateLessonComponent } from '../Pages/lesson/Components/create-lesson/create-lesson.component';
import { ViewCouponComponent } from '../Pages/Coupon/Components/view-coupon/view-coupon.component';
import { CouponCourseComponent } from '../Pages/Coupon/Components/coupon-course/coupon-course.component';
import { CouponListComponent } from '../Pages/Coupon/coupon-list/coupon-list.component';
import { ViewTopicandStageComponent } from '../Pages/Topics/Components/view-topicand-stage/view-topicand-stage.component';
import { EditStageComponent } from '../Pages/Stages/Components/edit-stage/edit-stage.component';
import { AddStageComponent } from '../Pages/Stages/Components/add-stage/add-stage.component';
import { HomeinstructorComponent } from '../Pages/Instructor/homeinstructor/homeinstructor.component';
import { TodoInstructorComponent } from '../Pages/Instructor/todo-instructor/todo-instructor.component';
import { AddtasktodoComponent } from '../Pages/Instructor/todo-instructor/components/addtasktodo/addtasktodo.component';
import { ViewLessonComponent } from '../Pages/lesson/Components/view-lesson/view-lesson.component';
import { WalletPopupInstructorComponent } from '../Pages/Instructor/wallet-popup-instructor/wallet-popup-instructor.component';
import { UpdeatePorfileComponent } from '../Pages/Instructor/porfile/components/updeate-porfile/updeate-porfile.component';
import { EditTaskInstructorComponent } from '../Pages/Instructor/todo-instructor/components/edit-task-instructor/edit-task-instructor.component';
import { EditCouponComponent } from '../Pages/Coupon/Components/edit-coupon/edit-coupon.component';
import { InstructorChatComponent } from '../Pages/Instructor/instructor-chat/instructor-chat.component';
export const instructorRoutes: Routes = [
    {
        path: '',
        component: RoutesinstructorComponent,
        canActivate: [notloginguardsGuard('Instructor')],
        children: [
            { path: 'instructor', redirectTo: 'homeInstructor', pathMatch: 'full' },
            { path: "homeInstructor", title: "Home Instrctor", component: HomeComponent },
            { path: "myprofile", title: "porfile", component: PorfileComponent },
            { path: 'ChangePasswordPopup', outlet: 'dialog', component: ChangePasswordPopupComponent },
            { path: "course", title: "Course", component: CoursesComponent },
            { path: "todo", title: "Task Management", component: TodoInstructorComponent },
            { path: "chat", title: "Chat ", component: InstructorChatComponent  },

            { path: 'addTaskInstrcutor', outlet: 'dialog', component: AddtasktodoComponent },
             { path: 'editTaskinstructor/:id', outlet: 'dialog', component: EditTaskInstructorComponent },

            { path: "quizlist", title: "Quiz List", component: QuizlistComponent },
            { path: "course/:topicId", component: CoursesComponent},
            { path: "ViewCourse/:courseId", component: ViewCourseComponent },
            { path: "topics", title: "topic", component: TopicsComponent },
            { path: 'addTopic', outlet: 'dialog', component: AddTopicComponent },
            { path: 'wallet', outlet: 'dialog', component: WalletPopupInstructorComponent },
            { path: 'manageProfile', outlet: 'dialog', component: UpdeatePorfileComponent },
            { path: 'editCoupon/:id', outlet: 'dialog', component: EditCouponComponent },

            { path: 'addQuiz', outlet: 'dialog', component: AddquizlistComponent },
            { path: 'quizPreview/:id', outlet: 'dialog', component: QuizPreviewComponent },
            { path: 'deleteTopic/:deleteId', outlet: 'dialog2', component: DeleteTopicComponent },
            { path: 'editTopic/:topicId', outlet: 'dialog', component: EditTopicComponent },
            { path: 'addcourse', outlet: 'dialog', component: AddCoursesComponent },
            { path: 'addLesson/:courseId', outlet: 'dialog', component: CreateLessonComponent },
            { path: 'coupan/:CoupanId', outlet: 'dialog', component: CouponCourseComponent },
            { path: 'viewLesson/:lessonId', title:"View Lesson", component: ViewLessonComponent },
            { path: 'viewCoupon/:CoupanId', outlet: 'dialog', component: ViewCouponComponent },
            { path: 'Couponslist', title: "Coupons", component: CouponListComponent },
            { path: 'ViewTopic/:id', outlet: 'dialog', component: ViewTopicandStageComponent },
            { path: 'addStage/:StageId', outlet: 'dialog2', component: AddStageComponent },
            { path: 'editStage/:StageId', outlet: 'dialog2', component: EditStageComponent },
            { path: "**", title: "notFound", component: HomeinstructorComponent },


        ]
    },


];
