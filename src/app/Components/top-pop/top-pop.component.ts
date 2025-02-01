import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-pop',
  standalone: true,
  imports: [],
  templateUrl: './top-pop.component.html',
  styleUrl: './top-pop.component.scss'
})
export class TopPopComponent {



  @Input() NamePopup: string = '';  // يجب أن يكون نصًا وليس قيمة منطقية
  @Output() isVisibleChange = new EventEmitter<boolean>();

  handleCancel() {
    this.isVisibleChange.emit(false);
  }

}
