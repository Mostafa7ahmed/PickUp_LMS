import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { TopicService } from '../../../../Core/Services/topic.service';

@Component({
  selector: 'app-delete-stage',
  standalone: true,
  imports: [],
  templateUrl: './delete-stage.component.html',
  styleUrl: './delete-stage.component.scss'
})
export class DeleteStageComponent {
  @Input() showDeleteTopic: boolean = false;
  @Input() topicId!: number; 
  @Output() closePopup = new EventEmitter<void>();
  @Output() deleteConfirmed = new EventEmitter<number>();
  @Input() selectedTopicId?: number;
  @Output() topicDeleted = new EventEmitter<void>(); 
  @Output() topicsUpdated = new EventEmitter<void>(); 

  constructor(private _TopicService: TopicService) {}

  deleteTopicConfirmed(): void {
    if (this.selectedTopicId === undefined) {
      console.error("Error: selectedTopicId is undefined!");
      return;
    }
  
    this._TopicService.deleteTpoic(this.selectedTopicId, false).subscribe({
      next: (response) => {
        console.log("Topic deleted successfully", response);
        this.showDeleteTopic = false;
        this.topicDeleted.emit(); 
        this.topicsUpdated.emit(); 

      },
      error: (error) => {
        console.error("Error deleting topic:", error);
      }
    });
  }

  closeDeleteTopic() {
    this.closePopup.emit();
  }

  confirmDelete() {
    this.deleteConfirmed.emit(this.topicId);
  }
}
