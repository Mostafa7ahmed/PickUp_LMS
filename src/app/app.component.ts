import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { RefreshtokenService } from './Core/Services/refreshtoken.service';
import { ResponsiveOverlayComponent } from './Components/responsive-overlay/responsive-overlay.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NzStepsModule,NzButtonModule,ResponsiveOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Pickup';

  constructor(private tokenRefreshService: RefreshtokenService) {}
  ngOnInit() {

  }

}
