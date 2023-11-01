/*..........................................................*/


import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { deleteEmployee, getEmployee_Action, loadEmployee, openpopup, addEmployee, updateEmployee, deleteListEmployee } from 'src/app/demo/Store/Employee/Employee.Action';
import { getEmployee, getEmployeelist } from 'src/app/demo/Store/Employee/Employee.Selectors';
import { Employee } from 'src/app/demo/api/Employee.Model';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable, first } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { parse } from 'uuid';
import { userservice } from 'src/app/demo/service/user.service';
import { user } from 'src/app/demo/api/User';

@Component({
  selector: 'app-Employee',
  templateUrl: './Employee.Component.html',
  //styleUrls: ['./Employee.component.css'],
  providers: [MessageService],
})
export class EmployeeComponent implements OnInit {
  Employeelist: Employee[] = [];
  selectedEmployees: Employee[] = [];
  Employee: Employee = {};
  Employeedatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cols: any[] = [];
  selectedEmployee: Employee = {};
  DataGridlist: Employee[] = [];
  UsersDropDownList: user[] = [];
  deleteDialog!: boolean;
  deleteDialogs: boolean = false;
  submitted: boolean = false;
  EmployeeDialog: boolean = false;
  displayedColums: string[] = ["code", "name", "action"]
  constructor(private dialog: MatDialog, private store: Store, private messageService: MessageService, private UserService: userservice) {}

  ngOnInit(): void {

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'Name', header: 'Name' },
      { field: 'Title', header: 'Title' },
      { field: 'Description', header: 'Description' },
      { field: 'IsEmployee', header: 'IsEmployee' },
      { field: 'BirthDate', header: 'BirthDate' },
      { field: 'UserId', header: 'UserId' },

    ];

    this.store.dispatch(loadEmployee());
    this.Reload_Data();
    this.UserService.getUsers().subscribe(User => { this.UsersDropDownList = User });
  }
  FunctionAdd() {
    this.EmployeeDialog = true;
    this.Employee = {
      //   name: '',
      //   Description: '',
      //   EndAt: '',
      //   StartAt: '',
      //   Title: ''
    };
    this.submitted = false;
    this.EmployeeDialog = true;
  }
  FunctionEdit(Employee: Employee) {
    this.Employee = { ...Employee };
    this.EmployeeDialog = true;

  }
  async FunctionDelete(code: number) {
    await this.store.dispatch(deleteEmployee({ code: code }));
  }

  deleteSelectedRows() {
    this.deleteDialogs = true;
  }
  deleteSelectedRow(selectedEmployee: Employee) {
    this.Employee = { ...selectedEmployee };
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
      if (this.Employee.id) {
        const _obj: Employee = {
          id: this.Employee.id,
          Name: this.Employee.Name,
          Description: this.Employee.Description,
          IsEmployee: this.Employee.IsEmployee,
          BirthDate: this.Employee.BirthDate,
          UserId: this.Employee.UserId,
          User : this.Employee.User,
        }
        this.store.dispatch(updateEmployee({ inputdata: _obj }));
        this.EmployeeDialog = false;
        this.Reload_Data();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {

        const _obj: Employee = {
          id: this.createId(),
          Name: this.Employee.Name,
          Description: this.Employee.Description,
          IsEmployee: this.Employee.IsEmployee,
          BirthDate: this.Employee.BirthDate,
          UserId: this.Employee.User?.Id,
          User : this.Employee.User,

        }
        this.EmployeeDialog = false;
        this.store.dispatch(addEmployee({ inputdata: _obj }));
        this.Reload_Data();
      }
    }
  };

  hideDialog() {
    this.EmployeeDialog = false;
    this.submitted = false;
  }
  createId(): number {
    const min = 10000; // Minimum value for the random number
    const max = 99999; // Maximum value for the random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  confirmDeleteSelected() {
    const numDelete: number[] = [];
    this.selectedEmployees.forEach((Employee) => {
      numDelete.push(Employee.id!);
    });

    this.store.dispatch(deleteListEmployee({ codes: numDelete }));
    this.Reload_Data();
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
    this.selectedEmployees = [];
    this.deleteDialogs = false;
  }

  async confirmDelete() {
    await this.store.dispatch(deleteEmployee({ code: this.Employee.id ?? 0 }));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
    this.deleteDialog = false;
    this.Reload_Data();
    this.Employee = {};
  }
  async Reload_Data() {
    this.Employeelist.splice(0, this.Employeelist.length);
    await this.store.pipe(select(getEmployeelist)).subscribe((Employeelist: Employee[]) => {
      this.Employeelist = Employeelist;
    });

  }
}