import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import Plyr from 'plyr';

@Component({
  selector: 'app-view-lesson',
  standalone: true,
  imports: [ButtonModule , TabsModule , CommonModule],
  templateUrl: './view-lesson.component.html',
  styleUrl: './view-lesson.component.scss'
})
export class ViewLessonComponent {
  constructor(private location: Location) {}
  value: number = 0;
  @ViewChild('player') playerRef!: ElementRef;
  player!: Plyr;
 ngAfterViewInit() {
    this.player = new Plyr(this.playerRef.nativeElement);
  }
  goBackToCourse() {
    this.location.back();
  }


  videos = [
    {
      title: 'Introduction to Web Development',
      status: 'Free',
      icon: 'fa-circle-check',
      isLocked: false
    },
    {
      title: 'HTML Fundamentals',
      status: 'Premium',
      icon: 'fa-lock',
      isLocked: true
    },
    {
      title: 'CSS Basics',
      status: 'Free',
      icon: 'fa-circle-check',
      isLocked: false
    },
    {
      title: 'JavaScript Essentials',
      status: 'Premium',
      icon: 'fa-lock',
      isLocked: true
    },
    {
      title: 'Responsive Design',
      status: 'Free',
      icon: 'fa-circle-check',
      isLocked: false
    },
    {
      title: 'Angular Fundamentals',
      status: 'Premium',
      icon: 'fa-lock',
      isLocked: true
    },
    {
      title: 'API Integration',
      status: 'Premium',
      icon: 'fa-lock',
      isLocked: true
    },
        {
      title: 'Introduction to Web Development',
      status: 'Free',
      icon: 'fa-circle-check',
      isLocked: false
    },
    {
      title: 'HTML Fundamentals',
      status: 'Premium',
      icon: 'fa-lock',
      isLocked: true
    },
    {
      title: 'CSS Basics',
      status: 'Free',
      icon: 'fa-circle-check',
      isLocked: false
    },
    {
      title: 'JavaScript Essentials',
      status: 'Premium',
      icon: 'fa-lock',
      isLocked: true
    },
    {
      title: 'Responsive Design',
      status: 'Free',
      icon: 'fa-circle-check',
      isLocked: false
    },
    {
      title: 'Angular Fundamentals',
      status: 'Premium',
      icon: 'fa-lock',
      isLocked: true
    },
    {
      title: 'API Integration',
      status: 'Premium',
      icon: 'fa-lock',
      isLocked: true
    }
  ];

  resources = [
    {
      title: 'Lesson Slides',
      type: 'PDF',
      size: '2.4 MB',
      icon: 'fa-file-pdf',
      color: '#F87171'
    },
    {
      title: 'Exercise Worksheet',
      type: 'XLSX',
      size: '1.1 MB',
      icon: 'fa-file-excel',
      color: '#34D399'
    },
    {
      title: 'Code Samples',
      type: 'ZIP',
      size: '3.7 MB',
      icon: 'fa-file-archive',
      color: '#60A5FA'
    },
    {
      title: 'Project Brief',
      type: 'DOCX',
      size: '850 KB',
      icon: 'fa-file-word',
      color: '#4F46E5'
    },
    {
      title: 'Extra Resources',
      type: 'ZIP',
      size: '5.1 MB',
      icon: 'fa-file-archive',
      color: '#60A5FA'
    },
    {
      title: 'Final Quiz Answers',
      type: 'PDF',
      size: '1.3 MB',
      icon: 'fa-file-pdf',
      color: '#F87171'
    },
    {
      title: 'Exercise Worksheet',
      type: 'XLSX',
      size: '1.1 MB',
      icon: 'fa-file-excel',
      color: '#34D399'
    },
    {
      title: 'Code Samples',
      type: 'ZIP',
      size: '3.7 MB',
      icon: 'fa-file-archive',
      color: '#60A5FA'
    },
    {
      title: 'Project Brief',
      type: 'DOCX',
      size: '850 KB',
      icon: 'fa-file-word',
      color: '#4F46E5'
    },
    {
      title: 'Extra Resources',
      type: 'ZIP',
      size: '5.1 MB',
      icon: 'fa-file-archive',
      color: '#60A5FA'
    },
    {
      title: 'Final Quiz Answers',
      type: 'PDF',
      size: '1.3 MB',
      icon: 'fa-file-pdf',
      color: '#F87171'
    }
  ];
}
