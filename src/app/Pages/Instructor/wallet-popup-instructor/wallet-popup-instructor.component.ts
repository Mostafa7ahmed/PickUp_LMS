import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletService } from '../../../Core/Services/wallet.service';
import { IWallet, IWalletTransaction, TransactionStatus, TransactionType } from '../../../Core/Interface/iwallet';
import { TopPopComponent } from '../../../Components/top-pop/top-pop.component';
import { CommonModule, Location } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-wallet-popup-instructor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TopPopComponent],
  templateUrl: './wallet-popup-instructor.component.html',
  styleUrl: './wallet-popup-instructor.component.scss'
})
export class WalletPopupInstructorComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private walletService = inject(WalletService);
    private message = inject(NzMessageService);

    private Location = inject(Location);

  walletData: IWallet | null = null;
  recentTransactions: IWalletTransaction[] = [];
  isLoading = false;
  isVisible = true;
  activeTab: 'overview' | 'addFunds' | 'withdraw' | 'history' = 'overview';
  
  // Forms
  addFundsForm: FormGroup;
  withdrawForm: FormGroup;
  
  // Transaction processing
  isProcessingTransaction = false;
  transactionMessage = '';
  transactionSuccess = false;

  // Enums for template
  TransactionType = TransactionType;
  TransactionStatus = TransactionStatus;

  // Math for template
  Math = Math;

  constructor() {
    this.addFundsForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1), Validators.max(10000)]]
    });

    this.withdrawForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadWalletData();
  }

  loadWalletData(): void {
    this.isLoading = true;
    this.walletService.getWallet().subscribe({
      next: (response) => {
        if (response.success && response.result) {
          this.walletData = response.result;
          this.withdrawForm.get('amount')?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(this.walletData.balance)
          ]);
          this.generateMockTransactions();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading wallet data:', error);
        this.isLoading = false;
      }
    });
  }

  setActiveTab(tab: 'overview' | 'addFunds' | 'withdraw' | 'history'): void {
    this.activeTab = tab;
    this.clearTransactionMessage();
  }

  addFunds(): void {
    if (this.addFundsForm.valid) {
      this.isProcessingTransaction = true;
      const amount = this.addFundsForm.get('amount')?.value;

      this.walletService.addFunds({ amount }).subscribe({
        next: (response) => {
          if (response.success && response.result) {
            this.walletData = response.result; 
            this.transactionSuccess = true;
            this.transactionMessage = `Successfully added $${amount} to your wallet!`;
             this.message.success(this.transactionMessage);
            this.playSuccessSound(); // Play success sound

            this.addFundsForm.reset();
            this.addMockTransaction(amount, TransactionType.Deposit, 'Funds added to wallet');
          } else {
            this.transactionSuccess = false;
            this.transactionMessage = 'Failed to add funds. Please try again.';
            this.message.error(this.transactionMessage);
          }
          this.isProcessingTransaction = false;
        },
        error: (error) => {
          console.error('Error adding funds:', error);
          this.transactionSuccess = false;
          this.transactionMessage = 'Error processing transaction. Please try again.';
          this.message.error(this.transactionMessage);
          this.isProcessingTransaction = false;
        }
      });
    }
  }

  withdrawFunds(): void {
    if (this.withdrawForm.valid && this.walletData) {
      const amount = this.withdrawForm.get('amount')?.value;

      if (amount > this.walletData.balance) {
        this.transactionSuccess = false;
        this.transactionMessage = 'Insufficient balance for withdrawal.';
        this.message.error(this.transactionMessage);
        return;
      }

      this.isProcessingTransaction = true;

      this.walletService.withdrawFunds({ amount }).subscribe({
        next: (response) => {
          if (response.success && response.result) {
            this.walletData = response.result; // Update wallet data
            this.transactionSuccess = true;
            this.transactionMessage = `Successfully withdrew $${amount} from your wallet!`;
            this.message.success(this.transactionMessage);
            this.playSuccessSound(); // Play success sound
            this.withdrawForm.reset();
            this.addMockTransaction(amount, TransactionType.Withdrawal, 'Funds withdrawal');
          } else {
            this.transactionSuccess = false;
            this.transactionMessage = 'Failed to withdraw funds. Please try again.';
            this.message.error(this.transactionMessage);
          }
          this.isProcessingTransaction = false;
        },
        error: (error) => {
          console.error('Error withdrawing funds:', error);
          this.transactionSuccess = false;
          this.transactionMessage = 'Error processing withdrawal. Please try again.';
          this.message.error(this.transactionMessage);
          this.isProcessingTransaction = false;
        }
      });
    }
  }
  audio = new Audio('Done.mp3');


  playSuccessSound() {
    this.audio.play();
  }
  clearTransactionMessage(): void {
    this.transactionMessage = '';
    this.transactionSuccess = false;
  }

  closePopup(): void {
    this.isVisible = false;
    this.Location.back();
    this.audio.pause()

  }

  getTransactionTypeIcon(type: TransactionType): string {
    switch (type) {
      case TransactionType.Deposit:
        return 'fas fa-plus-circle';
      case TransactionType.Withdrawal:
        return 'fas fa-minus-circle';
      case TransactionType.Payment:
        return 'fas fa-credit-card';
      case TransactionType.Refund:
        return 'fas fa-undo';
      case TransactionType.Earning:
        return 'fas fa-coins';
      default:
        return 'fas fa-exchange-alt';
    }
  }

  getTransactionTypeColor(type: TransactionType): string {
    switch (type) {
      case TransactionType.Deposit:
      case TransactionType.Refund:
      case TransactionType.Earning:
        return 'success';
      case TransactionType.Withdrawal:
      case TransactionType.Payment:
        return 'danger';
      default:
        return 'secondary';
    }
  }

  getStatusBadgeClass(status: TransactionStatus): string {
    switch (status) {
      case TransactionStatus.Completed:
        return 'badge-success';
      case TransactionStatus.Pending:
        return 'badge-warning';
      case TransactionStatus.Failed:
        return 'badge-danger';
      case TransactionStatus.Cancelled:
        return 'badge-secondary';
      default:
        return 'badge-secondary';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  getTotalIncome(): number {
    return this.recentTransactions
      .filter(t => t.type === TransactionType.Deposit || t.type === TransactionType.Earning || t.type === TransactionType.Refund)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }

  getTotalExpenses(): number {
    return this.recentTransactions
      .filter(t => t.type === TransactionType.Withdrawal || t.type === TransactionType.Payment)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }

  getPendingTransactions(): number {
    return this.recentTransactions
      .filter(t => t.status === TransactionStatus.Pending).length;
  }

  generateMockTransactions(): void {
    // Generate some mock transactions for demo purposes
    this.recentTransactions = [
      {
        id: 1,
        walletId: this.walletData?.userId || 0,
        amount: 100,
        type: TransactionType.Deposit,
        description: 'Initial wallet funding',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        status: TransactionStatus.Completed,
        reference: 'TXN001'
      },
      {
        id: 2,
        walletId: this.walletData?.userId || 0,
        amount: -25,
        type: TransactionType.Payment,
        description: 'Course enrollment payment',
        createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        status: TransactionStatus.Completed,
        reference: 'TXN002'
      },
      {
        id: 3,
        walletId: this.walletData?.userId || 0,
        amount: 50,
        type: TransactionType.Earning,
        description: 'Course completion bonus',
        createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
        status: TransactionStatus.Completed,
        reference: 'TXN003'
      }
    ];
  }

  addMockTransaction(amount: number, type: TransactionType, description: string): void {
    const newTransaction: IWalletTransaction = {
      id: this.recentTransactions.length + 1,
      walletId: this.walletData?.userId || 0,
      amount: type === TransactionType.Withdrawal || type === TransactionType.Payment ? -amount : amount,
      type: type,
      description: description,
      createdAt: new Date().toISOString(),
      status: TransactionStatus.Completed,
      reference: `TXN${String(this.recentTransactions.length + 1).padStart(3, '0')}`
    };

    this.recentTransactions.unshift(newTransaction); // Add to beginning of array

    // Keep only last 10 transactions
    if (this.recentTransactions.length > 10) {
      this.recentTransactions = this.recentTransactions.slice(0, 10);
    }
  }
}
