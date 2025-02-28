import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CardStageComponent } from '../card-stage/card-stage.component';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { ICourseKanban, IKanbanResponse, IStageKanban, ITopicKanbaResult } from '../../Core/interface/ikanban-response';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cardkanban-stage',
  standalone: true,
  imports: [CommonModule, DragDropModule,CardStageComponent],
  templateUrl: './cardkanban-stage.component.html',
  styleUrl: './cardkanban-stage.component.scss'
})
export class CardkanbanStageComponent {

  @Input() colorStage: string = '#3e97ff'; 
  colorBorder : string = ""
  @Input({required:true})    stageColumn: IStageKanban  = {} as IStageKanban ;
  @Output() moveCourse = new EventEmitter<{ course: ICourseKanban; newStageId: number }>();


  @Input() allStages: IStageKanban[] = []; // Pass all stages from the parent component

  getConnectedStages(): string[] {
    return this.allStages
      .filter(stage => stage.stageId !== this.stageColumn.stageId) // Exclude current stage
      .map(stage => `stage-${stage.stageId}`); // Return all other stage IDs
  }
  trackById(index: number, item: any) {
    return item.courseId;
  }


  onDrop(event: CdkDragDrop<ICourseKanban[]>) {
    if (event.previousContainer !== event.container) {
      const course = event.previousContainer.data[event.previousIndex];

      // Move course to the new stage
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Emit event to notify parent component (KanbanComponent)
      this.moveCourse.emit({ course, newStageId: this.stageColumn.stageId });
    }
  }

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
