import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-text-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-header.component.html',
  styleUrl: './text-header.component.scss'
})
export class TextHeaderComponent {

  @Input() title: string = 'Title';
  @Input() bgColor: string = '#bdff42';
  @Input() Icon: string = '';


}
