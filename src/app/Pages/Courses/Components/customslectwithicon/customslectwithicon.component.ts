import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { TooltipModule } from 'primeng/tooltip';
interface DropdownItem {
  label: string;
  color: string;
}
@Component({
  selector: 'app-customslectwithicon',
  standalone: true,
  imports: [CommonModule,TooltipModule, SplicTextPipe],
  templateUrl: './customslectwithicon.component.html',
  styleUrl: './customslectwithicon.component.scss'
})
export class CustomslectwithiconComponent {
  @Input() items: any[] = [];
  @Input() selectedItem: any | null = null;
  @Output() selectionChange = new EventEmitter<any>(); 
  @Output() selectionChangeTopic = new EventEmitter<any>();

  @Input() isSelected: boolean = false;
  @Input() disabled: boolean = false;


  isOpen = false;
  isValidColor(color: string | undefined | null): boolean {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color || '');
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;

  }

  selectOption(option: any) {
    this.selectedItem = option;
    this.selectionChange.emit(option);
    this.selectionChangeTopic.emit(option.id);

    this.isOpen = false;
    this.isSelected = true;
  }
}
