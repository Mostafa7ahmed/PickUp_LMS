import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  avatar: string;
  role: 'instructor' | 'student';
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
  fileUrl?: string;
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
    name: 'Dr. Current Instructor',
    avatar: 'Images/avatars/instructor.jpg',
    role: 'instructor',
    online: true
  };

  courses: Course[] = [
    {
      id: 1,
      name: 'Database Management Systems',
      code: 'CS-401',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      unreadCount: 3,
      students: [
        {
          id: 2,
          name: 'Alice Johnson',
          avatar: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          role: 'student',
          online: true
        },
        {
          id: 3,
          name: 'Bob Smith',
          avatar: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          role: 'student',
          online: false,
          lastSeen: new Date('2024-03-12T09:30:00')
        },
        {
          id: 4,
          name: 'Carol Davis',
          avatar: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          role: 'student',
          online: true
        }
      ],
      messages: [
        {
          id: 1,
          senderId: 2,
          content: 'Professor, I have a question about the normalization assignment. Could you clarify the requirements for 3NF?',
          timestamp: new Date('2024-03-12T10:30:00'),
          type: 'text'
        },
        {
          id: 2,
          senderId: 1,
          content: 'Hi Alice! For 3NF, make sure every non-key attribute is fully functionally dependent on the primary key and not transitively dependent.',
          timestamp: new Date('2024-03-12T11:00:00'),
          type: 'text'
        },
        {
          id: 3,
          senderId: 3,
          content: 'I\'m also struggling with the ER diagram part. Do we need to include all the relationships?',
          timestamp: new Date('2024-03-12T11:15:00'),
          type: 'text'
        },
        {
          id: 4,
          senderId: 1,
          content: 'Yes Bob, include all relationships. I\'ll post a reference guide shortly.',
          timestamp: new Date('2024-03-12T11:20:00'),
          type: 'text'
        },
        {
          id: 5,
          senderId: 4,
          content: 'Thank you professor! This is very helpful.',
          timestamp: new Date('2024-03-12T12:00:00'),
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      name: 'Web Development Fundamentals',
      code: 'CS-301',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      unreadCount: 1,
      students: [
        {
          id: 5,
          name: 'David Wilson',
          avatar: 'Images/avatars/student4.jpg',
          role: 'student',
          online: true
        },
        {
          id: 6,
          name: 'Emma Brown',
          avatar: 'Images/avatars/student5.jpg',
          role: 'student',
          online: true
        },
        {
          id: 7,
          name: 'Frank Miller',
          avatar: 'Images/avatars/student6.jpg',
          role: 'student',
          online: false,
          lastSeen: new Date('2024-03-11T16:45:00')
        }
      ],
      messages: [
        {
          id: 6,
          senderId: 5,
          content: 'Hi Professor! When will the React project requirements be available?',
          timestamp: new Date('2024-03-11T15:20:00'),
          type: 'text'
        },
        {
          id: 7,
          senderId: 1,
          content: 'Hi David! I\'ll post them by Thursday. Make sure to review the previous JavaScript modules first.',
          timestamp: new Date('2024-03-11T16:00:00'),
          type: 'text'
        },
        {
          id: 8,
          senderId: 6,
          content: 'Should we work in teams or individually?',
          timestamp: new Date('2024-03-12T09:15:00'),
          type: 'text'
        }
      ]
    },
    {
      id: 3,
      name: 'Machine Learning & AI',
      code: 'CS-501',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      unreadCount: 0,
      students: [
        {
          id: 8,
          name: 'Grace Lee',
          avatar: 'Images/avatars/student7.jpg',
          role: 'student',
          online: false,
          lastSeen: new Date('2024-03-12T08:20:00')
        },
        {
          id: 9,
          name: 'Henry Taylor',
          avatar: 'Images/avatars/student8.jpg',
          role: 'student',
          online: true
        }
      ],
      messages: [
        {
          id: 9,
          senderId: 8,
          content: 'Professor, I\'m having trouble with the neural network implementation. Could you provide some guidance?',
          timestamp: new Date('2024-03-10T14:30:00'),
          type: 'text'
        },
        {
          id: 10,
          senderId: 1,
          content: 'Of course Grace! Let\'s set up a virtual office hour session. I\'ll send you a meeting link.',
          timestamp: new Date('2024-03-10T15:00:00'),
          type: 'text'
        }
      ]
    },
    {
      id: 4,
      name: 'Data Structures & Algorithms',
      code: 'CS-202',
      image: 'https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      unreadCount: 2,
      students: [
        {
          id: 10,
          name: 'Ivy Chen',
          avatar: 'Images/avatars/student9.jpg',
          role: 'student',
          online: true
        },
        {
          id: 11,
          name: 'Jack Rodriguez',
          avatar: 'Images/avatars/student10.jpg',
          role: 'student',
          online: true
        }
      ],
      messages: [
        {
          id: 11,
          senderId: 10,
          content: 'Hi Professor! Could you explain the time complexity of merge sort again?',
          timestamp: new Date('2024-03-12T13:45:00'),
          type: 'text'
        },
        {
          id: 12,
          senderId: 11,
          content: 'I\'m also confused about the space complexity analysis.',
          timestamp: new Date('2024-03-12T14:00:00'),
          type: 'text'
        }
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
    // Remove automatic selection to prevent flash
    // Let user manually select a course
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

  selectCourse(course: Course) {
    // Add smooth transition
    if (this.selectedCourse?.id === course.id) {
      return; // Already selected
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
        content: this.newMessage.trim(),
        timestamp: new Date(),
        type: 'text'
      };

      this.selectedCourse.messages.push(message);
      this.selectedCourse.lastMessage = message;
      this.newMessage = '';
      
      // Scroll to bottom
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
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
    this.showEmojiPicker = false;
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