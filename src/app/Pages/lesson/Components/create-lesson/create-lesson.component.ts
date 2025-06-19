import { Component, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
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
import { AddlessonService } from '../../Core/Services/addlesson.service';
import { ICreateLessonRequest, ILessonVideo, ILessonFile } from '../../Core/Interface/icreate-lesson';
import { StreamService } from '../../../../Core/Services/stream.service';
import { StreamType } from '../../../../Core/Interface/stream-type';

@Component({
  selector: 'app-create-lesson',
  standalone: true,
  imports: [
    TopPopComponent, 
    TextHeaderComponent, 
    TooltipModule, 
    CommonModule, 
    SplicTextPipe, 
    MultiSelectModule, 
    KeyFilterModule, 
    DropdownModule, 
    ButtonModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.scss'
})
export class CreateLessonComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _paginateCoursesService = inject(ListCourseService);
  private _TagesService = inject(TagesService);
  private _addLessonService = inject(AddlessonService);
  private _streamService = inject(StreamService);
  private router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  lessonForm = this._formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    photoUrl: [''],
    introductionVideoUrl: [''],
    tags: [[] as ITag[]],
    fileUrls: [[] as string[]]
  });

  showDropdownCourse = false;
  selectedCourse: ListCourse | null = null; 
  baseUrl: string = environment.baseUrlFiles;
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  tagsListResponse: IPaginationResponse<ITag> = {} as IPaginationResponse<ITag>;
  isLoadCourse = false;
  uploadedFiles: ILessonFile[] = [];
  lessonVideos: ILessonVideo[] = [];
  imagePreview: string | null = null;
  introVideoPreview: string | null = null;
  editingVideoIndex: number = -1;
  editingVideoName: string = '';

  isImageLoading = false;
  isIntroVideoLoading = false;
  isVideoUploading = false;
  isFileUploading = false;
  isCreatingLesson = false;

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
    const routeCourseId = +this._activatedRoute.snapshot.paramMap.get('courseId')!;
  
    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.isLoadCourse = true;
  
      const defaultCourse = this.paginationCoursesResponse.result.find(
        (course) => course.id === routeCourseId
      );
  
      if (defaultCourse) {
        this.selectCourse(defaultCourse);
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

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.isImageLoading = true;
      this._streamService.upload(file, StreamType.photo).subscribe({
        next: (response) => {
          if (response.body?.success) {
            const result = response.body.result;
            const url = result.url;
            const displayUrl = environment.baseUrlFiles + url;
            this.imagePreview = displayUrl;
            this.lessonForm.patchValue({ photoUrl: url }); // Save original URL in form
          }
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        },
        complete: () => {
          this.isImageLoading = false;
        }
      });
    }
  }

  onFileSelectedVideo(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.isIntroVideoLoading = true;
      
      this._streamService.upload(file, StreamType.video).subscribe({
        next: (response) => {
          if (response.body?.success) {
            const result = response.body.result;
            const url = result.url;
            // Show skeleton for a brief moment after successful upload
            setTimeout(() => {
              const displayUrl = environment.baseUrlFiles + url;
              this.introVideoPreview = displayUrl;
              this.lessonForm.patchValue({ introductionVideoUrl: url });
              this.isIntroVideoLoading = false;
            }, 800);
          }
        },
        error: (error) => {
          console.error('Error uploading video:', error);
        }
      });
    }
  }

  startEditingVideo(index: number, currentName: string) {
    this.editingVideoIndex = index;
    setTimeout(() => {
      const input = document.querySelector('.edit-video-name') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    }, 0);
  }

  saveVideoName(index: number) {
    const videoName = this.lessonVideos[index].name;
    if (videoName && videoName.trim()) {
      // Name is already updated in the array due to two-way binding
      this.editingVideoIndex = -1;
    }
  }

  cancelEditingVideo() {
    this.editingVideoIndex = -1;
  }

  toggleVideoPrivacy(index: number) {
    this.lessonVideos[index].free = !this.lessonVideos[index].free;
  }

