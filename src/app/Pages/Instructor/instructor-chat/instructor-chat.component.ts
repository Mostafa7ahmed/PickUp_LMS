import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course, Message, User } from './Core/interfaces/ichat';
import { LoginService } from '../../../Core/Services/login.service';
import { Decode } from '../../../Core/Interface/user';
import { ChatServiceService } from './Core/services/chat-service.service';
import { environment } from '../../../Environments/environment';



@Component({
  selector: 'app-instructor-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructor-chat.component.html',
  styleUrl: './instructor-chat.component.scss'
})
export class InstructorChatComponent {
  private chatData = inject(ChatServiceService)
  private userDataservice = inject(LoginService)
  dataUser: Decode = {} as Decode;

  courses: Course[] = [];
  ngOnInit() {
    this.courses = this.chatData.courses;
    this.dataUser = this.userDataservice.saveUserAuth();
    console.log(this.dataUser)

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  currentUser: User = {
    id: 1,
    name: this.dataUser.UserName,
    avatar:  this.dataUser.Photo ? environment.baseUrlFiles +  this.dataUser.Photo : 'https://i.pravatar.cc/150?img=60',
    role: 'instructor',
    online: true
  };




  selectedCourse: Course | null = null;
  newMessage: string = '';
  searchTerm: string = '';
  showEmojiPicker: boolean = false;
  showStudentsList: boolean = true;
  isLoading: boolean = true;


  selectCourse(course: Course) {
    if (this.selectedCourse?.id === course.id) {
      return; // Already selected
    }

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
        content: this.newMessage.trim(),
        timestamp: new Date(),
        type: 'text',
        avatar: this.dataUser.Photo ? environment.baseUrlFiles +  this.dataUser.Photo : 'https://i.pravatar.cc/150?img=60',
        senderName:   this.dataUser.UserName,
        role: this.currentUser.role
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