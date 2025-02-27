import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICourseKanban } from '../../Core/interface/ikanban-response';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-card-stage',
  standalone: true,
  imports: [CommonModule, DatePipe ,MatTooltipModule, SplicTextPipe],
  templateUrl: './card-stage.component.html',
  styleUrl: './card-stage.component.scss'
})
export class CardStageComponent {
  @Input({required: true}) courseColor: string = '#3e97ff';
  @Input({required: true}) course: ICourseKanban =  {} as ICourseKanban;
}
