import { Injectable } from '@angular/core';
import { Notification } from '../interface/notification';

@Injectable({
  providedIn: 'root'
})
export class GetallnotifactionService {

  constructor() { }
   notifications: Notification[] = [
        {
          id: 1,
          title: 'New Course Available',
          message: 'Check out the new Python for Data Science course now available in your catalog.',
          type: 'course',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          actionUrl: '/Student/discover'
        },
        {
          id: 2,
          title: 'Assignment Due Soon',
          message: 'Your React project assignment is due in 2 days. Don\'t forget to submit it!',
          type: 'assignment',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          actionUrl: '/Student/courses'
        },
        {
          id: 3,
          title: 'Grade Posted',
          message: 'Your grade for the JavaScript Quiz has been posted. Great job!',
          type: 'grade',
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          actionUrl: '/Student/courses'
        },
        {
          id: 4,
          title: 'Course Update',
          message: 'New materials have been added to your Digital Marketing course.',
          type: 'info',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
          actionUrl: '/Student/courses'
        },
        {
          id: 5,
          title: 'Welcome to PickUp LMS!',
          message: 'Welcome to our learning platform! Start exploring courses to begin your learning journey.',
          type: 'announcement',
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
          actionUrl: '/Student/discover'
        }
      ];
}
