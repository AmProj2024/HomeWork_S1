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
                    {
                        label: 'NewCostCenter',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./NewCostCenter']
                    },

                    {
                        label: 'AttempetedProject',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./AttempetedProject']
                    },
                    {
                        label: 'Employee',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./Employee']
                    },
                    {
                        label: 'Activity',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./Activity']
                    },


                    {
                        label: 'ProjectActivity',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./ProjectActivity']
                    },
                    {
                        label: 'Account',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./Account']
                    },
                    {
                        label: 'AccountMove',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['./AccountMove']
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
