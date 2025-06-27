import { Component } from '@angular/core';
import { CourseCardComponent } from "../course-card/course-card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-discover-cards',
  standalone: true,
  imports: [CourseCardComponent , RouterLink],
  templateUrl: './discover-cards.component.html',
  styleUrl: './discover-cards.component.scss'
})
export class DiscoverCardsComponent {

}
