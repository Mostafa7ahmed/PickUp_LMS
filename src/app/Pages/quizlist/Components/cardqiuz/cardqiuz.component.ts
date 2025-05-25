import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListCourse } from '../../../Courses/Core/interface/icourses';

@Component({
  selector: 'app-cardqiuz',
  standalone: true,
  imports: [],
  templateUrl: './cardqiuz.component.html',
  styleUrl: './cardqiuz.component.scss'
})
export class CardqiuzComponent {
  
   private router = inject(Router);

  //  valuse
  


    openPopup() {
    this.router.navigate([{ outlets: { dialog: ['addQuiz'] } }]);
  }

}
