import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addAllproject, getAllproject_Action, updateAllproject } from 'src/app/demo/Store/Allproject.Action_';
import { getAllprojectlist,getAllproject } from 'src/app/demo/Store/Allproject.Selectors';
import { Allproject } from 'src/app/demo/Store/Allproject.model';
//import { Tag } from 'src/app/Store/Model/Tag.model';
//import { addtag, updatetag } from 'src/app/Store/Tag/Tag.Action';
//import { gettag } from 'src/app/Store/Tag/Tag.Selectors';

@Component({
  selector: 'app-addAllproject',
  templateUrl: './addAllproject.component.html',
  styleUrls: ['./addAllproject.component.css']
})
export class addAllprojectComponent implements OnInit{

  basetitle = 'Create Tag'
  isedit = false;
  dialogdata: any;

  constructor(private builder: FormBuilder, private ref: MatDialogRef<addAllprojectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {

  }


  ngOnInit(): void {
    this.dialogdata = this.data;
    this.basetitle = this.dialogdata.basetitle;
    this.store.select(getAllproject).subscribe(res => {
      this.Allprojectform.setValue({
        id: res.id??0, name: res.name,Title:res.Title,Description:res.Description,EndAt:res.EndAt,StartAt:res.StartAt,cost:res.cost??0,
      })
    })
  }

  ClosePopup() {
    this.ref.close();
  }

  Allprojectform = this.builder.group({
    id: this.builder.control(1),
    name: this.builder.control('', Validators.required),
    StartAt: this.builder.control('', Validators.required),
    Description:this.builder.control('', Validators.required),
    EndAt: this.builder.control('', Validators.required),
    Title: this.builder.control('', Validators.required),
    cost : this.builder.control(0,Validators.required)





  })

  SaveTag() {
    if (this.Allprojectform.valid) {
      const _obj: Allproject = {
        id: 1,
        name: this.Allprojectform.value.name as string,
        Description : this.Allprojectform.value.Description as string,
        StartAt : this.Allprojectform.value.StartAt as string,
        EndAt : this.Allprojectform.value.EndAt as string,
        Title :this.Allprojectform.value.Title as string,
        cost : this.Allprojectform.value.cost as number,

      }
      if (_obj.id == 1) {
        this.store.dispatch(addAllproject({ inputdata: _obj }))
      } else {
        this.store.dispatch(updateAllproject({ inputdata: _obj }))
      }
      this.ClosePopup();
    }
  }

}
