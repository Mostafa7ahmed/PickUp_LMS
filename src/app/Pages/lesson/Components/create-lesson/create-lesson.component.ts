import { Component, inject } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { CommonModule } from '@angular/common';
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { SplicTextPipe } from '../../../Courses/Core/Pipes/splic-text.pipe';
import { environment } from '../../../../Environments/environment';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { ListCourseService } from '../../../Courses/Core/service/list-course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ITag } from '../../../Courses/Core/interface/itags';
import { TagesService } from '../../../Courses/Core/service/tages.service';

@Component({
  selector: 'app-create-lesson',
  standalone: true,
  imports: [TopPopComponent, TextHeaderComponent , TooltipModule,CommonModule , SplicTextPipe,MultiSelectModule,KeyFilterModule,DropdownModule, ButtonModule],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.scss'
})
export class CreateLessonComponent {

  showDropdownCourse = false;
  selectedCourse: ListCourse | null = null; 
  baseUrl: string = environment.baseUrlFiles;
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  private _paginateCoursesService = inject(ListCourseService); 
    tagsListResponse: IPaginationResponse<ITag> = {} as IPaginationResponse<ITag>;
    private _TagesService = inject(TagesService);
    private router = inject(Router);
  
  private _activatedRoute= inject(ActivatedRoute);
  isLoadCourse = false;

  
    toggleDropdownCourse() {
      this.showDropdownCourse = !this.showDropdownCourse;
    }
  
    selectCourse(course: ListCourse) {
      this.selectedCourse = course;
      this.showDropdownCourse = false;
    }

    removeCourse() {
      this.selectedCourse = null;
      this.showDropdownCourse = false;
    }

    getCourse() {
      const routeCoupanId = +this._activatedRoute.snapshot.paramMap.get('courseId')!;
    
      this._paginateCoursesService.getCourses().subscribe((response) => {
        this.paginationCoursesResponse = response;
        this.isLoadCourse = true;
        console.log("first")
        console.log(this.paginationCoursesResponse.result)
    
        const defaultCourse = this.paginationCoursesResponse.result.find(
          (course) => course.id === routeCoupanId
        );
    
        if (defaultCourse) {
          this.selectCourse(defaultCourse);
        } else {
          const fallbackCourse = this.paginationCoursesResponse.result.find(
            (course) => course.id === 205
          );
          if (fallbackCourse) {
            this.selectCourse(fallbackCourse);
          }
        }
      });
    }
    getTagsList() {
      this._TagesService.getTags().subscribe(response => {
        if (response.success) {
          this.tagsListResponse = response;
  
        }
      });
    }
    addTags(input: HTMLInputElement): void {
      const value = input.value.trim();
      if (!value || this.tagsListResponse.result.some((tag: any) => tag.name === value)) {
        return;
      }
    
      const newTag = {
        id: null,
        instructorId: 1,
        name: value,
        createdOn: null
      };
    
      this.tagsListResponse.result.unshift(newTag);
      input.value = ''; 
    }
    closePopup() {
      this.router.navigate([{ outlets: { dialog: null } }]);
    }
    ngOnInit() {
      this.getCourse();
      this.getTagsList();
    }
}
