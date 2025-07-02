import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { RefreshtokenService } from './Core/Services/refreshtoken.service';
import { ResponsiveOverlayComponent } from './Components/responsive-overlay/responsive-overlay.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzStepsModule,
    NzButtonModule,
    ResponsiveOverlayComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Pickup';
  private translate = inject(TranslateService);

  constructor(private tokenRefreshService: RefreshtokenService) {
    // Set default language and available languages
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en', 'ar']);

    // Get the browser language
    const browserLang = this.translate.getBrowserLang();

    // Try to use browser language if available, otherwise use default
    this.translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');
  }

  ngOnInit() {
    // Load translations
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.translate.use(savedLang);
    }
  }
}
