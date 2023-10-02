import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem, MenuItem } from 'primeng/api';
import { Password } from 'primeng/password';






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
  //FName : string = "";
  pwd?: Password;
  pwd1?: Password;
  usernamehelp: string = "usernamehelp";



  private _FName: string = "";
  public get FName(): string {
    return this._FName;
  }
  public set FName(v: string) {
    this._FName = v;
   // this.CheckvisibiltyErrors();
  }


  



  constructor(private messageService: MessageService) {

    // this.statusOptions = [
    //   {label: 'New', value: 'New'},
    //   {label: 'Under Investigation', value: 'Under Investigation'},
    //   {label: 'Pending on 3rd party', value: 'Pending on 3rd party'},
    //   {label: 'Pending on budget', value: 'Pending on budget'},
    //   {label: 'Fix Ready', value: 'Fix Ready'},
    //   {label: 'Closed', value: 'Closed'},
    //   {label: 'Canceled', value: 'Canceled'}
    // ];
    // this.serviceLineOptions = [
    //   {label: 'NOD', value: 'NOD'},
    //   {label: 'ADI/MIS', value: 'ADI/MIS'},
    //   {label: 'COLLABORATE/HCMS', value: 'COLLABORATE/HCMS'},
    //   {label: 'AVPN', value: 'AVPN'},
    //   {label: 'ANIRA', value: 'ANIRA'},
    // ];
    // const flattenRowDate: any[] = this.rowData.map(row => {
    //   Object.keys(row).map(key => {
    //     if (key.endsWith('date') && row[key]) {
    //       row[key] = row[key].$date;
    //     }
    //   });
    //   return row;
    // });
  }



  SuringRegister() {
    this.SuringRegisterDialog = true;
    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });

  }

  SignUp() {
   // if (!this.CheckvisibiltyErrors())

      //element.visible = false;
      return;


  }

  // CheckvisibiltyErrors(): boolean {
  //   if (this.pwd != this.pwd1 || this.pwd == null || this.FName.trim() == "" || this.UName.trim() == "")
  //     return false;
  // }


}

/*

*/