/*..........................................................*/

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*..........................................................*/


import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { deleteAccount, getAccount_Action, loadAccount, openpopup, addAccount, updateAccount, deleteListAccount } from 'src/app/demo/Store/Account/Account.Action';
import { getAccount, getAccountlist } from 'src/app/demo/Store/Account/Account.Selectors';
import { Account } from 'src/app/demo/api/Account.Model';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable, first } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { parse } from 'uuid';
import { userservice } from 'src/app/demo/service/user.service';
import { user } from 'src/app/demo/api/User';

@Component({
  selector: 'app-Account',
  templateUrl: './Account.Component.html',
  //styleUrls: ['./Account.component.css'],
  providers: [MessageService],
})
export class AccountComponent implements OnInit {
  Accountlist: Account[] = [];
  selectedAccounts: Account[] = [];
  Account: Account = {};
  Accountdatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cols: any[] = [];
  selectedAccount: Account = {};
  DataGridlist: Account[] = [];
  UsersDropDownList: user[] = [];
  deleteDialog!: boolean;
  deleteDialogs: boolean = false;
  submitted: boolean = false;
  AccountDialog: boolean = false;
  displayedColums: string[] = ["code", "name", "action"]
  
  constructor(private dialog: MatDialog, private store: Store, private messageService: MessageService, private UserService: userservice ) {}

  ngOnInit(): void {

    this.cols = [
     // { field: 'id', header: 'id' },
     // { field: 'Name', header: 'Name' },
     // { field: 'Title', header: 'Title' },
     // { field: 'Description', header: 'Description' },
     // { field: 'IsAccount', header: 'IsAccount' },
     // { field: 'BirthDate', header: 'BirthDate' },
     // { field: 'UserId', header: 'UserId' },

    ];

    this.store.dispatch(loadAccount());
    this.Reload_Data();
    

  }
  FunctionAdd() {
    this.AccountDialog = true;
    this.Account = {
      // id?:''
      // Name:''

      //   name: '',
      //   Description: '',
      //   EndAt: '',
      //   StartAt: '',
      //   Title: ''
    };
    this.submitted = false;
    this.AccountDialog = true;
  }
  FunctionEdit(Account: Account) {
    this.Account = { ...Account };
    this.AccountDialog = true;

  }
  async FunctionDelete(code: number) {
    await this.store.dispatch(deleteAccount({ code: code }));
  }

  deleteSelectedRows() {
    this.deleteDialogs = true;
  }
  deleteSelectedRow(selectedAccount: Account) {
    this.Account = { ...selectedAccount };
    this.deleteDialog = true;
  }
  OpenPopup(code: number, title: string) {
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
  Save() {
    this.submitted = true;
    {
      if (this.Account.id) {
        const _obj: Account = {
          id: this.Account.id,
          Name: this.Account.Name,

        }
        this.store.dispatch(updateAccount({ inputdata: _obj }));
        this.AccountDialog = false;
        this.Reload_Data();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {

        const _obj: Account = {
          id: this.createId(),
          Name: this.Account.Name,

        }
        this.AccountDialog = false;
        this.store.dispatch(addAccount({ inputdata: _obj }));
        this.Reload_Data();
      }
    }
  };

  hideDialog() {
    this.AccountDialog = false;
    this.submitted = false;
  }
  createId(): number {
    const min = 10000; // Minimum value for the random number
    const max = 99999; // Maximum value for the random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  confirmDeleteSelected() {
    const numDelete: number[] = [];
    this.selectedAccounts.forEach((Account) => {
      numDelete.push(Account.id!);
    });

    this.store.dispatch(deleteListAccount({ codes: numDelete }));
    this.Reload_Data();
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Accounts Deleted', life: 3000 });
    this.selectedAccounts = [];
    this.deleteDialogs = false;
  }

  async confirmDelete() {
    await this.store.dispatch(deleteAccount({ code: this.Account.id ?? 0 }));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000 });
    this.deleteDialog = false;
    this.Reload_Data();
    this.Account = {};
  }
  async Reload_Data() {
    this.Accountlist.splice(0, this.Accountlist.length);
    await this.store.pipe(select(getAccountlist)).subscribe((Accountlist: Account[]) => {
      this.Accountlist = Accountlist;
    });

  }
}


  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







  