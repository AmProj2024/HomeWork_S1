



 import { createFeatureSelector, createSelector }
 from "@ngrx/store";
 //import { projecttypeModule } from "src/app/MyComponent/project-type/project-type-module";
import { AccountMoveModel } from "../../api/AccountMove.Model";


 //import { TagModel } from "../Model/Tag.model";

 const getAccountMovestate = createFeatureSelector<AccountMoveModel>('AccountMove')

export const getAccountMovelist = createSelector(getAccountMovestate, (state) => {
    return state.list;
})

export const getAccountMove = createSelector(getAccountMovestate, (state) => {
    return state.AccountMoveobj;
})






