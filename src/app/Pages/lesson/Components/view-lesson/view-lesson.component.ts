import { Component, ElementRef, inject, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import Plyr from 'plyr';
import { GetOneLessonService } from '../../Core/Services/get-one-lesson.service';
import { ActivatedRoute } from '@angular/router';
import { ILessonRes } from '../../Core/Interface/ilesson-res';
import { Subscription } from 'rxjs';
import { environment } from '../../../../Environments/environment';
import { SelectonViewComponent } from "../selecton-view/selecton-view.component";

@Component({
  selector: 'app-view-lesson',
  standalone: true,
  imports: [ButtonModule, TabsModule, CommonModule, SelectonViewComponent],
  templateUrl: './view-lesson.component.html',
  styleUrl: './view-lesson.component.scss'
})
export class ViewLessonComponent implements OnInit, OnDestroy {
  constructor(private location: Location, private _ActivatedRoute: ActivatedRoute) {}
  private _GetOneLessonService = inject(GetOneLessonService)
  value: number = 0;
  @ViewChild('player') playerRef!: ElementRef;
  player!: Plyr;
  baseurl :string = environment.baseUrlFiles

  // API Data
  lessonData: ILessonRes | null = null;
  lessonId: number = 0;
  isLoading: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';

  // Subscriptions
  private subscription = new Subscription();
  ngOnInit(): void {
    this.subscription.add(
      this._ActivatedRoute.params.subscribe(params => {
        if (params['lessonId'] && params['lessonId'] !== '0') {
          this.lessonId = +params['lessonId'];
          this.getLessonData();
        }
      })
    );
  }

  ngAfterViewInit() {
    this.player = new Plyr(this.playerRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLessonData(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.subscription.add(
      this._GetOneLessonService.getLesson(this.lessonId).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success && response.result) {
            this.lessonData = response.result;
          } else {
            this.handleNoData();
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = 'Failed to load lesson data. Please try again.';
          console.error('Error fetching lesson:', error);
        }
      })
    );
  }

  private handleNoData(): void {
    this.hasError = true;
    this.errorMessage = 'No lesson data found.';
    this.lessonData = null;
  }

  getFreeVideosCount(): number {
    if (!this.lessonData?.videos) return 0;
    return this.lessonData.videos.filter(video => video.free).length;
  }

  getPaidVideosCount(): number {
    if (!this.lessonData?.videos) return 0;
    return this.lessonData.videos.filter(video => !video.free).length;
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  }

  goBackToCourse() {
    this.location.back();
  }




  openedIndex: number | null = null;

  toggle(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }


}
