/*..........................................................*/


import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { addNewCostCenterComponent } from '../addNewCostCenter/addNewCostCenter.component';
//import { NewCostCenter, NewCostCenterModel }  from 'src/app/demo/api/NewCostCenter.Model';
import { deleteNewCostCenter, getNewCostCenter_Action, loadNewCostCenter, openpopup, addNewCostCenter, updateNewCostCenter, deleteListNewCostCenter } from 'src/app/demo/Store/NewCostCenter/NewCostCenter.Action';
import { getNewCostCenter, getNewCostCenterlist } from 'src/app/demo/Store/NewCostCenter/NewCostCenter.Selectors';
import { NewCostCenter } from 'src/app/demo/api/NewCostCenter.Model';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable, first } from 'rxjs';
 import { projecttype } from 'src/app/demo/api/projecttype';
import { projecttypeService } from 'src/app/demo/service/Projecttype.Service';
import { Dropdown } from 'primeng/dropdown';
import { parse } from 'uuid';
import { SharedProjecttypeService } from 'src/app/demo/service/Shared.projecttype.Service';

@Component({
  selector: 'app- NewCostCenter',
  templateUrl: './NewCostCenter.component.html',
  //styleUrls: ['./NewCostCenter.component.css'],
  providers: [MessageService],
})
export class NewCostCenterComponent implements OnInit {

  NewCostCenterlist: NewCostCenter[] = [];
  selectedNewCostCenters: NewCostCenter[] = [];
  //project! : NewCostCenter {};
  NewCostCenter: NewCostCenter = {};

  NewCostCenterdatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cols: any[] = [];
  projectType: projecttype[] = [];
  selectedNewCostCenter: NewCostCenter  = {};
  deleteDialog!: boolean;
  deleteDialogs: boolean = false;
  submitted: boolean = false;
  NewCostCenterDialog: boolean = false;
  DataGridList: NewCostCenter[] = [];


  //selectedproject : NewCostCenter={};

  displayedColums: string[] = ["code", "name", "action"]
  constructor(private dialog: MatDialog, private store: Store, private messageService: MessageService) {

  }




   ngOnInit():  void {

    this.cols = [
      { field: 'id', header: 'id' },
      { field: ' name', header: 'Name' },
      { field: 'Title', header: 'Title' },
      { field: 'Description', header: 'Description' },
      { field: 'StartAt', header: 'StartAt' },
      { field: 'EndAt', header: 'EndAt' },
      { field: 'cost', header: 'cost' },

    ];

    this.store.dispatch(loadNewCostCenter());
     this.Reload_Data();
      //this.projecttypeservice.getprojecttype().subscribe(projecttypes => {
      //this.projectType = projecttypes;
    //}
    //);


  }

  FunctionAdd() {
    this.NewCostCenterDialog = true;
    this.NewCostCenter = {
      // name: '',
      // Description: '',
      // EndAt: '',
      // StartAt: '',
      // Title: ''
    };
    this.submitted = false;
    this.NewCostCenterDialog = true;



  }

  FunctionEdit(NewCostCenter: NewCostCenter) {
    this.NewCostCenter = { ...NewCostCenter };
    this.NewCostCenterDialog = true;

    //this.OpenPopup(code, 'Update NewCostCenter');
    //  this.store.dispatch(getNewCostCenter_Action({ id: code }))
  }

  FunctionDelete(code: number) {
    //if (confirm('do you want to remove?')) {
    // this.confirmDelete();
    this.store.dispatch(deleteNewCostCenter({ code: code }));

  }

  deleteSelectedRow() {
    this.deleteDialogs = true;

  }



  OpenPopup(code: number, title: string) {
    this.store.dispatch(openpopup());
   // this.dialog.open(addNewCostCenter, {
   //   width: '50%',
   //   enterAnimationDuration: '1000ms',
   //   exitAnimationDuration: '1000ms',
   //   data: {
   //     code: code,
   //     title: title
   //   }
   // })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  Save() {
    this.submitted = true;
    //if (this.product.name?.trim()) 
    {
      if (this.NewCostCenter.id) {
     //   alert(this.project.projecttypeId);

        const _obj: NewCostCenter = {
          id: this.NewCostCenter.id,
        // name: this.NewCostCenter.name,
        // Title: this.NewCostCenter.Title,
        // Description: this.NewCostCenter.Description,
        // StartAt: this.NewCostCenter.StartAt,
        // EndAt: this.NewCostCenter.EndAt,
        // cost: this.NewCostCenter.cost,

        }

        //   alert(_obj.id + _obj.Title);
        this.store.dispatch(updateNewCostCenter({ inputdata: _obj }));
        // this.store.pipe(select(getNewCostCenterlist)).subscribe((NewCostCenterlist: NewCostCenter[]) => {
        //   this.NewCostCenterlist = NewCostCenterlist;
        //   this.NewCostCenterdatasource = NewCostCenterlist;
        // });

        this.Reload_Data();

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        this.NewCostCenterDialog = false;

      }
      else {

        const _obj: NewCostCenter = {
          id: this.createId(),
        //  name: this.project.name,
        //  Title: this.project.Title,
        //  Description: this.project.Description,
        //  projecttypeId: this.project.projecttypeId,
        //  StartAt: this.project.StartAt,
        //  EndAt: this.project.EndAt,
        //  cost: this.project.cost,
        }
        this.store.dispatch(addNewCostCenter({ inputdata: _obj }));
        // this.store.dispatch(loadNewCostCenter());
        this.Reload_Data();
        this.NewCostCenterDialog = false;

        
        this.Reload_Data();
        //this.NewCostCenterDialog = false;
        
      }
    }
  };

  hideDialog() {
    this.NewCostCenterDialog = false;
    this.submitted = false;
  }
  createId(): number {
    const min = 10000; // Minimum value for the random number
    const max = 99999; // Maximum value for the random number

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async  confirmDeleteSelected() {
    this.deleteDialogs = false;
    const numDelete: number[] = [];
    this.selectedNewCostCenters.forEach((NewCostCenter) => {
      numDelete.push(NewCostCenter.id!);
    })
    //alert(numDelete.length)

    this.store.dispatch(deleteListNewCostCenter({ codes: numDelete }));

    this.Reload_Data();

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'projects Deleted', life: 3000 });
    this.selectedNewCostCenters = [];


  }

  async confirmDelete(code: number) {
    // this.deleteDialog = true;
    // //this.NewCostCenterlist = this.NewCostCenterlist.filter(val => val.id !== this.project.id);
    // //const cod = this.NewCostCenter.id;
    // await this.store.dispatch(deleteNewCostCenter({ code }));
    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'NewCostCenter Deleted', life: 3000 });

    // this.Reload_Data();
    // //this.selectedNewCostCenter = {};
    // this.deleteDialog = false;
  }

  async Reload_Data() {

    await this.store.pipe(select(getNewCostCenterlist)).subscribe((NewCostCenterlist: NewCostCenter[]) => {
      this.NewCostCenterlist = NewCostCenterlist;


    });


    const projectTypeMap = new Map<number, string>();
    this.projectType.forEach((type) => {
      projectTypeMap.set((parseInt(type.id as string)) , type.name??"");
    });


  }

  }

  