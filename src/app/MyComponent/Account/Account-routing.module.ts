

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './Account.Component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AccountComponent }
    ])],
    exports: [RouterModule]
})
export class AccountRoutingModule { }









