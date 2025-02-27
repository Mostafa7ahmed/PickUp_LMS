import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { CardStageComponent } from '../card-stage/card-stage.component';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { IKanbanResponse, IStageKanban, ITopicKanbaResult } from '../../Core/interface/ikanban-response';

@Component({
  selector: 'app-cardkanban-stage',
  standalone: true,
  imports: [CommonModule, CardStageComponent],
  templateUrl: './cardkanban-stage.component.html',
  styleUrl: './cardkanban-stage.component.scss'
})
export class CardkanbanStageComponent {

  @Input() colorStage: string = '#3e97ff'; 
  colorBorder : string = ""
  @Input({required:true})    stageColumn: IStageKanban  = {} as IStageKanban ;
  

  convertHexToRgba(hex: string, opacity: number = 1): string {
    hex = hex.replace('#', ''); 
    
    if (hex.length !== 6) {
      console.error('Invalid HEX color:', hex);
      return 'rgba(0, 0, 0, 1)'; 
    }
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  ngOnInit() {
    this.colorBorder = this.convertHexToRgba(this.stageColumn.color, 0.4);
  }

  
}
