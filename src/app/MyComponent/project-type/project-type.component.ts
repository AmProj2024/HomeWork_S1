import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { account } from 'src/app/demo/api/Account';
import { projecttype } from 'src/app/demo/api/projecttype';
import { projecttypeService } from 'src/app/demo/service/Projecttype.Service';
import { SharedProjecttypeService } from 'src/app/demo/service/Shared.projecttype.Service';


@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
    providers: [MessageService]

})
export class ProjectTypeComponent implements OnInit {

  projecttypeDialog: boolean = false;

     deleteProjectDialog: boolean = false;
     deleteprojectsDialog: boolean = false;

     
  selectedprojecttypess:projecttype[]=[];
  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  projecttypes:projecttype[] = [];
  projecttype:projecttype={};

  constructor(private projecttypeservice: projecttypeService, private messageService: MessageService,private sharedService: SharedProjecttypeService) { }
  updateData() {
    const newData = this.projecttypes; // Get the new data from your component
    this.sharedService.updateProjectTypeData(newData);
  }
  ngOnInit() {

      this.projecttypeservice.getprojecttype().subscribe(projecttypes => {
        this.projecttypes = projecttypes;
      });
  

      this.cols = [
          { field: 'id', header: 'id' },
          { field: 'name', header: 'name' },
          { field: 'Description', header: 'Description' }

      ];

      this.statuses = [
          { label: 'Document', value: 'Document' },
          { label: 'Dedported', value: 'Dedported' },
          { label: 'Rejected', value: 'Rejected' }
      ];
  }

  openNew() {
      this.projecttype = {};
      this.submitted = false;
      this.projecttypeDialog = true;
  }

  deleteSelectedprojecttypes() {
      this.deleteprojectsDialog = true;
  }

  editProject(projecttype: projecttype) {
      this.projecttype = { ...projecttype };
      this.projecttypeDialog = true;
  }

  deleteProject(projecttype: projecttype) {
      this.deleteProjectDialog = true;
      this.projecttype = { ...projecttype };
  }

  confirmDeleteSelected() {
      this.deleteProjectDialog = true;
      this.projecttypes = this.projecttypes.filter(val => !this.selectedprojecttypess.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Accounts Deleted', life: 3000 });
      this.selectedprojecttypess = [];
  }

  confirmDelete() {
      this.deleteProjectDialog = false;
      this.projecttypes = this.projecttypes.filter(val => val.id !== this.projecttype.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000 });
      this.projecttype = {};
  }

  hideDialog() {
      this.projecttypeDialog = false;
      this.submitted = false;
  }

  saveprojectType() {
      this.submitted = true;

      if (this.projecttype.name?.trim()) {
          if (this.projecttype.id) {
              // @ts-ignore
              // this.account.accountstatus = this.account.accountstatus.value ? this.account.accountstatus.value : this.account.accountstatus;
              this.projecttypes[this.findIndexById(this.projecttype.id)] = this.projecttype;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ProjectType Updated', life: 3000 });
          } else {
              this.projecttype.id = this.createId();
              //this.projecttype.code = this.createId();
             // this.account.image = 'product-placeholder.svg';
              // @ts-ignore
              // this.account.accountstatus = this.account.accountstatus ? this.account.accountstatus.value : 'Document';
              //  this.projecttypeservice.postitem(this.projecttype);
              this.projecttypeservice.createprojecttype(this.projecttype);// this.projecttype);
              this.projecttypes.push(this.projecttype);
              this.projecttypeservice.getprojecttype().subscribe(projecttype => {
            this.projecttypes = projecttype;
           });
        //   alert(this.projecttypes);

            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ProjectType Created', life: 3000 });
          }

          this.projecttypes = [...this.projecttypes];
          this.projecttypeDialog = false;
          this.projecttype = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.projecttypes.length; i++) {
          if (this.projecttypes[i].id === id) {
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
