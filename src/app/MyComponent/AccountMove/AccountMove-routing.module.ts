

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountMoveComponent } from './AccountMove.Component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AccountMoveComponent }
    ])],
    exports: [RouterModule]
})
export class AccountMoveRoutingModule { }









