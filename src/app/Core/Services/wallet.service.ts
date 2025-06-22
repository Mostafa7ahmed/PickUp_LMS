import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import { IResponseOf } from '../Shared/Interface/irespose';
import { 
  IWallet, 
  IAddFundsRequest, 
  IWithdrawRequest,
  IWalletTransaction 
} from '../Shared/Interface/wallet.interface';
=======
import { environment } from '../../Environments/environment';
import { IResponseOf } from '../Shared/Interface/irespose';
import { Observable } from 'rxjs';
import { IAddFundsRequest, IWallet, IWalletTransaction, IWithdrawRequest } from '../Interface/iwallet';
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c

@Injectable({
  providedIn: 'root'
})
export class WalletService {
<<<<<<< HEAD
=======

>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
  private walletUrl: string;

  constructor(private http: HttpClient) {
    this.walletUrl = `${environment.baseUrl}${environment.pickup}wallet`;
  }

<<<<<<< HEAD
  /**
   * Get wallet information
   */
=======

>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
  getWallet(): Observable<IResponseOf<IWallet>> {
    return this.http.get<IResponseOf<IWallet>>(`${this.walletUrl}/get`);
  }

<<<<<<< HEAD
  /**
   * Add funds to wallet
   */
=======

>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
  addFunds(request: IAddFundsRequest): Observable<IResponseOf<IWallet>> {
    return this.http.put<IResponseOf<IWallet>>(`${this.walletUrl}/add-funds`, request);
  }

<<<<<<< HEAD
  /**
   * Withdraw funds from wallet
   */
=======
 
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
  withdrawFunds(request: IWithdrawRequest): Observable<IResponseOf<IWallet>> {
    return this.http.put<IResponseOf<IWallet>>(`${this.walletUrl}/withdraw`, request);
  }

<<<<<<< HEAD
  /**
   * Get transaction history
   */
=======
>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
  getTransactionHistory(pageNumber: number = 1, pageSize: number = 20): Observable<IResponseOf<IWalletTransaction[]>> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<IResponseOf<IWalletTransaction[]>>(`${this.walletUrl}/transactions`, { params });
  }
<<<<<<< HEAD
=======


>>>>>>> b201d866995093bf0c23ca0e9c49f2feb046eb6c
}
