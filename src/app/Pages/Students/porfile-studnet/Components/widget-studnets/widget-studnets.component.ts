import { Component, inject, OnInit } from '@angular/core';
import { TextHeaderComponent } from "../../../../Courses/Components/text-header/text-header.component";
import { IWidgetStudent } from '../../Interface/iwidget-student';
import { IResponse, IResponseOf } from '../../../../../Core/Shared/Interface/irespose';
import { WidgetStudentsService } from '../../Service/widget-students.service';

@Component({
  selector: 'app-widget-studnets',
  standalone: true,
  imports: [TextHeaderComponent],
  templateUrl: './widget-studnets.component.html',
  styleUrl: './widget-studnets.component.scss'
})
export class WidgetStudnetsComponent implements OnInit{

  DataWidgetStudent:IResponseOf<IWidgetStudent> = {} as IResponseOf<IWidgetStudent>;
    private _WidgetStudentsService = inject(WidgetStudentsService);
  
    ngOnInit(): void {
      this._WidgetStudentsService.getStudentWidget().subscribe({
        next :(res)=>{
          this.DataWidgetStudent=res
        }
      })
    }
}
