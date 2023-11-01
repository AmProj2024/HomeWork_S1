



 import { createFeatureSelector, createSelector }
 from "@ngrx/store";
 //import { projecttypeModule } from "src/app/MyComponent/project-type/project-type-module";
import { ProjectActivityModel } from "../../api/ProjectActivity.Model";


 //import { TagModel } from "../Model/Tag.model";

 const getProjectActivitystate = createFeatureSelector<ProjectActivityModel>('ProjectActivity')

export const getProjectActivitylist = createSelector(getProjectActivitystate, (state) => {
    return state.list;
})

export const getProjectActivity = createSelector(getProjectActivitystate, (state) => {
    return state.ProjectActivityobj;
})






