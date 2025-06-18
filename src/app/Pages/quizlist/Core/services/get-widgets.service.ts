import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';
import { Observable } from 'rxjs';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { IWidgetQuiz } from '../Interface/iwidget-quiz';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetWidgetsService {

  private urlWidget:string;
  constructor(private _http:HttpClient) { 

    this.urlWidget= `${environment.baseUrl}${environment.pickup}quiz/widget`
  }
  getWidgetsQuiz():Observable<IResponseOf<IWidgetQuiz>>{
    return this._http.get<IResponseOf<IWidgetQuiz>>(`${this.urlWidget}`);

  }
}
