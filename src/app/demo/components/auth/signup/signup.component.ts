import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem, MenuItem } from 'primeng/api';
import { Password } from 'primeng/password';
import { userservice } from 'src/app/demo/service/user.service';
import { user } from 'src/app/demo/api/User';






@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent {
  issueData?: any[];
  columnDefs?: any[];
  owner: string = '';
  // statusOptions: { label: string; value: string; }[];
  // serviceLineOptions: { label: string; value: string; }[];
  SuringRegisterDialog: boolean = false;

  UName: string = "";

  email1: string = "";


  
  //FName : string = "";
  pwd: string="";
  pwd1: string="";
  usernamehelp: string = "usernamehelp";
  //CurrenUser? :any[];
  Current?:user;
  m?:string="";



  private _FName: string = "";
  public get FName(): string 
  {
    return this._FName;
  }
  public set FName(v: string) 
  {
    this._FName = v;
   // this.CheckvisibiltyErrors();
  }


  



  constructor(private messageService: MessageService,private userservice : userservice) 
  {


  }



  SuringRegister() 
  {
    this.SuringRegisterDialog = true;
    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    
  }

  users: user[]=[];


  SignUp()
   {
   // if (!this.CheckvisibiltyErrors())
      //element.visible = false;
      this.Current = { FullName : this.FName, Email1:this.email1,password : this.pwd };


    //  this.userservice.createUser(this.Current ).subscribe(users => {
    //   this.users = users;
    // });


    this.userservice.createUser(this.Current).subscribe(
      ()=>{this.FName,this.email1,this.pwd},
    )


    alert(this.Current);
  // CheckvisibiltyErrors(): boolean {
  //   if (this.pwd != this.pwd1 || this.pwd == null || this.FName.trim() == "" || this.UName.trim() == "")
  //     return false;
  // }


}
}