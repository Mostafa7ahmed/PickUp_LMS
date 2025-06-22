import { Component, Input, OnInit, inject } from '@angular/core';
import { IPaginationResponse } from '../../Core/Shared/Interface/irespose';
import { ILessonList } from './Core/Interface/ilesson-list';
import { ListLessonService } from './Core/Services/list-lesson.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { DeleteLessonComponent } from "./Components/delete-lesson/delete-lesson.component";
import { DeleteLessonService } from './Core/Services/delete-lesson.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterLink, DeleteLessonComponent , CommonModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent implements OnInit {
  ListLessonData: IPaginationResponse<ILessonList> = {} as IPaginationResponse<ILessonList>;
  @Input() courseId: number = 0;
  isDeletePopupVisible = false;
  selectedDeleteLesson: ILessonList | null = null;
  private router = inject(Router);
  private subscriptioncall = new Subscription();

  constructor(private _listLessonService: ListLessonService, private _deleteLessonService: DeleteLessonService) {}

  ngOnInit(): void {
    this.getAlllesson()
  }
  getAlllesson() {
    this._listLessonService.getLessons(this.courseId).subscribe((res: IPaginationResponse<ILessonList>) => {
      this.ListLessonData = res;
    });
  }

  closeDeletePopup(): void {
    this.isDeletePopupVisible = false;
    this.selectedDeleteLesson = null;
  }
  openDeleteLessonPopup(lesson: ILessonList): void {
    if (!lesson.id) {
      console.error('❌ Cannot delete task: Task ID is missing');
      return;
    }

    this.isDeletePopupVisible = true;
    this.selectedDeleteLesson = lesson;
  }
  deleteLesson(): void {
    if (!this.selectedDeleteLesson?.id) {
      console.error('❌ No task selected for deletion');
      return;
    }
    this._deleteLessonService.deleteLesson(this.selectedDeleteLesson?.id).subscribe({
      next: (response: any) => {
        if (response.success) {
          console.log('✅ Instructor task deleted successfully');
          this.closeDeletePopup();
          this.getAlllesson();
        } else {
          console.error('❌ Failed to delete instructor task:', response.message);
          alert('Failed to delete task: ' + response.message);
        }
      },
      error: (error: any) => {
        console.error('❌ Error deleting instructor task:', error);
        alert('Error deleting task. Please try again.');
      }
    });
  }

  openEditLessonPopup(lesson: ILessonList): void {
    if (!lesson.id) {
      console.error('Lesson ID missing');
      return;
    }
    this.router.navigate([{ outlets: { dialog: ['editLesson', lesson.id] } }]);
  }
}
