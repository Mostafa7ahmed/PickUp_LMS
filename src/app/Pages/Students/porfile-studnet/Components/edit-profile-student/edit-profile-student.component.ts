import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';
import { TextHeaderComponent } from '../../../../Courses/Components/text-header/text-header.component';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { StreamService } from '../../../../../Core/Services/stream.service';
import { IUpdateStudentProfile } from '../../Interface/istudent-profile';
import { StudentProfileService } from '../../Service/student-profile.service';
import { environment } from '../../../../../Environments/environment';
import { StreamType } from '../../../../../Core/Interface/stream-type';

@Component({
  selector: 'app-edit-profile-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TopPopComponent, TextHeaderComponent],
  templateUrl: './edit-profile-student.component.html',
  styleUrl: './edit-profile-student.component.scss'
})
export class EditProfileStudentComponent {
 private fb = inject(FormBuilder);
  private router = inject(Router);
  private instructorProfileService = inject(StudentProfileService);
  private streamService = inject(StreamService);
  private _location = inject(Location);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  profileForm: FormGroup;
  isLoading = false;
  isSubmitting = false;
  isVisible = true;
  isUploadingPhoto = false;
  photoPreview: string | null = null;
  selectedPhotoFile: File | null = null;

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
       bio: ['', [Validators.minLength(2)]],
      instagram: [''],
      twitter: [''],
      linkedIn: [''],
      photo: ['']
    });
  }

  ngOnInit(): void {
    this.loadCurrentProfile();
  }

  loadCurrentProfile(): void {
    this.isLoading = true;
    this.instructorProfileService.getStudentProfile().subscribe({
      next: (response) => {
        if (response.success && response.result) {
          this.profileForm.patchValue(response.result);
          if (response.result.photo) {
            this.photoPreview = environment.baseUrlFiles + response.result.photo;
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSubmitting = true;
      const profileData: IUpdateStudentProfile = this.profileForm.value;

      this.instructorProfileService.updateInstructorProfile(profileData).subscribe({
        next: (response) => {
      
                
          this.closePopup();


          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.isSubmitting = false;
          this.closePopup();
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  closePopup(): void {
    this.router.navigate(['/Student', { outlets: { dialog: null } }]);
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedPhotoFile = file;
      this.isUploadingPhoto = true;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      // Upload to server
      this.streamService.upload(file, StreamType.photo).subscribe({
        next: (response) => {
          if (response.body?.success) {
            const result = response.body.result;
            this.profileForm.patchValue({ photo: result.url });
            this.photoPreview = environment.baseUrlFiles + result.url;
          }
          this.isUploadingPhoto = false;
        },
        error: (error) => {
          console.error('Error uploading photo:', error);
          this.isUploadingPhoto = false;
        }
      });
    }
  }

  triggerPhotoUpload(): void {
    this.fileInput.nativeElement.click();
  }

  removePhoto(): void {
    this.photoPreview = null;
    this.selectedPhotoFile = null;
    this.profileForm.patchValue({ photo: '' });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${fieldName} must not exceed ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}
