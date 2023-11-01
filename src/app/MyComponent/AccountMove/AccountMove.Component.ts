/*..........................................................*/

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*..........................................................*/


import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { deleteAccountMove, getAccountMove_Action, loadAccountMove, openpopup, addAccountMove, updateAccountMove, deleteListAccountMove } from 'src/app/demo/Store/AccountMove/AccountMove.Action';
import { getAccountMove, getAccountMovelist } from 'src/app/demo/Store/AccountMove/AccountMove.Selectors';
import { AccountMove } from 'src/app/demo/api/AccountMove.Model';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable, first } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { parse } from 'uuid';
import { userservice } from 'src/app/demo/service/user.service';
import { user } from 'src/app/demo/api/User';
import { AccountService } from 'src/app/demo/service/Account.service';
import { Account } from 'src/app/demo/api/Account.Model';
@Component({
  selector: 'app-AccountMove',
  templateUrl: './AccountMove.Component.html',
  //styleUrls: ['./AccountMove.component.css'],
  providers: [MessageService],
})
export class AccountMoveComponent implements OnInit {
  AccountMovelist: AccountMove[] = [];
  selectedAccountMoves: AccountMove[] = [];
  AccountMove: AccountMove = {};
  AccountMovedatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cols: any[] = [];
  selectedAccountMove: AccountMove = {};
  DataGridlist: AccountMove[] = [];
  UsersDropDownList: user[] = [];
  deleteDialog!: boolean;
  deleteDialogs: boolean = false;
  submitted: boolean = false;
  AccountMoveDialog: boolean = false;
  displayedColums: string[] = ["code", "name", "action"]
  AccountsDropDownList : Account[]=[];

  constructor(private dialog: MatDialog, private store: Store, private messageService: MessageService, private UserService: userservice ,private AccountService:AccountService) {}

  ngOnInit(): void {

    this.cols = [
     // { field: 'id', header: 'id' },
     // { field: 'Name', header: 'Name' },
     // { field: 'Title', header: 'Title' },
     // { field: 'Description', header: 'Description' },
     // { field: 'IsAccountMove', header: 'IsAccountMove' },
     // { field: 'BirthDate', header: 'BirthDate' },
     // { field: 'UserId', header: 'UserId' },

    ];

    this.store.dispatch(loadAccountMove());
    this.Reload_Data();
          this.AccountService.GetAll().subscribe(Account => {this.AccountsDropDownList = Account});

  }
  FunctionAdd() {
    this.AccountMoveDialog = true;
    this.AccountMove = {
      //   name: '',
      //   Description: '',
      //   EndAt: '',
      //   StartAt: '',
      //   Title: ''
    };
    this.submitted = false;
    this.AccountMoveDialog = true;
  }
  FunctionEdit(AccountMove: AccountMove) {
    this.AccountMove = { ...AccountMove };
    this.AccountMoveDialog = true;

  }
  async FunctionDelete(code: number) {
    await this.store.dispatch(deleteAccountMove({ code: code }));
  }

  deleteSelectedRows() {
    this.deleteDialogs = true;
  }
  deleteSelectedRow(selectedAccountMove: AccountMove) {
    this.AccountMove = { ...selectedAccountMove };
    this.deleteDialog = true;
  }
  OpenPopup(code: number, title: string) {
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

getnambyid(idname:number)
{
  var ppp = this.AccountService.Getbycode(idname);
  alert("idname ");
  // ppp.pipe().subscribe(x=>this.AccountMove.AccountName = x.Name
    
  //   );

    alert("this.AccountMove.AccountName "+ this.AccountMove.AccountName)

}
  Save() {
    this.submitted = true;
    {
      if (this.AccountMove.id) {
        this.getnambyid(this.AccountMove.AccountId??0);
        const _obj: AccountMove = {
          id: this.AccountMove.id,
         //AccountName : this.AccountService.Getbycode(this.AccountMove.AccountId??0).toPromise().then((x)=> x?.Name)??"",//this.AccountMove.AccountName,
         AccountId : this.AccountMove.AccountId,
         AccountName : this.AccountMove.AccountName,
          Debit : this.AccountMove.Debit,
          Credit : this.AccountMove.Credit,
          TotalCredit:this.AccountMove.TotalCredit,
          TotalDebit:this.AccountMove.TotalDebit,
          Date:this.AccountMove.Date,
          Amount:this.AccountMove.Amount

        }
        this.store.dispatch(updateAccountMove({ inputdata: _obj }));
        this.AccountMoveDialog = false;
        this.Reload_Data();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        this.getnambyid(this.AccountMove.AccountId??0);
        const _obj: AccountMove = {
          id: this.createId(),
          AccountName : this.AccountMove.AccountName,
          AccountId : this.AccountMove.AccountId,
          Debit : this.AccountMove.Debit,
          Credit : this.AccountMove.Credit,
          TotalCredit:this.AccountMove.TotalCredit,
          TotalDebit:this.AccountMove.TotalDebit,
          Date:this.AccountMove.Date,
          Amount:this.AccountMove.Amount


        }
        this.AccountMoveDialog = false;
        this.store.dispatch(addAccountMove({ inputdata: _obj }));
        this.Reload_Data();
        
      }
    }
  };

  hideDialog() {
    this.AccountMoveDialog = false;
    this.submitted = false;
  }
  createId(): number {
    const min = 10000; // Minimum value for the random number
    const max = 99999; // Maximum value for the random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  confirmDeleteSelected() {
    const numDelete: number[] = [];
    this.selectedAccountMoves.forEach((AccountMove) => {
      numDelete.push(AccountMove.id!);
    });

    this.store.dispatch(deleteListAccountMove({ codes: numDelete }));
    this.Reload_Data();
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'AccountMoves Deleted', life: 3000 });
    this.selectedAccountMoves = [];
    this.deleteDialogs = false;
  }

  async confirmDelete() {
    await this.store.dispatch(deleteAccountMove({ code: this.AccountMove.id ?? 0 }));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'AccountMove Deleted', life: 3000 });
    this.deleteDialog = false;
    this.Reload_Data();
    this.AccountMove = {};
  }
  async Reload_Data() {
    this.AccountMovelist.splice(0, this.AccountMovelist.length);
    await this.store.pipe(select(getAccountMovelist)).subscribe((AccountMovelist: AccountMove[]) => {
      this.AccountMovelist = AccountMovelist;
    });

  }
}
