import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-responsive-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responsive-overlay.component.html',
  styleUrls: ['./responsive-overlay.component.scss']
})
export class ResponsiveOverlayComponent implements OnInit {
  isVisible = false;

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isVisible = window.innerWidth <= 980;
  }

  onContinueAnyway() {
    this.isVisible = false;
    // Store user preference in localStorage
    localStorage.setItem('force-desktop-view', 'true');
  }

  ngOnInit() {
    // Check if user previously chose to continue anyway
    const forceDesktop = localStorage.getItem('force-desktop-view');
    if (forceDesktop === 'true') {
      this.isVisible = false;
    }
  }
}
