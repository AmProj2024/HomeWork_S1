import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BankAccountComponent } from './bankaccount.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BankAccountComponent }
    ])],
    exports: [RouterModule]
})
export class BankAccountRoutingModule { }
