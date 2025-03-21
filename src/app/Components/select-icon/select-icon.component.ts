import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-select-icon',
  standalone: true,
  imports: [NzSelectModule, NzModalModule, CommonModule, NzButtonModule, NzIconModule, NzTabsModule],
  templateUrl: './select-icon.component.html',
  styleUrl: './select-icon.component.scss'
})
export class SelectIconComponent {
  
  @Input() colors: any[] = [];
  @Input() colorDefault: string = '#5f5d5d'; // Default color
  
  @Output() closeModal= new EventEmitter<string>();
  @Output() colorSelected = new EventEmitter<string>();
  
  
  
  @Input() currentIcon: string = 'fa fa-address-book'; // Default icon
  @Input() Icons: any[] = [];
  @Output() iconSelected = new EventEmitter<string>();
  selectIcon(icon: string) {
    this.currentIcon = icon;
    this.iconSelected.emit(icon); 
  }

  close() {
    this.closeModal.emit(); 
  }

  selectBg(color: string) {
    this.colorDefault = color;
    this.colorSelected.emit(color); 
  }
}