

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectActivityComponent } from './ProjectActivity.Component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ProjectActivityComponent }
    ])],
    exports: [RouterModule]
})
export class ProjectActivityRoutingModule { }









