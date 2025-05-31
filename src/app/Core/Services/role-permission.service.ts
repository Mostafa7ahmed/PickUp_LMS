import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {
  private router = inject(Router);

  /**
   * Get the current user's role from localStorage
   */
  getCurrentUserRole(): string | null {
    return localStorage.getItem('roles');
  }

  /**
   * Check if current user is an instructor
   */
  isInstructor(): boolean {
    return this.getCurrentUserRole() === 'Instructor';
  }

  /**
   * Check if current user is a student
   */
  isStudent(): boolean {
    return this.getCurrentUserRole()?.toLowerCase() === 'student';
  }

  /**
   * Check if user has permission for instructor-only actions
   */
  canAddContent(): boolean {
    return this.isInstructor();
  }

  /**
   * Check if user has permission for specific actions
   */
  hasPermission(permission: string): boolean {
    const role = this.getCurrentUserRole();
    
    const permissions = {
      'Instructor': [
        'create_course',
        'create_topic', 
        'create_lesson',
        'create_quiz',
        'create_stage',
        'manage_coupons',
        'view_instructor_dashboard',
        'manage_students'
      ],
      'Student': [
        'view_courses',
        'take_quiz',
        'view_progress',
        'view_certificates',
        'view_student_dashboard',
        'enroll_course'
      ]
    };

    return permissions[role as keyof typeof permissions]?.includes(permission) || false;
  }

  /**
   * Redirect user based on their role if they access unauthorized content
   */
  redirectToAuthorizedPage(): void {
    const role = this.getCurrentUserRole();
    
    if (role === 'Instructor') {
      this.router.navigate(['/Instructor/homeInstructor']);
    } else if (role?.toLowerCase() === 'student') {
      this.router.navigate(['/Student/homeStudent']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Show unauthorized access message and redirect
   */
  handleUnauthorizedAccess(action: string): void {
    console.warn(`Unauthorized access attempt: ${action} by role: ${this.getCurrentUserRole()}`);
    this.redirectToAuthorizedPage();
  }
} 