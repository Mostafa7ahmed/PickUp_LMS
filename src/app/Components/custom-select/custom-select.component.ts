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
  @Input() selectedValue: string = ''; // Optional default value
  @Output() valueChange = new EventEmitter<string>();

  isSelected: boolean = false;
  isOpen = false;

  private _value: string = ''; // Internal value synced with FormControl
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  disabled = false;

  // Getter for filtered options (excludes the currently selected value)
  get filteredOptions(): string[] {
    return this.options.filter(option => option !== this.value);
  }

  // Getter and Setter for value
  get value(): string {
    return this._value || this.selectedValue; // Fallback to selectedValue if _value is empty
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val); // Notify FormControl of the change
    this.valueChange.emit(val); // Emit value to parent
    this.isSelected = !!val; // Update isSelected based on whether a value exists
  }

  constructor() {}

  // Toggle dropdown visibility
  toggleSelect() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      this.onTouched(); // Mark as touched when interacted with
    }
  }

  // Handle option selection
  selectOption(value: string) {
    if (!this.disabled) {
      this.value = value; // Update value using setter
    }

  }

  // ControlValueAccessor Methods
  writeValue(value: string): void {
    this._value = value || this.selectedValue; // Set value from FormControl or fallback to selectedValue
    this.isSelected = !!this._value; // Update isSelected based on initial value
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn; // Register change callback
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn; // Register touched callback
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled; // Handle disabled state
  }
}