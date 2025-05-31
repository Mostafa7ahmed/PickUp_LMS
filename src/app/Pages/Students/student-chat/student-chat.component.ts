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

interface Conversation {
  id: number;
  participant: User;
  lastMessage?: Message;
  unreadCount: number;
  messages: Message[];
}

@Component({
  selector: 'app-student-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-chat.component.html',
  styleUrl: './student-chat.component.scss'
})
export class StudentChatComponent {
  currentUser: User = {
    id: 1,
    name: 'Current Student',
    avatar: 'Images/public/Images/dr.jpeg',
    role: 'student',
    online: true
  };

  conversations: Conversation[] = [
    {
      id: 1,
      participant: {
        id: 2,
        name: 'Dr. Sarah Wilson',
        avatar: 'Images/dr.jpeg',
        role: 'instructor',
        online: true
      },
      unreadCount: 2,
      messages: [
        {
          id: 1,
          senderId: 2,
          content: 'Hi! I noticed you have some questions about the database assignment. Feel free to ask if you need any clarification.',
          timestamp: new Date('2024-03-12T10:30:00'),
          type: 'text'
        },
        {
          id: 2,
          senderId: 1,
          content: 'Thank you Dr. Wilson! I was wondering about the normalization requirements. Should we go up to 3NF or is BCNF required?',
          timestamp: new Date('2024-03-12T11:15:00'),
          type: 'text'
        },
        {
          id: 3,
          senderId: 2,
          content: 'Great question! For this assignment, 3NF is sufficient. However, if you want to challenge yourself, you can implement BCNF for extra credit.',
          timestamp: new Date('2024-03-12T11:20:00'),
          type: 'text'
        },
        {
          id: 4,
          senderId: 2,
          content: 'I\'ve attached a reference document that might help you with the normalization process.',
          timestamp: new Date('2024-03-12T11:21:00'),
          type: 'file',
          fileName: 'Normalization_Guide.pdf'
        }
      ]
    },
    {
      id: 2,
      participant: {
        id: 3,
        name: 'Prof. Michael Chen',
        avatar: 'Images/dr.jpeg',
        role: 'instructor',
        online: false,
        lastSeen: new Date('2024-03-12T09:45:00')
      },
      unreadCount: 0,
      messages: [
        {
          id: 5,
          senderId: 1,
          content: 'Hello Professor Chen, when will the web development project requirements be posted?',
          timestamp: new Date('2024-03-11T16:20:00'),
          type: 'text'
        },
        {
          id: 6,
          senderId: 3,
          content: 'Hi! The requirements will be posted by Thursday. Make sure to check the course materials section.',
          timestamp: new Date('2024-03-11T17:00:00'),
          type: 'text'
        }
      ]
    },
    {
      id: 3,
      participant: {
        id: 4,
        name: 'Alex Johnson',
        avatar: 'Images/dr.jpeg',
        role: 'student',
        online: true
      },
      unreadCount: 1,
      messages: [
        {
          id: 7,
          senderId: 4,
          content: 'Hey! Are you planning to form a study group for the algorithms exam?',
          timestamp: new Date('2024-03-12T14:30:00'),
          type: 'text'
        },
        {
          id: 8,
          senderId: 1,
          content: 'Yes! I was thinking about it. We could meet in the library this weekend.',
          timestamp: new Date('2024-03-12T14:45:00'),
          type: 'text'
        },
        {
          id: 9,
          senderId: 4,
          content: 'Perfect! Should we invite Emma and Mike as well?',
          timestamp: new Date('2024-03-12T15:00:00'),
          type: 'text'
        }
      ]
    },
    {
      id: 4,
      participant: {
        id: 5,
        name: 'Study Group - AI Course',
        avatar: 'Images/dr.jpeg',
        role: 'student',
        online: true
      },
      unreadCount: 5,
      messages: [
        {
          id: 10,
          senderId: 4,
          content: 'Has anyone started working on the machine learning project?',
          timestamp: new Date('2024-03-12T13:20:00'),
          type: 'text'
        },
        {
          id: 11,
          senderId: 6,
          content: 'I\'ve chosen the dataset and started with data preprocessing. What about you guys?',
          timestamp: new Date('2024-03-12T13:25:00'),
          type: 'text'
        }
      ]
    }
  ];

  selectedConversation: Conversation | null = null;
  newMessage: string = '';
  searchTerm: string = '';
  showEmojiPicker: boolean = false;

  ngOnInit() {
    // Load first conversation
    if (this.conversations.length > 0) {
      this.selectConversation(this.conversations[0]);
    }
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    // Mark messages as read
    conversation.unreadCount = 0;
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation) return;

    const message: Message = {
      id: Date.now(),
      senderId: this.currentUser.id,
      content: this.newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    this.selectedConversation.messages.push(message);
    this.selectedConversation.lastMessage = message;
    this.newMessage = '';

    // Scroll to bottom
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  }

  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  }

  formatDate(date: Date): string {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 3600);

    if (diffInHours < 24) {
      return 'Today';
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString();
    }
  }

  get filteredConversations() {
    if (!this.searchTerm) return this.conversations;
    
    return this.conversations.filter(conv => 
      conv.participant.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getTotalUnreadCount(): number {
    return this.conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  }

  isMessageFromCurrentUser(message: Message): boolean {
    return message.senderId === this.currentUser.id;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.selectedConversation) {
      // In a real app, you would upload the file to a server
      const message: Message = {
        id: Date.now(),
        senderId: this.currentUser.id,
        content: `Shared a file: ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        fileName: file.name
      };

      this.selectedConversation.messages.push(message);
      this.selectedConversation.lastMessage = message;
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
      const hoursAgo = Math.floor((new Date().getTime() - user.lastSeen.getTime()) / (1000 * 3600));
      if (hoursAgo < 1) {
        return 'Last seen a few minutes ago';
      } else if (hoursAgo < 24) {
        return `Last seen ${hoursAgo} hours ago`;
      } else {
        return `Last seen ${Math.floor(hoursAgo / 24)} days ago`;
      }
    }
    return 'Offline';
  }
} 