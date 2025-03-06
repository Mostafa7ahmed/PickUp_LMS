import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [],
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.scss'
})
export class AddTopicComponent {
  constructor(private router: Router) {}

  closePopup() {
    this.router.navigate([{ outlets: { popup: null } }]); // إغلاق البوب أب
  }
}
