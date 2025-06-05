import { Component } from '@angular/core';
import { CourseCardComponent } from "../course-card/course-card.component";

@Component({
  selector: 'app-discover-cards',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './discover-cards.component.html',
  styleUrl: './discover-cards.component.scss'
})
export class DiscoverCardsComponent {

}
