export interface Notification {
      id: number;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'course' | 'assignment' | 'grade' | 'announcement';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}


