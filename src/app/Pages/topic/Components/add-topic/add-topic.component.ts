import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [TopPopComponent, CommonModule],
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.scss'
})
export class AddTopicComponent {
  selectedValue: string = 'Select Topic';
options: string[] = ['GitHub', 'Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'Reddit'];


  isOpen: boolean = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string): void {
    this.selectedValue = option;
    this.isOpen = false;
  }

}
