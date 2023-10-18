import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MessageService } from 'primeng/api';
import { user } from 'src/app/demo/api/User';
import { SessionService } from 'src/app/demo/service/session.service';
import { userservice } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SharedModule } from 'src/app/shared/shared.module';


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
    providers: [MessageService, RouterLink]

})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    users: user[] = [];

    password!: string;
    username!: string;
    //router!: RouterLink;

    constructor(public layoutService: LayoutService, public userservice: userservice, private SessionService: SessionService, private router: Router,private storage: LocalStorageService) {
        //  localStorage.clear();  
        //  localStorage.removeItem('isLoggedIn');  

        this.userservice.getUsers().subscribe(users => {
            this.users = users;

        });
    }

    login() {

     //   this.SessionService.clearSessionData();
        var ddd = this.userservice.checkUserCredentials(this.username,this.password);
        alert(" result : " +!!this.userservice.checkUserCredentials(this.username,this.password).subscribe(x=>x));

        var thisUser = this.users.find(x => x.FullName == this.username && x.password == this.password)
        if (thisUser) {
             SharedModule.CurrentUser = thisUser;
            this.router.navigate(['/']);
            this.SessionService.setSessionData(this.username, "IsLogin");
            this.storage.store('username', this.username);


        }
        else
        {
            alert(" User Is Not Found  ");
        }

    }

}
