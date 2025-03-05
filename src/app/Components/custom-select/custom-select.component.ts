import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent  {
  @Input() options: string[] = [];
  @Input() selectedValue: string = ''; 
  @Output() valueChange = new EventEmitter<string>();

  isSelected: boolean = false;
  isOpen = false;

  private _value: string = ''; 
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  disabled = false;



  get value(): string {
    return this._value || this.selectedValue; 
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val); 
    this.valueChange.emit(val);
    this.isSelected = !!val;
  }

  constructor() {}

  toggleSelect() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      this.onTouched();
    }
  }

  selectOption(value: string) {
    if (!this.disabled) {
      this.value = value;
    }

  }


}