import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectTypeComponent } from './project-type.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ProjectTypeComponent }
    ])],
    exports: [RouterModule]
})
export class ProjectTypeRoutingModule { }
