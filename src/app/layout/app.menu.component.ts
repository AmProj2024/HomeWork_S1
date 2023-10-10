import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/Dashboard'] },
                    {
                        label: 'Transaction',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./transaction']
                    },
                ],
                
            },
            

            // {
            //     label: 'UI Components',
            //     items: [
            //         // { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            //     ]
            // },

            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['./auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Signup',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/SignUp']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },

                ]
            },
            {
                label: 'bankaccount',
                items: [
                    {
                        label: 'Bank Account',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./Bank/bankaccount']
                    },
                    {
                        label: 'user',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./User']
                    },
                    {
                        label: 'projecttype',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./projecttype']
                    },
                    {
                        label: 'AllProjectlist',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./AllProjectlist']
                    },
                    {
                        label: 'Projectlist',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./projectlist']
                    },



                    
                    ,
                    // {
                    //     label: 'Access Denied',
                    //     icon: 'pi pi-fw pi-lock',
                    //     routerLink: ['/auth/access']
                    // },



                ]

            }

        ];
    }
}
