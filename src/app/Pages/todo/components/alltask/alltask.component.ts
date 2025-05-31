import { Component } from '@angular/core';
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
  type: 'course-prep' | 'grading' | 'administrative' | 'meeting' | 'personal';
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
  selector: 'app-alltask',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './alltask.component.html',
  styleUrls: ['./alltask.component.scss']
})
export class AlltaskComponent {
  taskColumns: TaskColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: '#3b82f6',
      tasks: [
        {
          id: 1,
          title: 'Prepare Database Lecture',
          description: 'Create slides for normalization and indexing topics',
          priority: 'High',
          priorityClass: 'high',
          dueDate: new Date('2024-03-15'),
          course: 'Database Management',
          type: 'course-prep',
          completed: false,
          status: 'todo'
        },
        {
          id: 2,
          title: 'Grade Midterm Exams',
          description: 'Grade Data Structures midterm exams - 45 students',
          priority: 'High',
          priorityClass: 'high',
          dueDate: new Date('2024-03-18'),
          course: 'Data Structures & Algorithms',
          type: 'grading',
          completed: false,
          status: 'todo'
        },
        {
          id: 3,
          title: 'Update Course Syllabus',
          description: 'Add new AI ethics module to curriculum',
          priority: 'Medium',
          priorityClass: 'medium',
          dueDate: new Date('2024-03-20'),
          course: 'Artificial Intelligence',
          type: 'course-prep',
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
          title: 'Research Paper Review',
          description: 'Review papers for Computer Science Journal',
          priority: 'High',
          priorityClass: 'high',
          dueDate: new Date('2024-03-25'),
          type: 'administrative',
          completed: false,
          status: 'in-progress'
        },
        {
          id: 5,
          title: 'Student Project Supervision',
          description: 'Guide senior capstone projects - weekly meetings',
          priority: 'Medium',
          priorityClass: 'medium',
          dueDate: new Date('2024-03-22'),
          type: 'meeting',
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
          title: 'Course Material Review',
          description: 'Review updated machine learning course materials',
          priority: 'Low',
          priorityClass: 'low',
          dueDate: new Date('2024-03-16'),
          course: 'Machine Learning',
          type: 'course-prep',
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
          title: 'Submit Grade Reports',
          description: 'Submitted midterm grades to registrar',
          priority: 'Medium',
          priorityClass: 'medium',
          dueDate: new Date('2024-03-10'),
          type: 'administrative',
          completed: true,
          status: 'completed'
        },
        {
          id: 8,
          title: 'Faculty Meeting',
          description: 'Attended department curriculum planning meeting',
          priority: 'Low',
          priorityClass: 'low',
          dueDate: new Date('2024-03-08'),
          type: 'meeting',
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
    type: 'course-prep',
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
    return this.taskColumns.find(col => col.id === columnId)?.title || 'Unknown';
  }

  private showSuccessMessage(message: string) {
    console.log(message); // Replace with actual notification system
  }

  getConnectedColumns(): string[] {
    return this.taskColumns.map(column => column.id);
  }

  addTask() {
    if (this.newTask.title && this.newTask.description) {
      const task: Task = {
        id: Date.now(),
        title: this.newTask.title,
        description: this.newTask.description,
        priority: this.newTask.priority as 'Low' | 'Medium' | 'High',
        priorityClass: (this.newTask.priority || 'medium').toLowerCase(),
        dueDate: this.newTask.dueDate || new Date(),
        course: this.newTask.course,
        type: this.newTask.type as 'course-prep' | 'grading' | 'administrative' | 'meeting' | 'personal',
        completed: false,
        status: 'todo'
      };

      this.taskColumns[0].tasks.push(task);
      this.resetNewTaskForm();
      this.showAddForm = false;
    }
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
    this.showEditForm = true;
  }

  viewTask(task: Task) {
    this.viewingTask = task;
    this.showViewModal = true;
  }

  updateTask() {
    if (this.editingTask) {
      // Find and update the task in the appropriate column
      for (let column of this.taskColumns) {
        const taskIndex = column.tasks.findIndex(t => t.id === this.editingTask!.id);
        if (taskIndex !== -1) {
          column.tasks[taskIndex] = { ...this.editingTask };
          break;
        }
      }
      this.cancelEdit();
    }
  }

  deleteTask(columnId: string, taskId: number) {
    const column = this.taskColumns.find(col => col.id === columnId);
    if (column) {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId);
      if (taskIndex > -1) {
        column.tasks.splice(taskIndex, 1);
      }
    }
  }

  private resetNewTaskForm() {
    this.newTask = {
      title: '',
      description: '',
      priority: 'Medium',
      type: 'course-prep',
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
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isOverdue(dueDate: Date): boolean {
    return this.getDaysUntilDue(dueDate) < 0;
  }

  getTaskTypeIcon(type: string): string {
    switch (type) {
      case 'course-prep': return 'fa-chalkboard-teacher';
      case 'grading': return 'fa-clipboard-check';
      case 'administrative': return 'fa-file-alt';
      case 'meeting': return 'fa-users';
      case 'personal': return 'fa-user';
      default: return 'fa-tasks';
    }
  }

  get filteredColumns() {
    return this.taskColumns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => {
        const matchesType = this.filterType === 'all' || task.type === this.filterType;
        const matchesSearch = this.searchTerm === '' || 
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
    const completedColumn = this.taskColumns.find(col => col.id === 'completed');
    return completedColumn ? completedColumn.tasks.length : 0;
  }

  getOverdueTasks(): number {
    let overdueTasks = 0;
    this.taskColumns.forEach(column => {
      if (column.id !== 'completed') {
        overdueTasks += column.tasks.filter(task => this.isOverdue(task.dueDate)).length;
      }
    });
    return overdueTasks;
  }

  getTasksInProgress(): number {
    const inProgressColumn = this.taskColumns.find(col => col.id === 'in-progress');
    return inProgressColumn ? inProgressColumn.tasks.length : 0;
  }

  getAbsoluteDays(dueDate: Date): number {
    return Math.abs(this.getDaysUntilDue(dueDate));
  }

  getPriorityIcon(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high': return 'fa-exclamation-triangle';
      case 'medium': return 'fa-exclamation-circle';
      case 'low': return 'fa-info-circle';
      default: return 'fa-info-circle';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'todo': return 'fa-clock';
      case 'in-progress': return 'fa-spinner';
      case 'review': return 'fa-eye';
      case 'completed': return 'fa-check-circle';
      default: return 'fa-tasks';
    }
  }
}
