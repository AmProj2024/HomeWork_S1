/*..........................................................*/


import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { addAttempetedProjectComponent } from '../addAttempetedProject/addAttempetedProject.component';
//import { AttempetedProject, AttempetedProjectModel }  from 'src/app/demo/api/AttempetedProject.Model';
import { deleteAttempetedProject, getAttempetedProject_Action, loadAttempetedProject, openpopup, addAttempetedProject, updateAttempetedProject, deleteListAttempetedProject } from 'src/app/demo/Store/AttempetedProject/AttempetedProject.Action';
import { getAttempetedProject, getAttempetedProjectlist } from 'src/app/demo/Store/AttempetedProject/AttempetedProject.Selectors';
import { AttempetedProject } from 'src/app/demo/api/AttempetedProject.Model';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable, first } from 'rxjs';
 import { projecttype } from 'src/app/demo/api/projecttype';
import { projecttypeService } from 'src/app/demo/service/Projecttype.Service';
import { Dropdown } from 'primeng/dropdown';
import { parse } from 'uuid';

@Component({
  selector: 'app- AttempetedProject',
  templateUrl: './AttempetedProject.component.html',
  //styleUrls: ['./AttempetedProject.component.css'],
  providers: [MessageService],
})
export class AttempetedProjectComponent implements OnInit {

  AttempetedProjectlist: AttempetedProject[] = [];
  selectedAttempetedProjects: AttempetedProject[] = [];
  //project! : AttempetedProject {};
  AttempetedProject: AttempetedProject = {};

  AttempetedProjectdatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cols: any[] = [];
  projectType: projecttype[] = [];
  selectedAttempetedProject: AttempetedProject = {};
  deleteDialog!: boolean;
  deleteDialogs: boolean = false;
  submitted: boolean = false;
  AttempetedProjectDialog: boolean = false;

  //selectedproject : AttempetedProject={};

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

    this.store.dispatch(loadAttempetedProject());
     this.Reload_Data();
      this.projecttypeservice.getprojecttype().subscribe(projecttypes => {
      this.projectType = projecttypes;
    });


  }

  FunctionAdd() {
    this.AttempetedProjectDialog = true;
    this.AttempetedProject = {
      name: '',
      Description: '',
      EndAt: '',
      StartAt: '',
      Title: ''
    };
    this.submitted = false;
    this.AttempetedProjectDialog = true;



  }

  FunctionEdit(AttempetedProject: AttempetedProject) {
    this.AttempetedProject = { ...AttempetedProject };
    this.AttempetedProjectDialog = true;

    //this.OpenPopup(code, 'Update AttempetedProject');
    //  this.store.dispatch(getAttempetedProject_Action({ id: code }))
  }

  FunctionDelete(code: number) {
    //if (confirm('do you want to remove?')) {
    // this.confirmDelete();
    this.store.dispatch(deleteAttempetedProject({ code: code }));

  }

  deleteSelectedRow() {
    this.deleteDialogs = true;

  }



  OpenPopup(code: number, title: string) {
    this.store.dispatch(openpopup());
   //this.dialog.open(addAttempetedProjectComponent, {
   //  width: '50%',
   //  enterAnimationDuration: '1000ms',
   //  exitAnimationDuration: '1000ms',
   //  data: {
   //    code: code,
   //    title: title
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
      if (this.AttempetedProject.id) {
     //   alert(this.project.projecttypeId);

        const _obj: AttempetedProject = {
          id: this.AttempetedProject.id,
        // name: this.AttempetedProject.name,
        // Title: this.AttempetedProject.Title,
        // Description: this.AttempetedProject.Description,
        // StartAt: this.AttempetedProject.StartAt,
        // EndAt: this.AttempetedProject.EndAt,
        // cost: this.AttempetedProject.cost,

        }

        //   alert(_obj.id + _obj.Title);
        this.store.dispatch(updateAttempetedProject({ inputdata: _obj }));
        // this.store.pipe(select(getAttempetedProjectlist)).subscribe((AttempetedProjectlist: AttempetedProject[]) => {
        //   this.AttempetedProjectlist = AttempetedProjectlist;
        //   this.AttempetedProjectdatasource = AttempetedProjectlist;
        // });

        this.Reload_Data();

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        this.AttempetedProjectDialog = false;

      }
      else {

        const _obj: AttempetedProject = {
          id: this.createId(),
        //  name: this.project.name,
        //  Title: this.project.Title,
        //  Description: this.project.Description,
        //  projecttypeId: this.project.projecttypeId,
        //  StartAt: this.project.StartAt,
        //  EndAt: this.project.EndAt,
        //  cost: this.project.cost,
        }
        this.store.dispatch(addAttempetedProject({ inputdata: _obj }));
        // this.store.dispatch(loadAttempetedProject());
        this.Reload_Data();
        this.AttempetedProjectDialog = false;

        
        this.Reload_Data();
        //this.AttempetedProjectDialog = false;
        
      }
    }
  };

  hideDialog() {
    this.AttempetedProjectDialog = false;
    this.submitted = false;
  }
  createId(): number {
    const min = 10000; // Minimum value for the random number
    const max = 99999; // Maximum value for the random number

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  confirmDeleteSelected() {
    this.deleteDialogs = false;
    // this.AttempetedProjectlist = this.AttempetedProjectlist.filter(val => !this.selectedAttempetedProjects.includes(val));

    const numDelete: number[] = [];
    this.selectedAttempetedProjects.forEach((AttempetedProject) => {
      numDelete.push(this.AttempetedProject.id!);
    });
    //alert(numDelete.length)

    this.store.dispatch(deleteListAttempetedProject({ codes: numDelete }));

    this.Reload_Data();

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'projects Deleted', life: 3000 });
    this.selectedAttempetedProjects = [];


  }

  async confirmDelete(code: number) {
    this.deleteDialog = true;
    //this.AttempetedProjectlist = this.AttempetedProjectlist.filter(val => val.id !== this.project.id);
    //const cod = this.AttempetedProject.id;
    await this.store.dispatch(deleteAttempetedProject({ code }));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'AttempetedProject Deleted', life: 3000 });

    this.Reload_Data();
    //this.selectedAttempetedProject = {};
    this.deleteDialog = false;
  }

  async Reload_Data() {

    await this.store.pipe(select(getAttempetedProjectlist)).subscribe((AttempetedProjectlist: AttempetedProject[]) => {
      this.AttempetedProjectlist = AttempetedProjectlist;


    });


    const projectTypeMap = new Map<number, string>();
    this.projectType.forEach((type) => {
      projectTypeMap.set((parseInt(type.id as string)) , type.name??"");
    });


  }


  }

  