onVideoUpload(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.isVideoUploading = true;
    this._streamService.upload(file, StreamType.video).subscribe({
      next: (response) => {
        if (response.body?.success) {
          const result = response.body.result;
          // Use id from backend response
          setTimeout(() => {
            this.lessonVideos.push({
              id: result.id,
              videoUrl: result.url,
              displayUrl: environment.baseUrlFiles + result.url,
              free: false,
              name: result.name || file.name.substring(0, 40)
            });
            this.isVideoUploading = false;
          }, 800);
        }
      },
      error: (error) => {
        console.error('Error uploading video:', error);
      }
    });
  }
}

  onLessonFilesUpload(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.isFileUploading = true;
      let completedUploads = 0;
      const totalFiles = files.length;

      Array.from(files).forEach(file => {
        this._streamService.upload(file, StreamType.file).subscribe({
          next: (response) => {
            if (response.body?.success) {
              const result = response.body.result;
              const url = result.url;
              // Short delay to show the skeleton loader
              setTimeout(() => {
                this.uploadedFiles.push({
                  name: result.name || file.name,
                  url: url,
                  displayUrl: environment.baseUrlFiles + url,
                  size: result.size ? Math.round(result.size / 1024) : Math.round(file.size / 1024)
                });
                this.lessonForm.patchValue({
                  fileUrls: [...this.uploadedFiles.map(f => f.url)]
                });
                completedUploads++;
                if (completedUploads === totalFiles) {
                  this.isFileUploading = false;
                }
              }, 800); // Show skeleton for 800ms after successful upload
            }
          },
          error: (error) => {
            console.error('Error uploading file:', error);
            completedUploads++;
            if (completedUploads === totalFiles) {
              this.isFileUploading = false;
            }
          }
        });
      });
    }
  }

  removeFile(index: number, url: string) {
    this.uploadedFiles = this.uploadedFiles.filter((_, i) => i !== index);
    this.lessonForm.patchValue({
      fileUrls: [...this.uploadedFiles.map(f => f.url)]
    });
  }

  removeVideo(index: number) {
    this.lessonVideos = this.lessonVideos.filter((_, i) => i !== index);
  }

  removeIntroVideo(): void {
    this.introVideoPreview = null;
    this.lessonForm.patchValue({ introductionVideoUrl: '' });
  }

  isCreateButtonDisabled(): boolean {
    return (
      this.lessonForm.invalid ||
      !this.selectedCourse ||
      this.isImageLoading ||
      this.isIntroVideoLoading ||
      this.isVideoUploading ||
      this.isFileUploading ||
      this.isCreatingLesson
    );
  }

  get createButtonText(): string {
    if (this.isCreatingLesson) {
      return 'Creating...';
    }
    return 'Create';
  }

  get isAnyFileUploading(): boolean {
    return this.isImageLoading || this.isIntroVideoLoading || this.isVideoUploading || this.isFileUploading;
  }
  createLesson() {
    if (this.isCreateButtonDisabled()) {
      return;
    }

    this.isCreatingLesson = true;

    const formValue = this.lessonForm.value;
    const lessonData: ICreateLessonRequest = {
      courseId: this.selectedCourse!.id,
      name: formValue.name || '',
      description: formValue.description || '',
      photoUrl: formValue.photoUrl || '',
      introductionVideoUrl: formValue.introductionVideoUrl || '',
      fileUrls: (formValue.fileUrls || []).filter(url => url !== null && url !== undefined), // Filter out null values
      videos: this.lessonVideos.map(video => ({
        id: video.id,
        videoUrl: video.videoUrl, // Keep only the original URL
        free: video.free,
        name: video.name
      })),
      tags: (formValue.tags || []).map((tag: ITag) => ({
        id: tag.id || 0,
        name: tag.name
      }))
    };
    console.log( lessonData);

    this._addLessonService.createLesson(lessonData).subscribe({
      next: (response) => {
        if (response.success) {
          this.closePopup();
        }
        this.isCreatingLesson = false;
      },
      error: (error) => {
        console.error('Error creating lesson:', error);
        this.isCreatingLesson = false;
      }
    });
  }

  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  ngOnInit() {
    this.getCourse();
    this.getTagsList();
  }
}
