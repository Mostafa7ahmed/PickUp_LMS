import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-select-price-or-free',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select-price-or-free.component.html',
  styleUrl: './custom-select-price-or-free.component.scss'
})
export class CustomSelectPriceOrFreeComponent {


  @Input() options = ['Paid', 'Free']; // الخيارات المتاحة
  @Input() coursePrice: number = 0; // ✅ استقبال السعر من المكون الأب

  @Output() valueChange = new EventEmitter<{ free: boolean; price: number }>();

  isOpen = false;
  disabled = false;
  private _value: boolean = false; 
  
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  get value(): boolean {
    return this._value;
  }

  set value(val: boolean) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val); 

    }
  }

  toggleSelect() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.onTouched();
  }

selectOption(option: string) {
  this.value = option === 'Free';
  this.onChange(this.value);

  this.valueChange.emit({
    free: this.value,
    price: this.value ? 0 : this.coursePrice 
  });
}
  writeValue(value: boolean): void {
    this._value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
  constructor(private eRef: ElementRef) {}
}