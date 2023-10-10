import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectlistComponent } from './projectlist.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ProjectlistComponent }
    ])],
    exports: [RouterModule]
})
export class ProjectlistRoutingModule { }
