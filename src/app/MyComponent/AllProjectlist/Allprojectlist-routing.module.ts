import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllProjectListComponent } from './AllProjectlist.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AllProjectListComponent }
    ])],
    exports: [RouterModule]
})
export class AllProjectlistRoutingModule { }
