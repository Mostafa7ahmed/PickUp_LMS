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
  type: 'text';
}

interface Conversation {
  id: number;
  participant: User;
  course?: {
    name: string;
    code: string;
    image: string;
  };
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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    role: 'student',
    online: true
  };

  // Additional users for group chats
  allUsers: User[] = [
    {
      id: 1,
      name: 'Current Student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      role: 'student',
      online: true
    },
    {
      id: 2,
      name: 'Dr. Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      role: 'instructor',
      online: true
    },
    {
      id: 3,
      name: 'Prof. Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      role: 'instructor',
      online: false
    },
    {
      id: 4,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      role: 'student',
      online: true
    },
    {
      id: 5,
      name: 'Emma Brown',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e29d16?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      role: 'student',
      online: true
    },
    {
      id: 6,
      name: 'Mike Davis',
      avatar: 'https://images.unsplash.com/photo-1507019403270-cde5fb606b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      role: 'student',
      online: true
    }
  ];

  conversations: Conversation[] = [
    {
      id: 1,
      participant: {
        id: 2,
        name: 'Dr. Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        role: 'instructor',
        online: true
      },
      course: {
        name: 'Database Management Systems',
        code: 'CS-401',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
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
          content: 'I have shared a reference document in our course materials that might help you with the normalization process.',
          timestamp: new Date('2024-03-12T11:21:00'),
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      participant: {
        id: 3,
        name: 'Prof. Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        role: 'instructor',
        online: false,
        lastSeen: new Date('2024-03-12T09:45:00')
      },
      course: {
        name: 'Web Development Fundamentals',
        code: 'CS-301',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
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
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        role: 'student',
        online: true
      },
      course: {
        name: 'Data Structures & Algorithms',
        code: 'CS-202',
        image: 'https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
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
        },
        {
          id: 10,
          senderId: 1,
          content: 'Absolutely! The more the better. I\'ll create a group chat for us.',
          timestamp: new Date('2024-03-12T15:05:00'),
          type: 'text'
        }
      ]
    },
    {
      id: 4,
      participant: {
        id: 5,
        name: 'Study Group - AI Course',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        role: 'student',
        online: true
      },
      course: {
        name: 'Machine Learning & AI',
        code: 'CS-501',
        image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      },
      unreadCount: 5,
      messages: [
        {
          id: 11,
          senderId: 5,
          content: 'Has anyone started working on the machine learning project?',
          timestamp: new Date('2024-03-12T13:20:00'),
          type: 'text'
        },
        {
          id: 12,
          senderId: 6,
          content: 'I\'ve chosen the dataset and started with data preprocessing. What about you guys?',
          timestamp: new Date('2024-03-12T13:25:00'),
          type: 'text'
        },
        {
          id: 13,
          senderId: 1,
          content: 'Still deciding between image classification and NLP. Any recommendations?',
          timestamp: new Date('2024-03-12T13:30:00'),
          type: 'text'
        },
        {
          id: 14,
          senderId: 5,
          content: 'Image classification might be easier to start with. Lots of good tutorials available.',
          timestamp: new Date('2024-03-12T13:35:00'),
          type: 'text'
        }
      ]
    }
  ];

  selectedConversation: Conversation | null = null;
  newMessage: string = '';
  searchTerm: string = '';
  showEmojiPicker: boolean = false;
  isLoading: boolean = true;

  ngOnInit() {
    // Remove automatic selection to prevent flash
    // Let user manually select a conversation
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

  selectConversation(conversation: Conversation) {
    // Add smooth transition
    if (this.selectedConversation?.id === conversation.id) {
      return; // Already selected
    }
    
    this.selectedConversation = conversation;
    // Mark messages as read
    conversation.unreadCount = 0;
    
    // Scroll to bottom smoothly after selection with delay
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
  }

  private scrollToBottom() {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
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

    // Smooth scroll to bottom with improved timing
    setTimeout(() => {
      this.scrollToBottom();
    }, 150);
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

  getSenderName(message: Message): string {
    const sender = this.allUsers.find(user => user.id === message.senderId);
    if (sender) {
      return sender.id === this.currentUser.id ? 'You' : sender.name;
    }
    return 'Unknown User';
  }

  getSenderAvatar(message: Message): string {
    const sender = this.allUsers.find(user => user.id === message.senderId);
    if (sender) {
      return sender.avatar;
    }
    
    // Default avatar for unknown users
    return 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80';
  }

  getSenderColor(message: Message): string {
    // Generate a consistent color for each sender based on their ID
    const colors = [
      '#22c55e', '#3b82f6', '#8b5cf6', '#ef4444', 
      '#f59e0b', '#10b981', '#6366f1', '#ec4899',
      '#84cc16', '#06b6d4', '#f97316', '#8b5cf6'
    ];
    
    if (message.senderId === this.currentUser.id) {
      return '#22c55e'; // Green for current user
    }
    
    return colors[message.senderId % colors.length];
  }
} 