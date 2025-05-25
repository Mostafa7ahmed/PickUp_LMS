import { Component, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { CommonModule } from '@angular/common';
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { environment } from '../../../../Environments/environment';
import { SplicTextPipe } from '../../../Courses/Core/Pipes/splic-text.pipe';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { ListCourseService } from '../../../Courses/Core/service/list-course.service';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addquizlist',
  standalone: true,
  imports: [TopPopComponent, CommonModule, FormsModule, TextHeaderComponent, Select,SplicTextPipe],
  templateUrl: './addquizlist.component.html',
  styleUrl: './addquizlist.component.scss'
})
export class AddquizlistComponent implements OnInit {
    paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
   private router = inject(Router);

showFirstPopup = false;
showSecondPopup = false;
  private _paginateCoursesService = inject(ListCourseService); 

  selectedCourse: ListCourse | null = null;
  showDropdownCourse = false;
selectedDiscountType: number = 1; 
  baseUrl: string = environment.baseUrlFiles;
    isLoadCourse =  false;
      discountTypes : any[] = [
    { label: 'Hours', value: 1 },
    { label: 'Minutes', value: 0 }
  ]
   
  toggleDropdownCourse() {
    this.showDropdownCourse = !this.showDropdownCourse;
  }
  removeCourse() {
    this.selectedCourse = null;
    this.showDropdownCourse = false;
  }
  selectCourse(course: ListCourse) {
    this.selectedCourse = course;
    this.showDropdownCourse = false;
  }
  getCourse() {
  
    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.isLoadCourse = true;
      console.log(response.result)
  


      
    });
  }



nextPopup() {
  this.showFirstPopup = false;
  setTimeout(() => {
    this.showSecondPopup = true;
  }, 300); // مدة الأنيميشن
}

  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  ngOnInit(): void {
    
    this.getCourse()
  }



}
