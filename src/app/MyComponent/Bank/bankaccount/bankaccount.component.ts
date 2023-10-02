import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AccountService } from 'src/app/demo/service/Account.service';
import { account } from 'src/app/demo/api/Account';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bankaccount.component.html',
  // styleUrls: ['./bankaccount.component.scss'],
  providers: [MessageService]

})
export class BankAccountComponent implements OnInit {

  AccountDialog: boolean = false;

     deleteAccountDialog: boolean = false;
     deleteAccountsDialog: boolean = false;

     
  selectedAccounts:account[]=[];
  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  accounts:account[] = [];
  account:account={};

  constructor(private Accountservice: AccountService, private messageService: MessageService) { }

  ngOnInit() {
      this.Accountservice.getAccounts().then(data => this.accounts = data);

      this.cols = [
          { field: 'id', header: 'id' },
          { field: 'code', header: 'code' },
          { field: 'name', header: 'name' },
          // { field: 'rating', header: 'Reviews' },
          { field: 'accountStatus', header: 'Status' }

      ];

      this.statuses = [
          { label: 'Document', value: 'Document' },
          { label: 'Dedported', value: 'Dedported' },
          { label: 'Rejected', value: 'Rejected' }
      ];
  }

  openNew() {
      this.account = {};
      this.submitted = false;
      this.AccountDialog = true;
  }

  deleteSelectedAccounts() {
      this.deleteAccountsDialog = true;
  }

  editAccount(account: account) {
      this.account = { ...account };
      this.AccountDialog = true;
  }

  deleteAccount(account: account) {
      this.deleteAccountDialog = true;
      this.account = { ...account };
  }

  confirmDeleteSelected() {
      this.deleteAccountDialog = true;
      this.accounts = this.accounts.filter(val => !this.selectedAccounts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Accounts Deleted', life: 3000 });
      this.selectedAccounts = [];
  }

  confirmDelete() {
      this.deleteAccountDialog = false;
      this.accounts = this.accounts.filter(val => val.id !== this.account.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000 });
      this.account = {};
  }

  hideDialog() {
      this.AccountDialog = false;
      this.submitted = false;
  }

  saveAccount() {
      this.submitted = true;

      if (this.account.name?.trim()) {
          if (this.account.id) {
              // @ts-ignore
              this.account.accountstatus = this.account.accountstatus.value ? this.account.accountstatus.value : this.account.accountstatus;
              this.accounts[this.findIndexById(this.account.id)] = this.account;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'account Updated', life: 3000 });
          } else {
              this.account.id = this.createId();
              this.account.code = this.createId();
             // this.account.image = 'product-placeholder.svg';
              // @ts-ignore
              this.account.accountstatus = this.account.accountstatus ? this.account.accountstatus.value : 'Document';
              this.accounts.push(this.account);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'account Created', life: 3000 });
          }

          this.accounts = [...this.accounts];
          this.AccountDialog = false;
          this.account = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.accounts.length; i++) {
          if (this.accounts[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
