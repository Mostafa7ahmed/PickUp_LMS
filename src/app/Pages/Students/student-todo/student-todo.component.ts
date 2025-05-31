import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  priorityClass: string;
  dueDate: Date;
  course?: string;
  type: 'assignment' | 'study' | 'personal' | 'exam';
  completed: boolean;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
}

interface TaskColumn {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

@Component({
  selector: 'app-student-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './student-todo.component.html',
  styleUrl: './student-todo.component.scss'
})
export class StudentTodoComponent implements OnInit, OnDestroy {
  taskColumns: TaskColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: '#3b82f6',
      tasks: [
        {
          id: 1,
          title: 'Complete Database Assignment',
          description: 'Design ER diagram for library management system',
          priority: 'High',
          priorityClass: 'high',
          dueDate: new Date('2024-03-15'),
          course: 'Database Management',
          type: 'assignment',
          completed: false,
          status: 'todo'
        },
        {
          id: 2,
          title: 'Study for Algorithms Exam',
          description: 'Review sorting algorithms and time complexity',
          priority: 'High',
          priorityClass: 'high',
          dueDate: new Date('2024-03-18'),
          course: 'Data Structures & Algorithms',
          type: 'exam',
          completed: false,
          status: 'todo'
        },
        {
          id: 3,
          title: 'Read AI Ethics Chapter',
          description: 'Chapter 5: Bias in Machine Learning',
          priority: 'Medium',
          priorityClass: 'medium',
          dueDate: new Date('2024-03-20'),
          course: 'Artificial Intelligence',
          type: 'study',
          completed: false,
          status: 'todo'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: '#f59e0b',
      tasks: [
        {
          id: 4,
          title: 'Web Development Project',
          description: 'Build responsive e-commerce website',
          priority: 'High',
          priorityClass: 'high',
          dueDate: new Date('2024-03-25'),
          course: 'Web Development',
          type: 'assignment',
          completed: false,
          status: 'in-progress'
        },
        {
          id: 5,
          title: 'Prepare Group Presentation',
          description: 'Cybersecurity best practices presentation',
          priority: 'Medium',
          priorityClass: 'medium',
          dueDate: new Date('2024-03-22'),
          course: 'Cybersecurity',
          type: 'assignment',
          completed: false,
          status: 'in-progress'
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      color: '#8b5cf6',
      tasks: [
        {
          id: 6,
          title: 'Peer Review Assignment',
          description: 'Review classmate\'s machine learning project',
          priority: 'Low',
          priorityClass: 'low',
          dueDate: new Date('2024-03-16'),
          course: 'Machine Learning',
          type: 'assignment',
          completed: false,
          status: 'review'
        }
      ]
    },
    {
      id: 'completed',
      title: 'Completed',
      color: '#10b981',
      tasks: [
        {
          id: 7,
          title: 'Submit Resume',
          description: 'Updated resume for internship applications',
          priority: 'Medium',
          priorityClass: 'medium',
          dueDate: new Date('2024-03-10'),
          type: 'personal',
          completed: true,
          status: 'completed'
        },
        {
          id: 8,
          title: 'Install Development Tools',
          description: 'Set up VS Code, Node.js, and Angular CLI',
          priority: 'Low',
          priorityClass: 'low',
          dueDate: new Date('2024-03-08'),
          course: 'Web Development',
          type: 'study',
          completed: true,
          status: 'completed'
        }
      ]
    }
  ];

  newTask: Partial<Task> = {
    title: '',
    description: '',
    priority: 'Medium',
    type: 'study',
    dueDate: new Date(),
    course: ''
  };

  showAddForm = false;
  filterType: string = 'all';
  searchTerm: string = '';
  editingTask: Task | null = null;
  showEditForm = false;
  viewingTask: Task | null = null;
  showViewModal = false;

  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Moving within the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Moving between different columns
      const task = event.previousContainer.data[event.previousIndex];
      const targetColumnId = event.container.element.nativeElement.getAttribute('data-column');
      
      // Update task status and completion based on target column BEFORE transfer
      this.updateTaskStatus(task, targetColumnId);

      // Transfer the task
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // Force change detection to ensure styling is updated
      setTimeout(() => {
        this.showSuccessMessage(`Task moved to ${this.getColumnTitle(targetColumnId)}`);
      }, 0);
    }
  }

  private updateTaskStatus(task: Task, columnId: string | null) {
    switch (columnId) {
      case 'todo':
        task.status = 'todo';
        task.completed = false;
        break;
      case 'in-progress':
        task.status = 'in-progress';
        task.completed = false;
        break;
      case 'review':
        task.status = 'review';
        task.completed = false;
        break;
      case 'completed':
        task.status = 'completed';
        task.completed = true;
        break;
    }
  }

  private getColumnTitle(columnId: string | null): string {
    const column = this.taskColumns.find(col => col.id === columnId);
    return column ? column.title : 'Unknown';
  }

  private showSuccessMessage(message: string) {
    // You could implement a toast notification here
    console.log(message);
  }

  getConnectedColumns(): string[] {
    return this.taskColumns.map(column => column.id);
  }

