/*..........................................................*/

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*..........................................................*/


import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { deleteProjectActivity, getProjectActivity_Action, loadProjectActivity, openpopup, addProjectActivity, updateProjectActivity, deleteListProjectActivity } from 'src/app/demo/Store/ProjectActivity/ProjectActivity.Action';
import { getProjectActivity, getProjectActivitylist } from 'src/app/demo/Store/ProjectActivity/ProjectActivity.Selectors';
import { ProjectActivity } from 'src/app/demo/api/ProjectActivity.Model';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable, first } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { parse } from 'uuid';
import { userservice } from 'src/app/demo/service/user.service';
import { user } from 'src/app/demo/api/User';
import { ActivityService } from 'src/app/demo/service/Activity.Service';
import { Activity } from 'src/app/demo/api/Activity.Model';
@Component({
  selector: 'app-ProjectActivity',
  templateUrl: './ProjectActivity.Component.html',
  //styleUrls: ['./ProjectActivity.component.css'],
  providers: [MessageService],
})
export class ProjectActivityComponent implements OnInit {
  ProjectActivitylist: ProjectActivity[] = [];
  selectedProjectActivitys: ProjectActivity[] = [];
  ProjectActivity: ProjectActivity = {};
  ProjectActivitydatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cols: any[] = [];
  selectedProjectActivity: ProjectActivity = {};
  DataGridlist: ProjectActivity[] = [];
  UsersDropDownList: user[] = [];
  deleteDialog!: boolean;
  deleteDialogs: boolean = false;
  submitted: boolean = false;
  ProjectActivityDialog: boolean = false;
  displayedColums: string[] = ["code", "name", "action"]
  ActivitysDropDownList : Activity[]=[];

  constructor(private dialog: MatDialog, private store: Store, private messageService: MessageService, private UserService: userservice ,private ActivityService:ActivityService) {}

  ngOnInit(): void {

    this.cols = [
     // { field: 'id', header: 'id' },
     // { field: 'Name', header: 'Name' },
     // { field: 'Title', header: 'Title' },
     // { field: 'Description', header: 'Description' },
     // { field: 'IsProjectActivity', header: 'IsProjectActivity' },
     // { field: 'BirthDate', header: 'BirthDate' },
     // { field: 'UserId', header: 'UserId' },

    ];

    this.store.dispatch(loadProjectActivity());
    this.Reload_Data();
          this.ActivityService.GetAll().subscribe(Activity => {this.ActivitysDropDownList = Activity});

  }
  FunctionAdd() {
    this.ProjectActivityDialog = true;
    this.ProjectActivity = {
      //   name: '',
      //   Description: '',
      //   EndAt: '',
      //   StartAt: '',
      //   Title: ''
    };
    this.submitted = false;
    this.ProjectActivityDialog = true;
  }
  FunctionEdit(ProjectActivity: ProjectActivity) {
    this.ProjectActivity = { ...ProjectActivity };
    this.ProjectActivityDialog = true;

  }
  async FunctionDelete(code: number) {
    await this.store.dispatch(deleteProjectActivity({ code: code }));
  }

  deleteSelectedRows() {
    this.deleteDialogs = true;
  }
  deleteSelectedRow(selectedProjectActivity: ProjectActivity) {
    this.ProjectActivity = { ...selectedProjectActivity };
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
      if (this.ProjectActivity.id) {
        const _obj: ProjectActivity = {
          id: this.ProjectActivity.id,
          Name: this.ProjectActivity.Name,
          Description: this.ProjectActivity.Description,
          ActivityId :this.ProjectActivity.ActivityId,
          Date:this.ProjectActivity.Date,
          IsActive:this.ProjectActivity.IsActive

        }
        this.store.dispatch(updateProjectActivity({ inputdata: _obj }));
        this.ProjectActivityDialog = false;
        this.Reload_Data();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {

        const _obj: ProjectActivity = {
          id: this.createId(),
          Name: this.ProjectActivity.Name,
          Description: this.ProjectActivity.Description,
          ActivityId :this.ProjectActivity.ActivityId,
          Date:this.ProjectActivity.Date,
          IsActive:this.ProjectActivity.IsActive
        }
        this.ProjectActivityDialog = false;
        this.store.dispatch(addProjectActivity({ inputdata: _obj }));
        this.Reload_Data();
      }
    }
  };

  hideDialog() {
    this.ProjectActivityDialog = false;
    this.submitted = false;
  }
  createId(): number {
    const min = 10000; // Minimum value for the random number
    const max = 99999; // Maximum value for the random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  confirmDeleteSelected() {
    const numDelete: number[] = [];
    this.selectedProjectActivitys.forEach((ProjectActivity) => {
      numDelete.push(ProjectActivity.id!);
    });

    this.store.dispatch(deleteListProjectActivity({ codes: numDelete }));
    this.Reload_Data();
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ProjectActivitys Deleted', life: 3000 });
    this.selectedProjectActivitys = [];
    this.deleteDialogs = false;
  }

  async confirmDelete() {
    await this.store.dispatch(deleteProjectActivity({ code: this.ProjectActivity.id ?? 0 }));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ProjectActivity Deleted', life: 3000 });
    this.deleteDialog = false;
    this.Reload_Data();
    this.ProjectActivity = {};
  }
  async Reload_Data() {
    this.ProjectActivitylist.splice(0, this.ProjectActivitylist.length);
    await this.store.pipe(select(getProjectActivitylist)).subscribe((ProjectActivitylist: ProjectActivity[]) => {
      this.ProjectActivitylist = ProjectActivitylist;
    });

  }
}


  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







  