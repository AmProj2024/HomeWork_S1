



 import { createFeatureSelector, createSelector }
 from "@ngrx/store";
 //import { projecttypeModule } from "src/app/MyComponent/project-type/project-type-module";
import { NewCostCenterModel } from "../../api/NewCostCenter.Model";

 //import { TagModel } from "../Model/Tag.model";

 const getNewCostCenterstate = createFeatureSelector<NewCostCenterModel>('NewCostCenter')

export const getNewCostCenterlist = createSelector(getNewCostCenterstate, (state) => {
    return state.list;
})

export const getNewCostCenter = createSelector(getNewCostCenterstate, (state) => {
    return state.NewCostCenterobj;
})






