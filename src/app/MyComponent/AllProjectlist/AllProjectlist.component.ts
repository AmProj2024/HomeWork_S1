import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { addAllprojectComponent } from '../addAllproject/addAllproject.component';
import {  Allproject, AllprojectModel } from 'src/app/demo/Store/Allproject.model';
import { deleteAllproject, getAllproject_Action, loadAllproject, openpopup,addAllproject, updateAllproject } from 'src/app/demo/Store/Allproject.Action_';
import { getAllproject, getAllprojectlist } from 'src/app/demo/Store/Allproject.Selectors';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable, first } from 'rxjs';
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
    id:1,
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
  //selectedproject : Allproject={};

  displayedColums: string[] = ["code", "name", "action"]
  constructor(private dialog: MatDialog, private store: Store,private messageService:MessageService,@Inject(DOCUMENT) private document: Document) {

  }




  ngOnInit(): void {

    this.cols = [
      { field: 'id', header: 'id' },
      { field: ' name', header: 'Name' },
      { field: 'Title', header: 'Title' },
      { field: 'Description', header: 'Description' },
      { field: 'StartAt', header: 'StartAt' },
      { field: 'EndAt', header: 'EndAt' },
      { field: 'cost', header: 'cost' },
  
    ];

    this.store.dispatch(loadAllproject());
    this.store.pipe(select(getAllprojectlist)).subscribe((allprojectlist: Allproject[]) => {
      this.Allprojectlist = allprojectlist;
      this.Allprojectdatasource = allprojectlist;
    });
  
  }



 
  FunctionAdd() {
    this.AllprojectDailog=true;
    this.project = {
      name: '',
      Description: '',
      EndAt: '',
      StartAt: '',
      Title: ''
    };
    this.submitted = false;
    this.AllprojectDailog = true;



  }

  FunctionEdit(project:Allproject) {
    this.project = { ...project };
    this.AllprojectDailog = true;

    //this.OpenPopup(code, 'Update Project');
  //  this.store.dispatch(getAllproject_Action({ id: code }))
  }

  FunctionDelete(code: number) {
    //if (confirm('do you want to remove?')) {
     // this.confirmDelete();
      this.store.dispatch(deleteAllproject({ code: code }));
    
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
   
        const _obj: Allproject = {
          id : this.project.id,
          name:this.project.name ,
          Title:this.project.Title ,
          Description:this.project.Description ,
          StartAt:this.project.StartAt ,
          EndAt:this.project.EndAt ,
          cost:this.project.cost ,

        }

        alert(_obj.id + _obj.Title);
        this.store.dispatch(updateAllproject({inputdata :_obj}));
       
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        
        const _obj: Allproject = {
          id:this.createId(),
          name:this.project.name ,
          Title:this.project.Title ,
          Description:this.project.Description ,
          StartAt:this.project.StartAt ,
          EndAt:this.project.EndAt ,
          cost:this.project.cost ,

        }
        this.store.dispatch(addAllproject({inputdata :_obj}));
        this.store.dispatch(loadAllproject());

this.AllprojectDailog = false;

  }
 }
};

  hideDialog() {
    this.AllprojectDailog = false;
    this.submitted = false;
  }
  createId(): number {
    const min = 10000; // Minimum value for the random number
    const max = 99999; // Maximum value for the random number
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  confirmDeleteSelected() {
    this.deleteprojectDialog = false;
    this.Allprojectlist = this.Allprojectlist.filter(val => !this.selectedAllprojects.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Deleted', life: 3000 });
    this.selectedAllprojects = [];
  }
  
  confirmDelete(code:number) {
    this.deleteprojectDialog = true;
   //this.Allprojectlist = this.Allprojectlist.filter(val => val.id !== this.project.id);
  //const cod = this.project.id;
  this.store.dispatch(deleteAllproject({code}));

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Deleted', life: 3000 });
    //this.selectedAllproject = {};
    this.deleteprojectDialog = false; 
  }


}

