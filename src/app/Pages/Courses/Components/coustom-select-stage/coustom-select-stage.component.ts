import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-coustom-select-stage',
  standalone: true,
  imports: [CommonModule,TooltipModule, SplicTextPipe],
  templateUrl: './coustom-select-stage.component.html',
  styleUrl: './coustom-select-stage.component.scss'
})
export class CoustomSelectStageComponent {
  @Input() items: any[] = [];
  @Input() selectedItem: any | null = null;
  @Output() selectionChange = new EventEmitter<any>(); 
  @Output() selectionChangeStage = new EventEmitter<any>();

  @Input() isSelected: boolean = false;
  @Input() disabled: boolean = false;

  @Input() isLoadTopic: boolean = false;

  isOpen = false;
  isValidColor(color: string | undefined | null): boolean {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color || '');
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;

  }
    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.isOpen = false;
      }
    }
    constructor(private eRef: ElementRef) {}
  

  selectOption(option: any) {
    this.selectedItem = option;
    this.selectionChange.emit(option);
    this.selectionChangeStage.emit(option.id);

    this.isOpen = false;
    this.isSelected = true;
  }
}
