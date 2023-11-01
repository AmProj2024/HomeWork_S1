



 import { createFeatureSelector, createSelector }
 from "@ngrx/store";
 //import { projecttypeModule } from "src/app/MyComponent/project-type/project-type-module";
import { AttempetedProjectModel } from "../../api/AttempetedProject.Model";


 //import { TagModel } from "../Model/Tag.model";

 const getAttempetedProjectstate = createFeatureSelector<AttempetedProjectModel>('AttempetedProject')

export const getAttempetedProjectlist = createSelector(getAttempetedProjectstate, (state) => {
    return state.list;
})

export const getAttempetedProject = createSelector(getAttempetedProjectstate, (state) => {
    return state.AttempetedProjectobj;
})






