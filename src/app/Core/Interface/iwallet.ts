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
  Credit = 0, // Adds funds to the wallet
  Debit = 1, // Deducts funds from the wallet for payments
  Withdrawal = 2 // Moves funds from wallet to a bank account
}

export enum TransactionStatus {
  Started = 0,
  Pending = 1,
  Completed = 2,
  Failed = 3
}
