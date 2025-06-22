import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentProfileService } from '../../../../../Core/Services/student-profile.service';
import { IStudentProfile, IUpdateStudentProfile } from '../../../../../Core/Interface/istudent-profile';
import { TopPopComponent } from '../../../../../Components/top-pop/top-pop.component';
import { StreamService } from '../../../../../Core/Services/stream.service';
import { StreamType } from '../../../../../Core/Interface/stream-type';
import { environment } from '../../../../../Environments/environment';
import { TextHeaderComponent } from "../../../../Courses/Components/text-header/text-header.component";

@Component({
  selector: 'app-edit-student-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TopPopComponent, TextHeaderComponent],
  templateUrl: './edit-student-profile.component.html',
  styleUrl: './edit-student-profile.component.scss'
})
export class EditStudentProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private studentProfileService = inject(StudentProfileService);
  private streamService = inject(StreamService);

  profileForm: FormGroup;
  isVisible = true;
  isLoading = false;
  isSubmitting = false;
  photoPreview: string = 'Images/dr.jpeg';
  selectedFile: File | null = null;

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      bio: [''],
      instagram: [''],
      twitter: [''],
      linkedIn: [''],
      photo: ['']
    });
  }

  ngOnInit(): void {
    this.loadStudentProfile();
  }

  loadStudentProfile(): void {
    this.isLoading = true;
    this.studentProfileService.getStudentProfile().subscribe({
      next: (response) => {
        if (response.success) {
          const profile = response.result;
          this.profileForm.patchValue({
            name: profile.name,
            bio: profile.bio || '',
            instagram: profile.instagram || '',
            twitter: profile.twitter || '',
            linkedIn: profile.linkedIn || '',
            photo: profile.photo || ''
          });
          
          if (profile.photo) {
            this.photoPreview = this.getPhotoUrl(profile.photo);
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading student profile:', error);
        this.isLoading = false;
      }
    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
      
      // Upload photo
      this.uploadPhoto();
    }
  }

  uploadPhoto(): void {
    if (!this.selectedFile) return;
    
    this.streamService.upload(this.selectedFile, StreamType.photo).subscribe({
      next: (response: any) => {
        if (response.body?.success) {
          this.profileForm.patchValue({ photo: response.body.result });
        }
      },
      error: (error: any) => {
        console.error('Error uploading photo:', error);
      }
    });
  }

  onSubmit(): void {
    console.log('Submit button clicked');
    console.log('Form valid:', this.profileForm.valid);
    console.log('Form value:', this.profileForm.value);
    console.log('Is submitting:', this.isSubmitting);
    
    if (this.profileForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formValue = this.profileForm.value;
      const updateData: IUpdateStudentProfile = {
        name: formValue.name,
        bio: formValue.bio,
        instagram: formValue.instagram,
        twitter: formValue.twitter,
        linkedIn: formValue.linkedIn,
        photo: formValue.photo
      };

      console.log('Sending update data:', updateData);

      this.studentProfileService.updateStudentProfile(updateData).subscribe({
        next: (response) => {
          console.log('Update response:', response);
          if (response.success) {
            console.log('Profile updated successfully');
            this.closePopup();
            // Optionally reload the parent component
            window.location.reload();
          } else {
            console.error('Update failed:', response);
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          console.error('Error details:', error.error);
          this.isSubmitting = false;
        }
      });
    } else {
      console.log('Form validation failed or already submitting');
      if (!this.profileForm.valid) {
        console.log('Form errors:', this.profileForm.errors);
        Object.keys(this.profileForm.controls).forEach(key => {
          const control = this.profileForm.get(key);
          if (control && control.invalid) {
            console.log(`${key} errors:`, control.errors);
          }
        });
      }
    }
  }

  closePopup(): void {
    this.isVisible = false;
    this.router.navigate([{ outlets: { dialog: null } }]);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.profileForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors?.['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return null;
  }

  getPhotoUrl(photoPath: string): string {
    if (!photoPath) {
      return 'Images/dr.jpeg';
    }
    if (photoPath.startsWith('http')) {
      return photoPath;
    }
    return environment.baseUrlFiles + photoPath;
  }
} 