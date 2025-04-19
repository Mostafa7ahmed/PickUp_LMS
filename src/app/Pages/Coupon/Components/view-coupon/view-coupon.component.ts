import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { TooltipModule } from 'primeng/tooltip';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';

@Component({
  selector: 'app-view-coupon',
  standalone: true,
  imports: [TopPopComponent, TextHeaderComponent ,CommonModule,Avatar, AvatarGroup , TooltipModule],
  templateUrl: './view-coupon.component.html',
  styleUrl: './view-coupon.component.scss'
})
export class ViewCouponComponent {
  @ViewChild('dropdownWrapper') dropdownWrapper!: ElementRef;



  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    if (this.dropdownWrapper && !this.dropdownWrapper.nativeElement.contains(targetElement)) {
      this.isDropdownOpen = false;
    }
  }
  students = [
    { name: 'Ahmed Mohamed', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Sara Ali', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Khaled Hassan', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Maryam Fouad', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Youssef Ibrahim', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Sara Ali', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Khaled Hassan', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Maryam Fouad', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Khaled Hassan', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Maryam Fouad', image: 'Images/Login/StdudentsResgiter.png' },
    { name: 'Youssef Ibrahim', image: 'Images/Login/StdudentsResgiter.png' }
  ];
  
  isDropdownOpen = false;
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
