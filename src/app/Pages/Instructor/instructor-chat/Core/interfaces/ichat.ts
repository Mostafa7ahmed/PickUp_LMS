

export  interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  fileName?: string;
  fileUrl?: string;
  avatar?: string;
  senderName?: string;
  role?: string;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  image: string;
  students: User[];
  unreadCount: number;
  lastMessage?: Message;
  messages: Message[];
}