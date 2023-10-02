import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
         { path: 'bankaccount', loadChildren: () => import('./bankaccount/bankaccount.module').then(m => m.BankAccountModule)},
        //{ path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        //{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: '**', redirectTo: './notfound' }
    ])],
    exports: [RouterModule]
})

export class bankroutingmodule{

}