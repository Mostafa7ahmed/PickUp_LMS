import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-stage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-stage.component.html',
  styleUrl: './card-stage.component.scss'
})
export class CardStageComponent {
  @Input() colorStage: string = '#3e97ff';

}
