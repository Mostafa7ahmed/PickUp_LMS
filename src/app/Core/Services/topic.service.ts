import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private urlTopic: string;
  private createtopic: string;
  private getTopic: string;
  private stages: string;


  private UserAuth = localStorage.getItem('UserAuth');

  constructor(private _HttpClient: HttpClient) {
    this.urlTopic = `${environment.baseUrl}${environment.pickup}topic/paginate`,
      this.createtopic = `${environment.baseUrl}${environment.pickup}topic/create`,
        this.getTopic = `${environment.baseUrl}${environment.pickup}topic/get`,
    this.stages = `${environment.baseUrl}${environment.pickup}topic/add-stages`
  }

  getAllTopic(orderBy: number = 2, pageNumber: number = 1, pageSize: number = 5, orderBeforPagination: boolean = false, orderDirection: number = 1): Observable<any> {
    return this._HttpClient.get(`${this.urlTopic}?orderBy=${orderBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderBeforPagination=${orderBeforPagination}&orderDirection=${orderDirection}`,
      {
        headers: {
          'Authorization': `Bearer ${this.UserAuth}`
        }

      })
  }

  addTopic(topic: any): Observable<any> {
    return this._HttpClient.post(`${this.createtopic}`, topic,
      {
        headers: {
          'Authorization': `Bearer ${this.UserAuth}`
        }
      }
    )


  }

 
  getTopicById(topic: number): Observable<any> {
    return this._HttpClient.get(`${this.getTopic}?id=${topic}`,
      {
        headers: {
          'Authorization': `Bearer ${this.UserAuth}`
        }
      }
    )
  }

  addstages(topic: any): Observable<any> {
    return this._HttpClient.post(`${this.stages}`, topic,
      {
        headers: {
          'Authorization': `Bearer ${this.UserAuth}`
        }
      }
    )


  }
 


  setDefaultTopic(idTopic: number): Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}${environment.pickup}topic/set-default`,{
      id:idTopic
    },{
      headers: {
        'Authorization': `Bearer ${this.UserAuth}`
      }
    })
  }



}
