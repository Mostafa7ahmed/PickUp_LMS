import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';

@Component({
  selector: 'app-delete-course',
  standalone: true,
  imports: [TopPopComponent],
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.scss'
})
export class DeleteCourseComponent {

  @Output() close = new EventEmitter<void>();
    @Input() deleteId!: number;
  
  Print(){
    console.log('Delete course' , this.deleteId);
  }



  closePopup() {
    this.close.emit();
  }
}
