import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { IResponseOf } from '../Shared/Interface/irespose';
import { Observable } from 'rxjs';
import { IAddFundsRequest, IWallet, IWalletTransaction, IWithdrawRequest } from '../Interface/iwallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private walletUrl: string;

  constructor(private http: HttpClient) {
    this.walletUrl = `${environment.baseUrl}${environment.pickup}wallet`;
  }


  getWallet(): Observable<IResponseOf<IWallet>> {
    return this.http.get<IResponseOf<IWallet>>(`${this.walletUrl}/get`);
  }


  addFunds(request: IAddFundsRequest): Observable<IResponseOf<IWallet>> {
    return this.http.put<IResponseOf<IWallet>>(`${this.walletUrl}/add-funds`, request);
  }

 
  withdrawFunds(request: IWithdrawRequest): Observable<IResponseOf<IWallet>> {
    return this.http.put<IResponseOf<IWallet>>(`${this.walletUrl}/withdraw`, request);
  }

  getTransactionHistory(pageNumber: number = 1, pageSize: number = 20): Observable<IResponseOf<IWalletTransaction[]>> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<IResponseOf<IWalletTransaction[]>>(`${this.walletUrl}/transactions`, { params });
  }


}
