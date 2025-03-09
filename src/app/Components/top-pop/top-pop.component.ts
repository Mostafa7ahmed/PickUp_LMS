import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-pop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-pop.component.html',
  styleUrl: './top-pop.component.scss'
})
export class TopPopComponent {



  @Input() NamePopup: string = '';  
  @Output() isVisibleChange = new EventEmitter<boolean>();

  @Input() NameIcon: string = 'fa-kit fa-apps-add-filled';  
  @Input() bgColor: string = '#3e97ff1a';  
  @Input() Color: string = '#3e98ffb7';  


  handleCancel() {
    this.isVisibleChange.emit(false);
  }

}
