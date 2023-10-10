import { createFeatureSelector, createSelector } from "@ngrx/store";
//import { projecttypeModule } from "src/app/MyComponent/project-type/project-type-module";
import {  Allproject, AllprojectModel } from "./Allproject.model";

//import { TagModel } from "../Model/Tag.model";

const getAllprojectstate = createFeatureSelector<AllprojectModel>('Allproject')

export const getAllprojectlist = createSelector(getAllprojectstate, (state) => {
    return state.list;
})

export const getAllproject = createSelector(getAllprojectstate, (state) => {
    return state.Allprojectobj;
})