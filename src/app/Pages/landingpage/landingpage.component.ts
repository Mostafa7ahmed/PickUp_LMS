import { Component } from '@angular/core';
import { HeroComponent } from "./Components/hero/hero.component";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [HeroComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

}
