import { Component, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { ActivatedRoute } from '@angular/router';
import Plyr from 'plyr';
import { LessonDetailService } from '../../Core/Services/lesson-detail.service';
import { ILessonDetail } from '../../Core/Interface/ilesson-detail';
import { VideoService } from '../../Core/Services/video.service';

@Component({
  selector: 'app-view-lesson',
  standalone: true,
  imports: [ButtonModule , TabsModule , CommonModule],
  templateUrl: './view-lesson.component.html',
  styleUrl: './view-lesson.component.scss'
})
export class ViewLessonComponent implements OnInit {
  lessonId: number = 0;
  lessonDetail: ILessonDetail | null = null;
  isLoading: boolean = true;
  value: number = 0;
  @ViewChild('player') playerRef!: ElementRef;
  player!: Plyr;

  // Video URL cache to avoid repeated API calls
  videoUrlCache: { [videoId: number]: string } = {};
  loadingVideoIds: Set<number> = new Set();

  private videoService = inject(VideoService);

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private lessonDetailService: LessonDetailService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['lessonId']) {
        this.lessonId = +params['lessonId'];
        this.loadLessonDetail();
      }
    });
  }

  ngAfterViewInit() {
    if (this.playerRef) {
      this.player = new Plyr(this.playerRef.nativeElement);
    }
  }

  loadLessonDetail(): void {
    this.isLoading = true;
    this.lessonDetailService.getLessonDetail(this.lessonId).subscribe({
      next: (response) => {
        if (response.success) {
          this.lessonDetail = response.result;
          console.log('📚 Lesson detail loaded:', this.lessonDetail);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading lesson detail:', error);
        this.isLoading = false;
      }
    });
  }

  goBackToCourse() {
    this.location.back();
  }

  // Helper methods for template
  getVideoDuration(durationInSeconds: number): string {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getVideoStatus(video: any): string {
    return video.free ? 'Free' : 'Premium';
  }

  isVideoLocked(video: any): boolean {
    return !video.free;
  }

  // Accordion functionality
  openedIndex: number | null = null;

  toggle(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }

  // Get video statistics
  getVideoStats() {
    if (!this.lessonDetail?.videos) {
      return { total: 0, free: 0, premium: 0 };
    }

    const total = this.lessonDetail.videos.length;
    const free = this.lessonDetail.videos.filter(v => v.free).length;
    const premium = total - free;

    return { total, free, premium };
  }

  // Helper method to safely get tags
  getTags() {
    return this.lessonDetail?.tags || [];
  }

  // Helper method to check if tags exist
  hasTags(): boolean {
    return !!(this.lessonDetail?.tags && this.lessonDetail.tags.length > 0);
  }

  // Video URL methods
  getVideoUrl(videoId: number): string | null {
    return this.videoUrlCache[videoId] || null;
  }

  isVideoLoading(videoId: number): boolean {
    return this.loadingVideoIds.has(videoId);
  }

  loadVideoUrl(videoId: number): void {
    if (this.videoUrlCache[videoId] || this.loadingVideoIds.has(videoId)) {
      return; // Already loaded or loading
    }

    this.loadingVideoIds.add(videoId);
    console.log('🎥 Loading video URL for video ID:', videoId);

    this.videoService.getVideoUrl(videoId).subscribe({
      next: (url: string) => {
        this.videoUrlCache[videoId] = url;
        this.loadingVideoIds.delete(videoId);
        console.log('✅ Video URL loaded:', url);
      },
      error: (error: any) => {
        console.error('❌ Error loading video URL:', error);
        this.loadingVideoIds.delete(videoId);
      }
    });
  }

  // Method to handle video click/play
  onVideoClick(videoId: number): void {
    console.log('🎬 Video clicked, ID:', videoId);
    if (!this.videoUrlCache[videoId]) {
      this.loadVideoUrl(videoId);
    }
  }

}