  addTask() {
    if (!this.newTask.title?.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: this.newTask.title,
      description: this.newTask.description || '',
      priority: this.newTask.priority as 'Low' | 'Medium' | 'High',
      priorityClass: this.newTask.priority?.toLowerCase() || 'medium',
      dueDate: this.newTask.dueDate || new Date(),
      course: this.newTask.course,
      type: this.newTask.type as 'assignment' | 'study' | 'personal' | 'exam',
      completed: false,
      status: 'todo'
    };

    // Add to first column (To Do)
    this.taskColumns[0].tasks.push(task);

    // Reset form
    this.resetNewTaskForm();
    this.showAddForm = false;
    this.showSuccessMessage('Task added successfully!');
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
    this.showEditForm = true;
  }

  viewTask(task: Task) {
    this.viewingTask = { ...task };
    this.showViewModal = true;
  }

  updateTask() {
    if (!this.editingTask || !this.editingTask.title?.trim()) return;

    // Find and update the task in the original columns
    for (const column of this.taskColumns) {
      const taskIndex = column.tasks.findIndex(t => t.id === this.editingTask!.id);
      if (taskIndex !== -1) {
        this.editingTask!.priorityClass = this.editingTask!.priority.toLowerCase();
        column.tasks[taskIndex] = { ...this.editingTask! };
        break;
      }
    }

    this.editingTask = null;
    this.showEditForm = false;
    this.showSuccessMessage('Task updated successfully!');
  }

  deleteTask(columnId: string, taskId: number) {
    const column = this.taskColumns.find(col => col.id === columnId);
    if (column) {
      const taskToDelete = column.tasks.find(task => task.id === taskId);
      if (taskToDelete && confirm(`Are you sure you want to delete "${taskToDelete.title}"?`)) {
        column.tasks = column.tasks.filter(task => task.id !== taskId);
        this.showSuccessMessage('Task deleted successfully!');
      }
    }
  }

  private resetNewTaskForm() {
    this.newTask = {
      title: '',
      description: '',
      priority: 'Medium',
      type: 'study',
      dueDate: new Date(),
      course: ''
    };
  }

  cancelEdit() {
    this.editingTask = null;
    this.showEditForm = false;
  }

  closeViewModal() {
    this.viewingTask = null;
    this.showViewModal = false;
  }

  getDaysUntilDue(dueDate: Date): number {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  isOverdue(dueDate: Date): boolean {
    return this.getDaysUntilDue(dueDate) < 0;
  }

  getTaskTypeIcon(type: string): string {
    switch (type) {
      case 'assignment': return 'fa-solid fa-file-text';
      case 'exam': return 'fa-solid fa-clipboard-question';
      case 'study': return 'fa-solid fa-book';
      case 'personal': return 'fa-solid fa-user';
      default: return 'fa-solid fa-tasks';
    }
  }

  get filteredColumns() {
    if (this.filterType === 'all' && !this.searchTerm) {
      return this.taskColumns;
    }

    return this.taskColumns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => {
        const matchesType = this.filterType === 'all' || task.type === this.filterType;
        const matchesSearch = !this.searchTerm || 
          task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          (task.course && task.course.toLowerCase().includes(this.searchTerm.toLowerCase()));
        
        return matchesType && matchesSearch;
      })
    }));
  }

  getTotalTasks(): number {
    return this.taskColumns.reduce((total, column) => total + column.tasks.length, 0);
  }

  getCompletedTasks(): number {
    return this.taskColumns
      .find(col => col.id === 'completed')
      ?.tasks.length || 0;
  }

  getOverdueTasks(): number {
    return this.taskColumns.reduce((total, column) => {
      return total + column.tasks.filter(task => 
        !task.completed && this.isOverdue(task.dueDate)
      ).length;
    }, 0);
  }

  getTasksInProgress(): number {
    return this.taskColumns
      .find(col => col.id === 'in-progress')
      ?.tasks.length || 0;
  }

  getAbsoluteDays(dueDate: Date): number {
    return Math.abs(this.getDaysUntilDue(dueDate));
  }

  // Utility methods for better UX
  getPriorityIcon(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high': return 'fa-solid fa-exclamation-circle';
      case 'medium': return 'fa-solid fa-minus-circle';
      case 'low': return 'fa-solid fa-circle';
      default: return 'fa-solid fa-circle';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'todo': return 'fa-regular fa-circle';
      case 'in-progress': return 'fa-solid fa-play-circle';
      case 'review': return 'fa-solid fa-eye';
      case 'completed': return 'fa-solid fa-check-circle';
      default: return 'fa-regular fa-circle';
    }
  }

  ngOnInit() {
    // Add event listener to handle opening the add task form when triggered from the navbar
    window.addEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
  }

  ngOnDestroy() {
    // Clean up event listener
    window.removeEventListener('openAddTaskForm', this.openAddTaskForm.bind(this));
  }

  openAddTaskForm() {
    this.showAddForm = true;
    // Scroll to the add task form
    setTimeout(() => {
      const addFormElement = document.querySelector('.add-task-form');
      if (addFormElement) {
        addFormElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }
} 