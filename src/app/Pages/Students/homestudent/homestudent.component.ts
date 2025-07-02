import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homestudent',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './homestudent.component.html',
  styleUrl: './homestudent.component.scss'
})
export class HomestudentComponent implements OnInit {
  ngOnInit() {
  }
}
