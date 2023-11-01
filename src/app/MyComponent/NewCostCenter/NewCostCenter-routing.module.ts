

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewCostCenterComponent } from './NewCostCenter.Component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: NewCostCenterComponent }
    ])],
    exports: [RouterModule]
})
export class NewCostCenterRoutingModule { }









