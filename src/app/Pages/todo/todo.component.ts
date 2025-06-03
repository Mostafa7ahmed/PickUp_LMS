import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

interface InstructorTask {
  id: number;
  title: string;
  description?: string;
  type: 'teaching' | 'grading' | 'administrative' | 'meeting' | 'personal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  
  // Filter and search
  activeFilter: string = 'all';
  searchTerm: string = '';
  
  // Modal state
  showTaskModal: boolean = false;
  isEditMode: boolean = false;
  editingTaskId: number | null = null;
  showValidation: boolean = false;
  
  // Task form for modal
  taskForm = {
    title: '',
    description: '',
    type: 'teaching' as 'teaching' | 'grading' | 'administrative' | 'meeting' | 'personal',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    dueDate: '',
    completed: false
  };
  
  // Sample tasks for instructor
  tasks: InstructorTask[] = [
    {
      id: 1,
      title: 'Prepare lecture slides for Web Development',
      description: 'Create slides for React components and state management',
      type: 'teaching',
      priority: 'high',
      dueDate: '2024-03-20',
      completed: false,
      createdAt: new Date('2024-03-15')
    },
    {
      id: 2,
      title: 'Grade midterm exams',
      description: 'Grade JavaScript fundamentals midterm exams for 45 students',
      type: 'grading',
      priority: 'urgent',
      dueDate: '2024-03-18',
      completed: false,
      createdAt: new Date('2024-03-14')
    },
    {
      id: 3,
      title: 'Faculty meeting preparation',
      description: 'Prepare curriculum update proposal',
      type: 'administrative',
      priority: 'medium',
      dueDate: '2024-03-22',
      completed: true,
      createdAt: new Date('2024-03-13')
    },
    {
      id: 4,
      title: 'Student consultation hours',
      description: 'Office hours for project guidance',
      type: 'teaching',
      priority: 'low',
      dueDate: '2024-03-21',
      completed: false,
      createdAt: new Date('2024-03-16')
    },
    {
      id: 5,
      title: 'Update course syllabus',
      description: 'Add new assignments and reading materials',
      type: 'administrative',
      priority: 'medium',
      dueDate: '2024-03-25',
      completed: false,
      createdAt: new Date('2024-03-12')
    },
    {
      id: 6,
      title: 'Review student project proposals',
      description: 'Provide feedback on 15 project proposals',
      type: 'grading',
      priority: 'high',
      dueDate: '2024-03-19',
      completed: true,
      createdAt: new Date('2024-03-11')
    }
  ];

  ngOnInit(): void {
    // Set default due date to tomorrow
    this.setDefaultDueDate();
    // Add event listener to handle opening the add task form when triggered from the navbar
    window.addEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
  }

  private setDefaultDueDate(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.taskForm.dueDate = tomorrow.toISOString().split('T')[0];
  }

  // Modal methods
  openAddTaskPopup(): void {
    this.isEditMode = false;
    this.editingTaskId = null;
    this.showValidation = false;
    this.resetTaskForm();
    this.setDefaultDueDate();
    this.showTaskModal = true;
  }

  openEditTaskPopup(task: InstructorTask): void {
    this.isEditMode = true;
    this.editingTaskId = task.id;
    this.showValidation = false;
    this.taskForm = {
      title: task.title,
      description: task.description || '',
      type: task.type,
      priority: task.priority,
      dueDate: task.dueDate,
      completed: task.completed
    };
    this.showTaskModal = true;
  }

  closeTaskModal(): void {
    this.showTaskModal = false;
    this.isEditMode = false;
    this.editingTaskId = null;
    this.showValidation = false;
    this.resetTaskForm();
  }

  private resetTaskForm(): void {
    this.taskForm = {
      title: '',
      description: '',
      type: 'teaching',
      priority: 'medium',
      dueDate: '',
      completed: false
    };
  }

  saveTask(): void {
    if (!this.taskForm.title.trim()) {
      this.showValidation = true;
      return;
    }

    if (this.isEditMode && this.editingTaskId) {
      // Update existing task
      const taskIndex = this.tasks.findIndex(t => t.id === this.editingTaskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          title: this.taskForm.title.trim(),
          description: this.taskForm.description.trim(),
          type: this.taskForm.type,
          priority: this.taskForm.priority,
          dueDate: this.taskForm.dueDate,
          completed: this.taskForm.completed
        };
      }
    } else {
      // Add new task
      const newTask: InstructorTask = {
        id: Date.now(),
        title: this.taskForm.title.trim(),
        description: this.taskForm.description.trim(),
        type: this.taskForm.type,
        priority: this.taskForm.priority,
        dueDate: this.taskForm.dueDate,
        completed: false,
        createdAt: new Date()
      };
      this.tasks.unshift(newTask);
    }

    this.closeTaskModal();
  }

  // Filter methods
  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  getFilterTitle(): string {
    switch (this.activeFilter) {
      case 'teaching': return 'Teaching Tasks';
      case 'grading': return 'Grading Tasks';
      case 'administrative': return 'Administrative Tasks';
      default: return 'All Tasks';
    }
  }

  getFilteredTasks(): InstructorTask[] {
    let filtered = this.tasks;

    // Apply type filter
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(task => task.type === this.activeFilter);
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort by priority and due date
    return filtered.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Sort by priority
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Sort by due date
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  // Statistics methods
  getTotalTasks(): number {
    return this.tasks.length;
  }

  getCompletedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  getPendingTasks(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  // Task management methods
  updateTaskStatus(task: InstructorTask): void {
    // Task status is already updated via two-way binding
    // You could add additional logic here like saving to backend
  }

  deleteTask(task: InstructorTask): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  // Utility methods
  trackByTaskId(index: number, task: InstructorTask): number {
    return task.id;
  }

  getTaskTypeIcon(type: string): string {
    switch (type) {
      case 'teaching': return 'fa-solid fa-chalkboard-teacher';
      case 'grading': return 'fa-solid fa-clipboard-check';
      case 'administrative': return 'fa-solid fa-briefcase';
      case 'meeting': return 'fa-solid fa-users';
      case 'personal': return 'fa-solid fa-user';
      default: return 'fa-solid fa-tasks';
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'urgent': return 'fa-solid fa-exclamation-triangle';
      case 'high': return 'fa-solid fa-arrow-up';
      case 'medium': return 'fa-solid fa-minus';
      case 'low': return 'fa-solid fa-arrow-down';
      default: return 'fa-solid fa-minus';
    }
  }

  isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }

  formatDueDate(dueDate: string): string {
    if (!dueDate) return 'No due date';
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays === -1) return 'Due yesterday';
    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    
    return due.toLocaleDateString();
  }

  getEmptyStateMessage(): string {
    switch (this.activeFilter) {
      case 'teaching': return 'No teaching tasks found. Add a new lesson preparation or student activity.';
      case 'grading': return 'No grading tasks found. All caught up with your grading!';
      case 'administrative': return 'No administrative tasks found. Stay organized!';
      default: return 'No tasks found. Add your first task to get started!';
    }
  }

  ngOnDestroy(): void {
    // Clean up event listener
    window.removeEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
  }

  openAddTaskForm(): void {
    this.openAddTaskPopup();
    // Scroll to the modal or form
    setTimeout(() => {
      const modalElement = document.querySelector('.task-modal');
      if (modalElement) {
        modalElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }
}
