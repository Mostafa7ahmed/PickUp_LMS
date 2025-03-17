import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { IResponse, IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { LanguageResult } from '../../../../Core/Interface/ilanguage';
import { CommonModule } from '@angular/common';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-custom-select-language',
  standalone: true,
  imports: [CommonModule,SplicTextPipe, TooltipModule],
  templateUrl: './custom-select-language.component.html',
  styleUrl: './custom-select-language.component.scss'
})
export class CustomSelectLanguageComponent{

  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef; // التقاط العنصر

  @Input() options: any = [];
  @Input() selectedValue: string = 'Select an option';
  @Output() valueChange = new EventEmitter<number>();

  isOpen = false;

  toggleSelect() {
    this.isOpen = !this.isOpen;

  }

  selectOption(option: LanguageResult) {
    this.selectedValue = option.name;
    this.valueChange.emit(option.id);
    this.isOpen = false;
    console.log(option.id)

  }


  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

}
