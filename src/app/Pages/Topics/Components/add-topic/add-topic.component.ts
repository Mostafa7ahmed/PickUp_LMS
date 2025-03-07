import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AllTopicComponent } from '../all-topic/all-topic.component';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CustomslectwithiconComponent } from '../../../Courses/Components/customslectwithicon/customslectwithicon.component';
import { CustomSelectComponent } from '../../../../Components/custom-select/custom-select.component';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [TopPopComponent, CommonModule, CustomSelectComponent,RouterOutlet, RouterModule], 
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.scss'
})
export class AddTopicComponent {
  constructor(private router: Router) {}

  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]); // إغلاق البوب أب
  }


  
}
