

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityComponent } from './Activity.Component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ActivityComponent }
    ])],
    exports: [RouterModule]
})
export class ActivityRoutingModule { }









