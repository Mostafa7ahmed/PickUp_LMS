import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
interface DropdownItem {
  label: string;
  color: string;
}
@Component({
  selector: 'app-customslectwithicon',
  standalone: true,
  imports: [CommonModule, SplicTextPipe],
  templateUrl: './customslectwithicon.component.html',
  styleUrl: './customslectwithicon.component.scss'
})
export class CustomslectwithiconComponent {
  @Input() items: any[] = [];
  @Input() selectedItem: any | null = null;
  @Output() selectionChange = new EventEmitter<any>(); //
  isSelected: boolean = false;

  isOpen = false;
  isValidColor(color: string | undefined | null): boolean {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color || '');
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    console.log(this.selectedItem)
    console.log(this.selectionChange)
    console.log(this.items)
  }

  selectOption(option: any) {
    this.selectedItem = option;
    this.selectionChange.emit(option);
    this.isOpen = false;
    this.isSelected = true;
  }
}
