import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Transaction } from 'src/app/demo/api/Transaction';
import { TransactionService } from 'src/app/demo/service/Transaction.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Table } from 'primeng/table';
import { account } from 'src/app/demo/api/Account';
import { AccountService } from 'src/app/demo/service/Account.service';
import { Observable, max } from 'rxjs';
//import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  providers: [MessageService]

})
export class TransactionComponent implements OnInit {

  TransactionDailog: boolean = false;

  deleteTransactionDialog: boolean = false;
  deleteTransactionsDialog : boolean = false
  
  deleteProductsDialog: boolean = false;

  Transactions: Transaction[] = [];

  BankAccount: account[] = [];

  Transaction: Transaction = {};

  selectedTransaction: Transaction[] = [];
  submitted: boolean = false;

  cols: any[] = [];

  transactiontypes: any[] = [];

  constructor(private Transactionservice: TransactionService, private messageService: MessageService, private AccountService: AccountService) { }

  ngOnInit() {
    this.Transactionservice.getAllTransactions().then(data => this.Transactions = data);
    this.AccountService.getAccounts().then(data => this.BankAccount = data);
    //this.BankAccount.find(x=>x.id == 1 );


    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'AccountId', header: 'AccountId' },
      { field: 'amount', header: 'amount' },
      { field: 'transactiontype', header: 'transactiontype' },



      /*
                    <th pSortableColumn="Id">Id <p-sortIcon field="code"></p-sortIcon></th>
                    <th pSortableColumn="AccountId">Account <p-sortIcon field="AccountId"></p-sortIcon></th>
                    <th pSortableColumn="amount">Amount <p-sortIcon field="amount"></p-sortIcon></th>
                    <th pSortableColumn="transactiontype">TransactionType <p-sortIcon field="transactiontype"></p-sortIcon></th>
      
      */
    ];

    /*
          "id": 1001,
          "AccountId": 1001,
          "amount":1000,
          "transactiontype":"deposit"
    */

    this.transactiontypes = [
      { label: 'deposit', value: 'deposit' },
      { label: 'withdraw', value: 'withdraw' },
    ];



  }


  openNew() {
    this.Transaction = {};
    this.submitted = false;
    this.TransactionDailog = true;

  }



  editTransaction(Transaction: Transaction) {
    this.Transaction = { ...Transaction };
    this.Transaction.accountid = "1001";

    alert(this.Transaction.accountid);
    this.TransactionDailog = true;
  }

  deleteSelectedTransaction() {
    this.deleteTransactionsDialog = true;


  }


  deletetransaction(Transaction: Transaction) 
  {
    this.deleteTransactionDialog = true;
    this.Transaction = {...Transaction};

   }



  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  hideDialog() {
    this.TransactionDailog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    //if (this.product.name?.trim()) 
    {
      if (this.Transaction.id) {
        // @ts-ignore
        //   this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
        
        this.Transaction.transactiontype =  this.Transaction.transactiontype ?  this.Transaction.transactiontype :  this.Transaction.transactiontype;
        
        this.Transaction.accountid = this.Transaction.accountid ? this.Transaction.accountid : this.Transaction.accountid;
        this.Transactions[this.findIndexById(this.Transaction.id)] = this.Transaction;
        alert(this.Transaction.accountid + "\n" + this.Transaction.amount +"\n"+ this.Transaction.transactiontype  );

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        
        // this.Transaction.accountid = this.Transaction.accountid ? this.Transaction.accountid : this.Transaction.accountid;
        this.Transaction.id = this.createId();
       this.Transaction.accountid = this.Transaction.accountid ? this.Transaction.accountid : this.Transaction.accountid ;
        this.Transaction.amount = this.Transaction.amount;
        this.Transaction.transactiontype = this.Transaction.transactiontype ? this.Transaction.transactiontype : 'deposit';
        //   this.Transaction.image = 'product-placeholder.svg';
        // @ts-ignore
        
        alert(this.Transaction.accountid + "\n" + this.Transaction.amount +"\n"+ this.Transaction.transactiontype  );
        this.Transactions.push(this.Transaction);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.Transactions = [...this.Transactions];
      this.TransactionDailog = false;
      this.Transaction = {};
    }
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    //this.BankAccount.findIndex(x=>x.id).;
    //let maxValue = Math.max.apply(null,
    //  this.BankAccount.map(function(o) { return o.id?; };));

    //Math.max(...this.BankAccount.map(o => o.id))
    //var kkk =Math.max.apply(Math, this.BankAccount.map(function(o) { return o.id?1 : 1; }))


    //  alert(kkk);

    //     return kkk;

   // return kkk = this.BankAccount.reduce((prev, current) => (prev && prev.id) ? prev : current)
    //alert(kkk);
    //return kkk;
return id;

  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Transactions.length; i++) {
        if (this.Transactions[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}




gggg(aid:number):void
{

var kkk =  of(this.BankAccount);

var ll = kkk.subscribe(x=>{this.BankAccount.find(x=>x.id) ==aid});

//return ll;

}



confirmDeleteSelected() {
  this.deleteTransactionsDialog = false;
  this.Transactions = this.Transactions.filter(val => !this.selectedTransaction.includes(val));
  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Deleted', life: 3000 });
  this.selectedTransaction = [];
}

confirmDelete() {
  this.deleteTransactionDialog = false;
  this.Transactions = this.Transactions.filter(val => val.id !== this.Transaction.id);
  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Deleted', life: 3000 });
  this.Transaction = {};
}

}
