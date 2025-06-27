import { Component, inject } from '@angular/core';
import { environment } from '../../../../../Environments/environment';
import { IDicoverCourse } from '../../intarface/idicover-course';
import { IPaginationResponse } from '../../../../../Core/Shared/Interface/irespose';
import { DicoverCourseService } from '../../service/dicover-course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterCoursePipe } from './filter-course.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-discover-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterCoursePipe , RouterLink] ,
  templateUrl: './card-discover-page.component.html',
  styleUrl: './card-discover-page.component.scss'
})
export class CardDiscoverPageComponent {
  baseUrl:string=environment.baseUrlFiles

  dataDiscover: IPaginationResponse<IDicoverCourse> = {} as IPaginationResponse<IDicoverCourse>;
  searchTerm: string = '';
  private _DicoverCourseService = inject(DicoverCourseService);

  ngOnInit(): void {
    this._DicoverCourseService.getDiscover().subscribe({
      next: (res) => {
        this.dataDiscover = res
      }
    })
  }


    formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }
}
