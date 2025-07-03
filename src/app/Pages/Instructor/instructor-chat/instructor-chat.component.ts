import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
  lastSeen?: Date;
}

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  fileName?: string;
  name?:string,
  fileUrl?: string;
  avatar?: string;
  senderName?: string;
  role?: string;
}

interface Course {
  id: number;
  name: string;
  code: string;
  image: string;
  students: User[];
  unreadCount: number;
  lastMessage?: Message;
  messages: Message[];
}

@Component({
  selector: 'app-instructor-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructor-chat.component.html',
  styleUrl: './instructor-chat.component.scss'
})
export class InstructorChatComponent {
  currentUser: User = {
    id: 1,
    name: 'Dr. Mostafa Hamed',
    avatar: "https://i.pravatar.cc/150?img=1",
    role: 'instructor',
    online: true
  };

courses: Course[] = [
  {
    id: 1,
    name: 'Database Management Systems',
    code: 'CS-401',
    image: 'https://s7280.pcdn.co/wp-content/uploads/2021/12/introduction-of-dbms.webp',
    unreadCount: 5,
    students: [
      { id: 2, name: 'Ahmed Khaled', avatar: 'https://i.pravatar.cc/150?img=11', role: 'student', online: true },
      { id: 3, name: 'Menna Saeed', avatar: 'https://i.pravatar.cc/150?img=47', role: 'student', online: false, lastSeen: new Date('2024-03-12T09:30:00') },
      { id: 4, name: 'Ali Ibrahim', avatar: 'https://i.pravatar.cc/150?img=14', role: 'student', online: true },
      { id: 12, name: 'Salma Mostafa', avatar: 'https://i.pravatar.cc/150?img=51', role: 'student', online: false, lastSeen: new Date('2024-03-10T17:00:00') },
      { id: 13, name: 'Yasser Samir', avatar: 'https://i.pravatar.cc/150?img=52', role: 'student', online: true },
      { id: 14, name: 'Fatma Adel', avatar: 'https://i.pravatar.cc/150?img=53', role: 'student', online: true },
      { id: 15, name: 'Mohamed Naguib', avatar: 'https://i.pravatar.cc/150?img=54', role: 'student', online: false, lastSeen: new Date('2024-03-11T13:20:00') },
      { id: 16, name: 'Reem Hussein', avatar: 'https://i.pravatar.cc/150?img=55', role: 'student', online: true },
      { id: 17, name: 'Khaled Mansour', avatar: 'https://i.pravatar.cc/150?img=56', role: 'student', online: false, lastSeen: new Date('2024-03-09T15:45:00') },
            { id: 14, name: 'Fatma Adel', avatar: 'https://i.pravatar.cc/150?img=53', role: 'student', online: true },
      { id: 15, name: 'Mohamed Naguib', avatar: 'https://i.pravatar.cc/150?img=54', role: 'student', online: false, lastSeen: new Date('2024-03-11T13:20:00') },
      { id: 16, name: 'Reem Hussein', avatar: 'https://i.pravatar.cc/150?img=55', role: 'student', online: true },
      { id: 17, name: 'Khaled Mansour', avatar: 'https://i.pravatar.cc/150?img=56', role: 'student', online: false, lastSeen: new Date('2024-03-09T15:45:00') }
    ],
    messages: [
      { id: 1, senderId: 2, content: 'Doctor, I have a question about the normalization task. Can you explain 3NF again?', timestamp: new Date('2024-03-12T10:30:00'), type: 'text' },
      { id: 2, senderId: 1, content: 'Sure Ahmed! 3NF means all non-key attributes must depend only on the primary key, no transitive dependencies.', timestamp: new Date('2024-03-12T11:00:00'), type: 'text' },
      { id: 3, senderId: 3, content: 'I’m still not sure about the ER diagram. Should we include all relations?', timestamp: new Date('2024-03-12T11:15:00'), type: 'text' },
      { id: 4, senderId: 1, content: 'Yes Menna, include all relationships. I’ll share a reference file soon.', timestamp: new Date('2024-03-12T11:20:00'), type: 'text' },
      { id: 5, senderId: 4, content: 'Thanks, Doctor. That helps a lot!', timestamp: new Date('2024-03-12T12:00:00'), type: 'text' }
    ]
  },
  {
    id: 2,
    name: 'Web Development Fundamentals',
    code: 'CS-301',
    image: 'https://www.creativ.com.au/wp-content/uploads/2023/10/The-Fundamentals-of-Front-End-Web-Development-1024x556.png',
    unreadCount: 4,
    students: [
      { id: 5, name: 'Sara Nabil', avatar: 'https://i.pravatar.cc/150?img=45', role: 'student', online: true },
      { id: 6, name: 'Omar Tarek', avatar: 'https://i.pravatar.cc/150?img=15', role: 'student', online: true },
      { id: 7, name: 'Heba Adel', avatar: 'https://i.pravatar.cc/150?img=49', role: 'student', online: false, lastSeen: new Date('2024-03-11T16:45:00') },
      { id: 18, name: 'Nada Samir', avatar: 'https://i.pravatar.cc/150?img=57', role: 'student', online: true },
      { id: 19, name: 'Tamer Saad', avatar: 'https://i.pravatar.cc/150?img=58', role: 'student', online: false, lastSeen: new Date('2024-03-12T08:05:00') },
      { id: 20, name: 'Dina Magdy', avatar: 'https://i.pravatar.cc/150?img=59', role: 'student', online: true }
    ],
    messages: [
      { id: 6, senderId: 5, content: 'Hi Doctor! When will we get the frontend project description?', timestamp: new Date('2024-03-11T15:20:00'), type: 'text' },
      { id: 7, senderId: 1, content: 'Hey Sara! You’ll get the details by Thursday inshallah. Start revising JavaScript meanwhile.', timestamp: new Date('2024-03-11T16:00:00'), type: 'text' },
      { id: 8, senderId: 6, content: 'Should we do it in pairs or solo?', timestamp: new Date('2024-03-12T09:15:00'), type: 'text' }
    ]
  },
  {
    id: 3,
    name: 'Machine Learning & AI',
    code: 'CS-501',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQRhx6_bwa3hTSpt5HkrszjTJdfLVBUcjYQ&s',
    unreadCount: 3,
    students: [
      { id: 8, name: 'Youssef Hassan', avatar: 'https://i.pravatar.cc/150?img=31', role: 'student', online: false, lastSeen: new Date('2024-03-12T08:20:00') },
      { id: 9, name: 'Mai Hossam', avatar: 'https://i.pravatar.cc/150?img=53', role: 'student', online: true },
      { id: 21, name: 'Karim Youssef', avatar: 'https://i.pravatar.cc/150?img=60', role: 'student', online: true },
      { id: 22, name: 'Salwa Fathy', avatar: 'https://i.pravatar.cc/150?img=61', role: 'student', online: false, lastSeen: new Date('2024-03-11T12:30:00') }
    ],
    messages: [
      { id: 9, senderId: 8, content: 'Doctor, I need help with the backpropagation implementation.', timestamp: new Date('2024-03-10T14:30:00'), type: 'text' },
      { id: 10, senderId: 1, content: 'Sure Youssef! I’ll send you a recorded tutorial link this evening.', timestamp: new Date('2024-03-10T15:00:00'), type: 'text' }
    ]
  },
  {
    id: 4,
    name: 'Data Structures & Algorithms',
    code: 'CS-202',
    image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    unreadCount: 2,
    students: [
      { id: 10, name: 'Nour Mahmoud', avatar: 'https://i.pravatar.cc/150?img=39', role: 'student', online: true },
      { id: 11, name: 'Karim Fathy', avatar: 'https://i.pravatar.cc/150?img=24', role: 'student', online: true },
      { id: 23, name: 'Mona Reda', avatar: 'https://i.pravatar.cc/150?img=62', role: 'student', online: false, lastSeen: new Date('2024-03-12T14:15:00') },
      { id: 24, name: 'Taher Farid', avatar: 'https://i.pravatar.cc/150?img=63', role: 'student', online: true }
    ],
    messages: [
      { id: 11, senderId: 10, content: 'Could you explain the time complexity for quick sort again?', timestamp: new Date('2024-03-12T13:45:00'), type: 'text' },
      { id: 12, senderId: 11, content: 'Also I want to make sure I understood recursion correctly.', timestamp: new Date('2024-03-12T14:00:00'), type: 'text' }
    ]
  }
];


