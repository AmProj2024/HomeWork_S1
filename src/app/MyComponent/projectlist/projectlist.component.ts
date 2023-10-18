import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  Allproject, AllprojectModel } from 'src/app/demo/Store/Allproject.model';
import { deleteAllproject, getAllproject_Action, loadAllproject, openpopup } from 'src/app/demo/Store/Allproject.Action_';
import { getAllproject, getAllprojectlist } from 'src/app/demo/Store/Allproject.Selectors';
import { AllprojectService } from 'src/app/demo/service/AllprojectService';
import { SharedProjecttypeService } from 'src/app/demo/service/Shared.projecttype.Service';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss'],
  providers:[AllprojectService,MatPaginator]
})
export class ProjectlistComponent implements OnInit {

  Allprojectlist!: Allproject[];
  Allprojectdatasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ["code", "name", "action"]
  constructor(private dialog: MatDialog, private store: Store,    private sharedService: SharedProjecttypeService    ) {

  }




  ngOnInit(): void {
    this.store.dispatch(loadAllproject());
    this.store.select(getAllprojectlist).subscribe(item => {
      this.Allprojectlist = item;
      this.Allprojectdatasource = new MatTableDataSource<Allproject>(this.Allprojectlist);
      this.Allprojectdatasource.paginator = this.paginator;
      this.Allprojectdatasource.sort = this.sort;
    });
    
  }

  FunctionAdd() {
    this.OpenPopup(0, 'Create Project')
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

  OpenPopup(code: number, title: string) {
    this.store.dispatch(openpopup());
    this.dialog.open(ProjectlistComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title
      }
    })
  }
}

