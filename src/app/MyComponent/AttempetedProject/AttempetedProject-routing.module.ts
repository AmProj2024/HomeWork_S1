

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttempetedProjectComponent } from './AttempetedProject.Component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AttempetedProjectComponent }
    ])],
    exports: [RouterModule]
})
export class AttempetedProjectRoutingModule { }









