import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private urlTopic: string;
  private Topic: string;
  private stages: string;


  private UserAuth = localStorage.getItem('UserAuth');  

  constructor( private _HttpClient:HttpClient) { 
     this.urlTopic =`${environment.baseUrl}${environment.pickup}topic/paginate`,
     this.Topic =`${environment.baseUrl}${environment.pickup}topic/create`
     this.stages=`${environment.baseUrl}${environment.pickup}topic/add-stages`
  }

    getAllLanguage(orderBy :number =0 ,pageNumber:number=1 , pageSize:number = 50 ,orderBeforPagination:boolean = false , orderDirection:number=0):Observable<any>{
     return this._HttpClient.get(`${this.urlTopic}?orderBy=${orderBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderBeforPagination=${orderBeforPagination}&orderDirection=${orderDirection}`,
      {
        headers: {
          'Authorization': `Bearer ${this.UserAuth}`
        }

     })
    }

    addTopic(topic:any):Observable<any>{
      return this._HttpClient.post(`${this.Topic}`,topic,
      {
        headers: {
          'Authorization': `Bearer ${this.UserAuth}`
        }    
      } 
     )
      
      
      }



      addstages(topic:any):Observable<any>{
        return this._HttpClient.post(`${this.stages}`,topic,
        {
          headers: {
            'Authorization': `Bearer ${this.UserAuth}`
          }    
        } 
       )
        
        
        }


    
  
}
