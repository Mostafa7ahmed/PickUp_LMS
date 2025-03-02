import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {
  @Input() options: string[] = [];
  @Input() selectedValue: string = '';
  @Output() valueChange = new EventEmitter<string>();
  isSelected : boolean = false; 
  isOpen = false;

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  selectOption(value: string) {
    this.selectedValue = value;
    this.valueChange.emit(value);
    this.isSelected = true;
    }
}
