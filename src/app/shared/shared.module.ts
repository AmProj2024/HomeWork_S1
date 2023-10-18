import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { user } from '../demo/api/User';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[]
})
export class SharedModule {

  static username: string;
  static CurrentUser : user = {};


 }
