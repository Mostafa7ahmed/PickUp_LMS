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
import { NzMessageService } from 'ng-zorro-antd/message';
import { GetOneLessonService } from '../../Core/Services/get-one-lesson.service';
import { UpdateLessonService } from '../../Core/Services/update-lesson.service';
import { ILessonRes } from '../../Core/Interface/ilesson-res';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';

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
  private message = inject(NzMessageService);
  private _getOneLessonService = inject(GetOneLessonService);
  private _updateLessonService = inject(UpdateLessonService);

  lessonForm = this._formBuilder.group({
    name: ['', Validators.required ,Validators.minLength(3)],
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
  previewingVideoIndex: number = -1;

  isImageLoading = false;
  isIntroVideoLoading = false;
  isVideoUploading = false;
  isFileUploading = false;
  isCreatingLesson = false;

  isEditMode: boolean = false;
  lessonId: number | null = null;
  editModeCourseId: number | null = null;

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



  toggleVideoPrivacy(index: number) {
    this.lessonVideos[index].free = !this.lessonVideos[index].free;
  }

onVideoUpload(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (!this.canUploadVideo) {
      (event.target as HTMLInputElement).value = '';
      return;
    }

    this.isVideoUploading = true;
    this._streamService.upload(file, StreamType.video).subscribe({
      next: (response) => {
        if (response.body?.success) {
          const result = response.body.result;
          // Use id from backend response
          setTimeout(() => {
            const newVideoIndex = this.lessonVideos.length;
            const lessonName = this.lessonForm.get('name')?.value as string;
            let autoName = '';
            if (lessonName && lessonName.trim()) {
              autoName = `${lessonName.trim()} - Part ${newVideoIndex + 1}`;
            } else {
              autoName = `Video ${newVideoIndex + 1}`;
            }

            if (autoName.length < 3) {
              autoName = `Video ${newVideoIndex + 1}`;
            }

            this.lessonVideos.push({
              id: result.id,
              videoUrl: result.url,
              displayUrl: environment.baseUrlFiles + result.url,
              free: false,
              name: autoName
            });
            this.isVideoUploading = false;
            this.message.success(`Video "${autoName}" uploaded successfully`);
          }, 800);
        }
      },
      error: (error) => {
        console.error('Error uploading video:', error);
        this.isVideoUploading = false;
        this.message.error('Error uploading video. Please try again');
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

  removeCoverPhoto(): void {
    this.imagePreview = null;
    this.lessonForm.patchValue({ photoUrl: '' });
  }

  isCreateButtonDisabled(): boolean {
    if (this.isEditMode) {
      // In edit mode, allow updating without adding new videos/files
      return (
        this.lessonForm.invalid ||
        this.isAnyFileUploading ||
        this.isCreatingLesson
      );
    }
    // original checks for create
    return (
      !this.selectedCourse ||
      this.lessonForm.invalid ||
      this.lessonVideos.length === 0 ||
      this.hasInvalidVideoNames() ||
      this.isAnyFileUploading ||
      this.isCreatingLesson
    );
  }

  hasInvalidVideoNames(): boolean {
    if (this.isEditMode) return false; // allow existing names
    return this.lessonVideos.some(video => !video.name || video.name.trim().length < 3);
  }

  get createButtonText(): string {
    if (this.isCreatingLesson) {
      return this.isEditMode ? 'Updating...' : 'Creating...';
    }
    return this.isEditMode ? 'Update Lesson' : 'Create Lesson';
  }

  get isAnyFileUploading(): boolean {
    return this.isImageLoading || this.isIntroVideoLoading || this.isVideoUploading || this.isFileUploading;
  }

  get canUploadVideo(): boolean {
    const lessonName = this.lessonForm.get('name')?.value as string;
    return !!(lessonName && lessonName.trim());
  }

  getCreateButtonTooltip(): string {
    if (!this.selectedCourse && !this.isEditMode) {
      return 'Please select a course first';
    }
    if (this.lessonForm.invalid) {
      return 'Please fill all required fields';
    }
    if (this.lessonVideos.length === 0 && !this.isEditMode) {
      return 'Please add at least one video';
    }
    if (this.hasInvalidVideoNames()) {
      return 'Video names must be at least 3 characters long';
    }
    if (this.isAnyFileUploading) {
      return 'Please wait for uploads to complete';
    }
    return this.isEditMode ? 'Update lesson' : 'Create lesson';
  }



  toggleVideoPreview(index: number): void {
    this.previewingVideoIndex = this.previewingVideoIndex === index ? -1 : index;
  }

  closeVideoPreview(): void {
    this.previewingVideoIndex = -1;
  }

  autoRenameAllVideos(lessonName: string): void {
    this.lessonVideos.forEach((video, index) => {
      let newName = `${lessonName} - Part ${index + 1}`;
      // التأكد من أن الاسم على الأقل 3 أحرف
      if (newName.length < 3) {
        newName = `Video ${index + 1}`;
      }
      video.name = newName;
    });
  }
  createLesson() {
    if (this.isEditMode) {
      this.updateLesson();
      return;
    }

    if (!this.selectedCourse) {
      this.message.error('Please select a course first');
      return;
    }

    if (this.lessonForm.invalid) {
      this.message.error('Please fill all required fields');
      return;
    }

    if (this.lessonVideos.length === 0) {
      this.message.error('Please add at least one video');
      return;
    }

    if (this.hasInvalidVideoNames()) {
      this.message.error('Video names must be at least 3 characters long');
      return;
    }

    if (this.isCreateButtonDisabled()) {
      return;
    }

    this.isCreatingLesson = true;

    const formValue = this.lessonForm.value;
    const lessonData: ICreateLessonRequest = {
      courseId: this.selectedCourse!.id,
      name: (formValue.name as string) || '',
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
        this.isCreatingLesson = false;
        if (response.success) {
                   this.closePopup();

          this.message.success('Lesson created successfully!');

        } else {
          this.message.error('Error creating lesson');
        }
      },
      error: (error) => {
        console.error('Error creating lesson:', error);
        this.isCreatingLesson = false;
        this.message.error('Error creating lesson. Please try again');
      }
    });
  }

  updateLesson() {
    if (!this.lessonId) return;
    
    // Build the lesson data same as create
    const formValue = this.lessonForm.value;
    const lessonData: ICreateLessonRequest = {
      courseId: this.selectedCourse?.id || 1, // Use 1 as default for edit mode
      name: (formValue.name as string) || '',
      description: formValue.description || '',
      photoUrl: formValue.photoUrl || '',
      introductionVideoUrl: formValue.introductionVideoUrl || '',
      fileUrls: (formValue.fileUrls || []).filter(url => url !== null && url !== undefined),
      videos: this.lessonVideos.map(video => ({
        id: video.id,
        videoUrl: video.videoUrl,
        free: video.free,
        name: video.name
      })),
      tags: (formValue.tags || []).map((tag: ITag) => ({
        id: tag.id || 0,
        name: tag.name
      }))
    };
    
    this.isCreatingLesson = true;
    this._updateLessonService.updateLesson(this.lessonId, lessonData).subscribe({
      next: (res: IResponseOf<ILessonRes>) => {
        this.isCreatingLesson = false;
        if (res.success) {
          this.message.success('Lesson updated successfully');
          this.closePopup();
        }
      },
      error: (error) => {
        this.isCreatingLesson = false;
        console.error('Error updating lesson:', error);
        this.message.error('Error updating lesson. Please try again');
      }
    });
  }

  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  ngOnInit() {
    // determine if editing
    const lessonIdParam = this._activatedRoute.snapshot.paramMap.get('lessonId');
    if (lessonIdParam) {
      this.isEditMode = true;
      this.lessonId = +lessonIdParam;
      this.editModeCourseId = +this._activatedRoute.snapshot.paramMap.get('courseId')!;
      this.loadLessonData(this.lessonId);
    }

    this.getCourse();
    this.getTagsList();

    // مراقبة تغيير اسم الدرس لإعادة تسمية الفيديوهات تلقائياً
    this.lessonForm.get('name')?.valueChanges.subscribe(lessonName => {
      const name = lessonName as string;
      if (name && name.trim() && this.lessonVideos.length > 0 && !this.isEditMode) {
        this.autoRenameAllVideos(name.trim());
      }
    });
  }

  loadLessonData(id: number) {
    this._getOneLessonService.getLesson(id).subscribe({
      next: (res: IResponseOf<ILessonRes>) => {
        if (res.success) {
          const lesson: ILessonRes = res.result;
          
          // Update form with lesson data
          this.lessonForm.patchValue({
            name: lesson.name,
            description: lesson.description,
            introductionVideoUrl: lesson.introductionVideoUrl,
            tags: lesson.tags,
            photoUrl: lesson.photoUrl || '',
            fileUrls: lesson.fileUrls || []
          });
          
          // Set intro video preview if exists
          if (lesson.introductionVideoUrl) {
            this.introVideoPreview = this.baseUrl + lesson.introductionVideoUrl;
          }
          
          // Set lesson cover photo preview if exists
          if (lesson.photoUrl) {
            this.imagePreview = this.baseUrl + lesson.photoUrl;
          }
          
          // Populate uploaded files (references)
          if (lesson.fileUrls && lesson.fileUrls.length > 0) {
            this.uploadedFiles = lesson.fileUrls.map(url => {
              const fileName = this.extractFileName(url);
              return {
                name: fileName,
                url: url,
                displayUrl: this.baseUrl + url,
                size: 0 // Size unknown; can be updated later if needed
              };
            });
          }
          
          // Populate videos
          this.lessonVideos = lesson.videos.map(v => ({
            id: v.id,
            videoUrl: v.url,
            displayUrl: this.baseUrl + v.url,
            free: v.free,
            name: v.name
          }));
        }
      },
      error: (error) => {
        console.error('Error loading lesson data:', error);
        this.message.error('Error loading lesson data');
      }
    });
  }

  // Helper to extract filename from a url (supports both absolute and relative)
  private extractFileName(url: string): string {
    try {
      return url.split('/').pop() || url;
    } catch {
      return url;
    }
  }
}
