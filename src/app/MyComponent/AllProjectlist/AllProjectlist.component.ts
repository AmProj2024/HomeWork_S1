import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { addAllprojectComponent } from '../addAllproject/addAllproject.component';
import { Allproject, AllprojectModel } from 'src/app/demo/Store/Allproject.model';
import { deleteAllproject, getAllproject_Action, loadAllproject, openpopup, addAllproject, updateAllproject, deleteListAllproject } from 'src/app/demo/Store/Allproject.Action_';
import { getAllproject, getAllprojectlist } from 'src/app/demo/Store/Allproject.Selectors';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { Observable, first } from 'rxjs';
import { SharedProjecttypeService } from 'src/app/demo/service/Shared.projecttype.Service';
import { projecttype } from 'src/app/demo/api/projecttype';
import { projecttypeService } from 'src/app/demo/service/Projecttype.Service';
import { Dropdown } from 'primeng/dropdown';
import { parse } from 'uuid';

@Component({
  selector: 'app-allproject-list',
  templateUrl: './AllProjectlist.component.html',
  styleUrls: ['./AllProjectlist.component.css'],
  providers: [MessageService],
})
export class AllProjectListComponent implements OnInit {

  Allprojectlist: Allproject[] = [];
  selectedAllprojects: Allproject[] = [];
  //project! : Allproject {};
  project: Allproject = {};

  Allprojectdatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cols: any[] = [];
  projectType: projecttype[] = [];
  selectedAllproject: Allproject = {};
  deleteprojectDialog!: boolean;
  deleteprojectDialogs: boolean = false;
  submitted: boolean = false;
  AllprojectDailog: boolean = false;

  //selectedproject : Allproject={};

  displayedColums: string[] = ["code", "name", "action"]
  constructor(private dialog: MatDialog, private store: Store, private messageService: MessageService, @Inject(DOCUMENT) private document: Document,  private sharedService: SharedProjecttypeService,private projecttypeservice:projecttypeService  ) {

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

    this.store.dispatch(loadAllproject());
     this.Reload_Data();
      this.projecttypeservice.getprojecttype().subscribe(projecttypes => {
      this.projectType = projecttypes;
    });


    //alert(this.Allprojectlist.length);


    //  this.sharedService.projectTypeData$.subscribe((data) => {
    //   // Update the selectedProjectTypeName with the received data
    //   this.project.projecttypeName = data?.find((projecttype: { id: number | undefined; }) =>
    //    projecttype.id === this.project.projecttypeName);
      
    // });



  }

