import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginateStageService {

  private urlStages: string;

  constructor(private _HttpClient :HttpClient) {
    this.urlStages = `${environment.baseUrl}${environment.pickup}stage/paginate?`;
   }

   





}
