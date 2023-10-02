import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { userservice } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
  providers: [MessageService]

})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    username!: string;
    router!: RouterLink;

    constructor(public layoutService: LayoutService,public userservice:userservice)
     {
      //  localStorage.clear();  
      //  localStorage.removeItem('isLoggedIn');  


      }

login()
{
    var DoneCheckUser = this.userservice.getuserByNameAndPass(this.username,this.password);
if(DoneCheckUser)
     {


        //     localStorage.setItem('isLoggedIn', "true"); 
        //     alert(""); 
                
        //      // //  localStorage.setItem('token', this.f.userid.value);
             
        //      this.router.routerLink = "['/']"
        //      alert(""); 



        }   
        else{

         //   this.router.routerLink = "['auth/login']"

        }     
 

    // }
}

}