  FunctionAdd() {
    this.AllprojectDailog = true;
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

  FunctionEdit(project: Allproject) {
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
    this.deleteprojectDialogs = true;

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
     //   alert(this.project.projecttypeId);

        const _obj: Allproject = {
          id: this.project.id,
          name: this.project.name,
          Title: this.project.Title,
          Description: this.project.Description,
          projecttypeId: this.project.projecttypeId,
          StartAt: this.project.StartAt,
          EndAt: this.project.EndAt,
          cost: this.project.cost,

        }

        //   alert(_obj.id + _obj.Title);
        this.store.dispatch(updateAllproject({ inputdata: _obj }));
        // this.store.pipe(select(getAllprojectlist)).subscribe((allprojectlist: Allproject[]) => {
        //   this.Allprojectlist = allprojectlist;
        //   this.Allprojectdatasource = allprojectlist;
        // });

        this.Reload_Data();

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        this.AllprojectDailog = false;

      }
      else {

        const _obj: Allproject = {
          id: this.createId(),
          name: this.project.name,
          Title: this.project.Title,
          Description: this.project.Description,
          projecttypeId: this.project.projecttypeId,
          StartAt: this.project.StartAt,
          EndAt: this.project.EndAt,
          cost: this.project.cost,
        }
        this.store.dispatch(addAllproject({ inputdata: _obj }));
        // this.store.dispatch(loadAllproject());
        this.Reload_Data();
        this.AllprojectDailog = false;
        // this.store.pipe(select(getAllprojectlist)).subscribe((allprojectlist: Allproject[]) => {
        //   this.Allprojectlist = allprojectlist;
        //   this.Allprojectdatasource = allprojectlist;
        //   this.AllprojectDailog = false;

        //});
        
    //    alert(this.project.projecttypeName);
        
        this.Reload_Data();
        //this.AllprojectDailog = false;
        

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
    this.deleteprojectDialogs = false;
    // this.Allprojectlist = this.Allprojectlist.filter(val => !this.selectedAllprojects.includes(val));

    const numDelete: number[] = [];
    this.selectedAllprojects.forEach((project) => {
      numDelete.push(project.id!);
    });
    //alert(numDelete.length)

    this.store.dispatch(deleteListAllproject({ codes: numDelete }));

    this.Reload_Data();

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'projects Deleted', life: 3000 });
    this.selectedAllprojects = [];


  }

  async confirmDelete(code: number) {
    this.deleteprojectDialog = true;
    //this.Allprojectlist = this.Allprojectlist.filter(val => val.id !== this.project.id);
    //const cod = this.project.id;
    await this.store.dispatch(deleteAllproject({ code }));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Deleted', life: 3000 });

    this.Reload_Data();
    //this.selectedAllproject = {};
    this.deleteprojectDialog = false;
  }

  async Reload_Data() {

    await this.store.pipe(select(getAllprojectlist)).subscribe((allprojectlist: Allproject[]) => {
      this.Allprojectlist = allprojectlist;
      //this.Allprojectlist = allprojectlist.map(x=>x.projecttypeName === this.projectType.find(z=>z.id === x.projecttypeId));


     // this.Allprojectdatasource = allprojectlist;
    });
    // this.projectType.forEach(d => {
    //   alert(d.id+''+d.name);
    // });

    const projectTypeMap = new Map<number, string>();
    this.projectType.forEach((type) => {
      projectTypeMap.set((parseInt(type.id as string)) , type.name??"");
    });


    // for(var i=0;i<this.Allprojectlist.length;i++)
    // {
    //   const matchingType = this.projectType.find(x=>x.id==this.Allprojectlist[i].projecttypeId);
    //   if (matchingType ) {
    //     this.Allprojectlist[i].projecttypeName === matchingType.name ;
    //   //  alert( matchingType.name);

    // }


   // this.Allprojectlist = this.Allprojectlist;
   // this.Allprojectlist.forEach(x=> alert(x.projecttypeName));
  }
    // this.Allprojectlist.forEach((project) => {
    //   const matchingType = projectTypeMap.get(project.projecttypeId??0);
    //   if (matchingType !== undefined) {
    //     project.projecttypeName = matchingType;
    //     console.log(matchingType);
    //   } else {
    //     console.log("Matching type not found for project with ID: " + project.projecttypeId);
    //   }
    // });


   // const projectTypeMap = {};

    // this.Allprojectlist.forEach((project) => {
    //   const matchingType = projectTypeMap[project.projecttypeId!];
    //   if (matchingType) {
    //     project.projecttypeName = matchingType;
    //     alert(matchingType.name);
    //   } else {
    //     alert("Matching type not found for project with ID: " + project.projecttypeId);
    //   }
    // });
 
    // await this.Allprojectlist.forEach((project) => {
    //   alert(this.Allprojectlist.length);
    //   let matchingType = this.projectType.find((type) => type.id === project.projecttypeId);
    //   if (matchingType) {
    //     project.projecttypeName = matchingType.name;
    //     alert(matchingType.name);
    //   } else {
    //     alert("Matching type not found for project with ID: " + project.projecttypeId);
    //   }
    // });
 
 
 
    // await this.Allprojectlist.forEach((project) => {
    //   var matchingType = this.projectType.find((type) => type.id === project.projecttypeId);
    //   alert(matchingType?.name);
    //   if (matchingType) 
    //   {
    //     project.projecttypeName = matchingType.name;
    //   }
    // });



  }

