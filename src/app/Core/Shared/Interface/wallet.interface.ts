export interface IWallet {
  userId: number;
  creditCard: string;
  balance: number;
}

export interface IWalletTransaction {
  id: number;
  walletId: number;
  amount: number;
  type: TransactionType;
  description: string;
  createdAt: string;
  status: TransactionStatus;
  reference?: string;
}

export interface IAddFundsRequest {
  amount: number;
}

export interface IWithdrawRequest {
  amount: number;
}

export interface IWalletResponse {
  wallet: IWallet;
  recentTransactions: IWalletTransaction[];
  totalIncome: number;
  totalExpenses: number;
  pendingTransactions: number;
}

export enum TransactionType {
  Deposit = 0,
  Withdrawal = 1,
  Payment = 2,
  Refund = 3,
  Earning = 4
}

export enum TransactionStatus {
  Pending = 0,
  Completed = 1,
  Failed = 2,
  Cancelled = 3
}
