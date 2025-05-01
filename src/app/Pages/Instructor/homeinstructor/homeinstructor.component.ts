import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-homeinstructor',
  standalone: true,
  imports: [NzIconModule , TranslateModule],
  templateUrl: './homeinstructor.component.html',
  styleUrl: './homeinstructor.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this

})
export class HomeinstructorComponent {

}