  selectedCourse: Course | null = null;
  newMessage: string = '';
  searchTerm: string = '';
  showEmojiPicker: boolean = false;
  showStudentsList: boolean = true;
  isLoading: boolean = true;

  ngOnInit() {
    // Show loading for 5 seconds before showing the chat page
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  selectCourse(course: Course) {
    // Add smooth transition
    if (this.selectedCourse?.id === course.id) {
      return; // Already selected
    }

    // Load messages from localStorage if available
    const key = `instructor-chat-messages-course-${course.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        course.messages = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        if (course.messages.length > 0) {
          course.lastMessage = course.messages[course.messages.length - 1];
        }
      } catch (e) {
        // fallback: ignore if parse fails
      }
    }

    this.selectedCourse = course;
    // Mark messages as read
    course.unreadCount = 0;

    // Scroll to bottom smoothly after selection
    setTimeout(() => {
      this.scrollToBottom();
    }, 150);
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedCourse) {
      const message: Message = {
        id: Date.now(),
        senderId: this.currentUser.id,
        avatar:this.currentUser.avatar,
        role:this.currentUser.role,
        senderName:this.currentUser.name,
        content: this.newMessage.trim(),
        timestamp: new Date(),
        type: 'text'
      };

      this.selectedCourse.messages.push(message);
      this.selectedCourse.lastMessage = message;
      this.saveCourseMessagesToLocalStorage(this.selectedCourse);
      this.newMessage = '';
      // Scroll to bottom
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
  }

  saveCourseMessagesToLocalStorage(course: Course) {
    const key = `instructor-chat-messages-course-${course.id}`;
    // Only save messages, not the whole course object
    localStorage.setItem(key, JSON.stringify(course.messages));
  }

  private scrollToBottom() {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  formatDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  get filteredCourses() {
    if (!this.searchTerm) return this.courses;
    
    return this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.students.some(student => 
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  getTotalUnreadCount(): number {
    return this.courses.reduce((total, course) => total + course.unreadCount, 0);
  }

  isMessageFromCurrentUser(message: Message): boolean {
    return message.senderId === this.currentUser.id;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.selectedCourse) {
      const message: Message = {
        id: Date.now(),
        senderId: this.currentUser.id,
        content: `Shared a file: ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file)
      };

      this.selectedCourse.messages.push(message);
      this.selectedCourse.lastMessage = message;
      
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
  }

  addEmoji(emoji: string) {
    this.newMessage += emoji;
  }

  getStatusText(user: User): string {
    if (user.online) {
      return 'Online';
    } else if (user.lastSeen) {
      return `Last seen ${this.formatTime(user.lastSeen)}`;
    }
    return 'Offline';
  }

  toggleStudentsList() {
    this.showStudentsList = !this.showStudentsList;
  }

  getOnlineStudentsCount(course: Course): number {
    return course.students.filter(student => student.online).length;
  }

  getMessageSender(message: Message): User | null {
    if (message.senderId === this.currentUser.id) {
      return this.currentUser;
    }
    
    if (this.selectedCourse) {
      return this.selectedCourse.students.find(student => student.id === message.senderId) || null;
    }
    
    return null;
  }
} 