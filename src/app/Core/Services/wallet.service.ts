import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import { IResponseOf } from '../Shared/Interface/irespose';
import { 
  IWallet, 
  IWalletResponse, 
  IAddFundsRequest, 
  IWithdrawRequest,
  IWalletTransaction 
} from '../Shared/Interface/wallet.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private walletUrl: string;

  constructor(private http: HttpClient) {
    this.walletUrl = `${environment.baseUrl}${environment.pickup}wallet`;
  }

  /**
   * Get wallet information
   */
  getWallet(): Observable<IResponseOf<IWallet>> {
    return this.http.get<IResponseOf<IWallet>>(`${this.walletUrl}/get`);
  }

  /**
   * Add funds to wallet
   */
  addFunds(request: IAddFundsRequest): Observable<IResponseOf<IWallet>> {
    return this.http.put<IResponseOf<IWallet>>(`${this.walletUrl}/add-funds`, request);
  }

  /**
   * Withdraw funds from wallet
   */
  withdrawFunds(request: IWithdrawRequest): Observable<IResponseOf<IWallet>> {
    return this.http.put<IResponseOf<IWallet>>(`${this.walletUrl}/withdraw`, request);
  }

  /**
   * Get transaction history
   */
  getTransactionHistory(pageNumber: number = 1, pageSize: number = 20): Observable<IResponseOf<IWalletTransaction[]>> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<IResponseOf<IWalletTransaction[]>>(`${this.walletUrl}/transactions`, { params });
  }
}
