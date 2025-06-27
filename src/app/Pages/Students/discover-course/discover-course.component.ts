import { Component, inject, OnInit } from '@angular/core';
import { CustomslectwithiconComponent } from "../../Courses/Components/customslectwithicon/customslectwithicon.component";
import { ItopicList } from '../../Topics/Core/Interface/itopic-list-result';
import { CourseCardComponent } from "../homepage-student/components/course-card/course-card.component";
import { IPaginationResponse } from '../../../Core/Shared/Interface/irespose';
import { IDicoverCourse } from './intarface/idicover-course';
import { DicoverCourseService } from './service/dicover-course.service';
import { CardDiscoverPageComponent } from "./Components/card-discover-page/card-discover-page.component";

@Component({
  selector: 'app-discover-course',
  standalone: true,
  imports: [CardDiscoverPageComponent],
  templateUrl: './discover-course.component.html',
  styleUrl: './discover-course.component.scss'
})
export class DiscoverCourseComponent {



}
