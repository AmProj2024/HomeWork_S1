import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { addAllprojectComponent } from '../addAllproject/addAllproject.component';
import {  Allproject, AllprojectModel } from 'src/app/demo/Store/Allproject.model';
import { deleteAllproject, getAllproject_Action, loadAllproject, openpopup,addAllproject } from 'src/app/demo/Store/Allproject.Action_';
import { getAllproject, getAllprojectlist } from 'src/app/demo/Store/Allproject.Selectors';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-allproject-list',
  templateUrl: './AllProjectlist.component.html',
  styleUrls: ['./AllProjectlist.component.css'],
  providers:[MessageService],
})
export class AllProjectListComponent implements OnInit  {

  Allprojectlist: Allproject[]=[];
  //project! : Allproject {};
  project : Allproject ={
    id: 1,
    name: '',
    Description: '',
    EndAt: '',
    StartAt: '',
    Title: ''
  };

  Allprojectdatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cols: any[] = [];
  selectedAllproject? :Allproject;
  deleteprojectDialog! : boolean;
  submitted : boolean = false;
  selectedAllprojects! :Allproject[];
  AllprojectDailog : boolean=false;


  displayedColums: string[] = ["code", "name", "action"]
  constructor(private dialog: MatDialog, private store: Store,private messageService:MessageService,@Inject(DOCUMENT) private document: Document) {

  }




  ngOnInit(): void {
    // this.store.dispatch(loadAllproject());
    // this.store.select(getAllprojectlist).subscribe(item => {
    //   this.Allprojectlist = item;
    //   this.Allprojectdatasource = new MatTableDataSource<Allproject>(this.Allprojectlist);
    //   this.Allprojectdatasource.paginator = this.paginator;
    //   this.Allprojectdatasource.sort = this.sort;
    // });
    this.store.pipe(select(getAllprojectlist)).subscribe((allprojectlist: Allproject[]) => {
      this.Allprojectlist = allprojectlist;
    });
    this.cols = [
      { field: 'id', header: 'id' },
      { field: ' name', header: 'Name' },
      { field: 'Title', header: 'Title' },
      { field: 'Description', header: 'Description' },
      { field: 'StartAt', header: 'StartAt' },
      { field: 'EndAt', header: 'EndAt' },
      { field: 'cost', header: 'cost' },
  
    ];

    /*
    
    export interface Allproject {
    id: number,
    name: string
    Description:string,
    EndAt : string,
    StartAt:string,
    Title:string,
    cost?:number
}

export interface AllprojectModel {
    list: Allproject[],
    Allprojectobj: Allproject,
    errormessage: string
}
     */
  
    // this.transactiontypes = [
    //   { label: 'deposit', value: 'deposit' },
    //   { label: 'withdraw', value: 'withdraw' },
    // ];
  
  
  
  
  
  }



 
  FunctionAdd() {
   // this.OpenPopup(0, 'Create Project')
    this.AllprojectDailog=true;
    this.project = {
      id: 1,
      name: '',
      Description: '',
      EndAt: '',
      StartAt: '',
      Title: ''
    };
    this.submitted = false;
    this.AllprojectDailog = true;



  }

  FunctionEdit(code: number) {
    this.OpenPopup(code, 'Update Project');
    this.store.dispatch(getAllproject_Action({ id: code }))
  }

  FunctionDelete(code: number) {
    if (confirm('do you want to remove?')) {
      this.store.dispatch(deleteAllproject({ code: code }));
    }
  }

  deleteSelectedproject() {
    this.deleteprojectDialog = true;


  }



  OpenPopup(code: number, title: string) {
    this.store.dispatch(openpopup());
    this.dialog.open(addAllprojectComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  saveProject() {
    this.submitted = true;

    //if (this.product.name?.trim()) 
    {
      if (this.project.id) {
        // @ts-ignore
        //   this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
        
        // this.Transaction.transactiontype =  this.Transaction.transactiontype ?  this.Transaction.transactiontype :  this.Transaction.transactiontype;
        // this.Transaction.accountid = this.Transaction.accountid ? this.Transaction.accountid : this.Transaction.accountid;
        this.project[this.findIndexById(this.project.id)] = this.project;
        alert(this.project.id + "\n" + this.project.id +"\n"+ this.project.id  );



        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        
        const _obj: Allproject = {
          id:1,//this.project.id = this.createId(),
          name:this.project.name ,
          Title:this.project.Title ,
          Description:this.project.Description ,
          StartAt:this.project.StartAt ,
          EndAt:this.project.EndAt ,
          cost:this.project.cost ,

        }
        this.store.dispatch(addAllproject({inputdata :_obj}));
      //  this.store.dispatch(loadAllproject());

        // this.store.select(getAllprojectlist).subscribe(item=>{
        //   this.Allprojectlist = item;
        //   this.Allprojectdatasource = new MatTableDataSource<Allproject>(this.Allprojectlist);
        //   this.Allprojectdatasource.paginator = this.paginator;
        //   this.Allprojectdatasource.sort = this.sort;

        // });

        this.store.dispatch(loadAllproject());
        this.store.pipe(select(getAllprojectlist)).subscribe((allprojectlist: Allproject[]) => {
          this.Allprojectlist = allprojectlist;
        });


        
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
     // this.Allprojectdatasource = [...this.Allprojectdatasource];
     // this.AllprojectDailog = false;
     // this.project = {};
    
  }
 }
};

  hideDialog() {
    this.AllprojectDailog = false;
    this.submitted = false;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  }



  confirmDeleteSelected() {
    this.deleteprojectDialog = false;
   // this.Allprojectlist = this.Allprojectlist.filter(val => !this.selectedAllprojects.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Deleted', life: 3000 });
    this.selectedAllprojects = [];
  }
  
  confirmDelete() {
    this.deleteprojectDialog = false;
   // this.Allprojectlist = this.Allprojectlist.filter(val => val.id !== this.project.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Deleted', life: 3000 });
    //this.selectedAllproject = {};
  }


}

