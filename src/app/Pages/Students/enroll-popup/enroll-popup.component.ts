import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EnrollmentService } from './enrollment.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-enroll-popup',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl:'./enroll-popup.component.html',
  styleUrls:['./enroll-popup.component.scss']
})
export class EnrollPopupComponent implements OnInit {
  courseId: number = 0;
  loading = false;
  coupon = '';
  
  constructor(
    private enrollSrv: EnrollmentService,
    private msg: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('EnrollPopupComponent initialized');
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Course ID from route:', this.courseId);
  }

  close(): void {
    // Close the dialog outlet and stay on current page
    this.router.navigate([{ outlets: { dialog: null } }], { relativeTo: this.route.parent });
  }

  submit(): void {
    if (this.loading) return;
    this.loading = true;
    this.enrollSrv.enroll(this.courseId, this.coupon).subscribe({
      next: () => {
        this.msg.success('تم التسجيل بنجاح');
        this.close();
      },
      error: () => {
        this.msg.error('فشل في التسجيل');
        this.loading = false;
      }
    });
  }
} 