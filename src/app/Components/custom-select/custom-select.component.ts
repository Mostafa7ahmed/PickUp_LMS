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
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() selectedValue: string = ''; 
  @Output() valueChange = new EventEmitter<string>();
  @Input() isTopic: boolean = false;
  @Input() iStage: boolean = false;

  isSelected: boolean = false;
  isOpen = false;
  disabled = false;
  private _value: string = ''; 

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get value(): string {
    return this._value || this.selectedValue; 
  }

  set value(val: string) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val); 
      this.valueChange.emit(val);
      this.isSelected = !!val;
    }
  }

  constructor() {}

  toggleSelect() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.onTouched();
  }

  selectOption(value: string) {
    if (this.disabled) return;
    this.value = value;
  }

  /** Implementing ControlValueAccessor methods */
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
