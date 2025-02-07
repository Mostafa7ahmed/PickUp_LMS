import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { ITopic } from '../../../../Core/Interface/itopic';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-viewtpoic',
  standalone: true,
  imports: [TopPopComponent , CommonModule],
  templateUrl: './viewtpoic.component.html',
  styleUrl: './viewtpoic.component.scss'
})
export class ViewtpoicComponent {


  @Input() viewTopic:boolean = false;
  @Input() viewTopicData : ITopic | any = {} as ITopic ;
  @Output() closePopup = new EventEmitter<void>();
  @Input() getTopicbyIDValue: (id: number) => void = () => {}; // الدالة من الأب
  fetchTopic(id: number): void {
    this.getTopicbyIDValue(id)
    
  }

  // Close popup when the child component triggers it
  closePopupHandler(): void {
    this.closePopup.emit();
  }
 


    courseCount = 7;
    totalPrice = 10.00;
    lastUpdate = '4-2-2025';
    creator = 'Salma shorbgy';
    createdOn = '4-2-2025';
    lastUpdater = 'Salma shorbgy';
}
