import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { user } from 'src/app/demo/api/User';
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
  providers: [MessageService,RouterLink]

})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    users: user[]=[];

    password!: string;
    username!: string;
    router!: RouterLink;

    constructor(public layoutService: LayoutService,public userservice:userservice)
     {
      //  localStorage.clear();  
      //  localStorage.removeItem('isLoggedIn');  

      this.userservice.getUsers().subscribe(users => {
        this.users = users;
      });
      }

login()
{
    var DoneCheckUser = this.userservice.checkUserCredentials(this.username,this.password);
    
   // this.userservice.getUserById    
//alert(this.username+this.password);
alert(DoneCheckUser);
if(DoneCheckUser)
     {


        alert("noerror")

        //     localStorage.setItem('isLoggedIn', "true"); 
        //     alert(""); 
        //      // //  localStorage.setItem('token', this.f.userid.value);
              this.router.routerLink = "['/']"
        //      alert(""); 




        } 
        else{
            this.router.routerLink = "['./auth/login']"

alert("errot")
        }

    
 

    // }
}

}
