/*..........................................................*/

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*..........................................................*/


import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { deleteActivity, getActivity_Action, loadActivity, openpopup, addActivity, updateActivity, deleteListActivity } from 'src/app/demo/Store/Activity/Activity.Action';
import { getActivity, getActivitylist } from 'src/app/demo/Store/Activity/Activity.Selectors';
import { Activity } from 'src/app/demo/api/Activity.Model';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable, first } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { parse } from 'uuid';
import { userservice } from 'src/app/demo/service/user.service';
import { user } from 'src/app/demo/api/User';
import { EmployeeService } from 'src/app/demo/service/Employee.Service';
import { Employee } from 'src/app/demo/api/Employee.Model';
@Component({
  selector: 'app-Activity',
  templateUrl: './Activity.Component.html',
  //styleUrls: ['./Activity.component.css'],
  providers: [MessageService],
})
export class ActivityComponent implements OnInit {
  Activitylist: Activity[] = [];
  selectedActivitys: Activity[] = [];
  Activity: Activity = {};
  Activitydatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cols: any[] = [];
  selectedActivity: Activity = {};
  DataGridlist: Activity[] = [];
  UsersDropDownList: user[] = [];
  deleteDialog!: boolean;
  deleteDialogs: boolean = false;
  submitted: boolean = false;
  ActivityDialog: boolean = false;
  displayedColums: string[] = ["code", "name", "action"]
  EmployeesDropDownList : Employee[]=[];

  constructor(private dialog: MatDialog, private store: Store, private messageService: MessageService, private UserService: userservice ,private EmployeeService:EmployeeService) {}

  ngOnInit(): void {

    this.cols = [
     // { field: 'id', header: 'id' },
     // { field: 'Name', header: 'Name' },
     // { field: 'Title', header: 'Title' },
     // { field: 'Description', header: 'Description' },
     // { field: 'IsActivity', header: 'IsActivity' },
     // { field: 'BirthDate', header: 'BirthDate' },
     // { field: 'UserId', header: 'UserId' },

    ];

    this.store.dispatch(loadActivity());
    this.Reload_Data();
          this.EmployeeService.GetAll().subscribe(Employee => {this.EmployeesDropDownList = Employee});

  }
  FunctionAdd() {
    this.ActivityDialog = true;
    this.Activity = {
      //   name: '',
      //   Description: '',
      //   EndAt: '',
      //   StartAt: '',
      //   Title: ''
    };
    this.submitted = false;
    this.ActivityDialog = true;
  }
  FunctionEdit(Activity: Activity) {
    this.Activity = { ...Activity };
    this.ActivityDialog = true;

  }
  async FunctionDelete(code: number) {
    await this.store.dispatch(deleteActivity({ code: code }));
  }

  deleteSelectedRows() {
    this.deleteDialogs = true;
  }
  deleteSelectedRow(selectedActivity: Activity) {
    this.Activity = { ...selectedActivity };
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
      if (this.Activity.id) {
        const _obj: Activity = {
          id: this.Activity.id,
          Name: this.Activity.Name,
          DateActivity:this.Activity.DateActivity,
          Active:this.Activity.Active,
          EmployeeId:this.Activity.EmployeeId,
          // Description: this.Activity.Description,
          // IsActivity: this.Activity.IsActivity,
          // BirthDate: this.Activity.BirthDate,
          // UserId: this.Activity.UserId,
        }
        this.store.dispatch(updateActivity({ inputdata: _obj }));
        this.ActivityDialog = false;
        this.Reload_Data();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {

        const _obj: Activity = {
          id: this.createId(),
          Name: this.Activity.Name,
          DateActivity:this.Activity.DateActivity,
          Active:this.Activity.Active,
          EmployeeId:this.Activity.EmployeeId,
          // Description: this.Activity.Description,
          // IsActivity: this.Activity.IsActivity,
          // BirthDate: this.Activity.BirthDate,
          // UserId: this.Activity.UserId,
        }
        this.ActivityDialog = false;
        this.store.dispatch(addActivity({ inputdata: _obj }));
        this.Reload_Data();
      }
    }
  };

  hideDialog() {
    this.ActivityDialog = false;
    this.submitted = false;
  }
  createId(): number {
    const min = 10000; // Minimum value for the random number
    const max = 99999; // Maximum value for the random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  confirmDeleteSelected() {
    const numDelete: number[] = [];
    this.selectedActivitys.forEach((Activity) => {
      numDelete.push(Activity.id!);
    });

    this.store.dispatch(deleteListActivity({ codes: numDelete }));
    this.Reload_Data();
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Activitys Deleted', life: 3000 });
    this.selectedActivitys = [];
    this.deleteDialogs = false;
  }

  async confirmDelete() {
    await this.store.dispatch(deleteActivity({ code: this.Activity.id ?? 0 }));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Activity Deleted', life: 3000 });
    this.deleteDialog = false;
    this.Reload_Data();
    this.Activity = {};
  }
  async Reload_Data() {
    this.Activitylist.splice(0, this.Activitylist.length);
    await this.store.pipe(select(getActivitylist)).subscribe((Activitylist: Activity[]) => {
      this.Activitylist = Activitylist;
    });

  }
}


  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







  