import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-widgetquizlist',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './widgetquizlist.component.html',
  styleUrls: ['./widgetquizlist.component.scss' ]
})
export class WidgetquizlistComponent {
  @Input() showInfo = false;

}
