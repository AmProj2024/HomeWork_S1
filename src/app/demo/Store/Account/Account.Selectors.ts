



 import { createFeatureSelector, createSelector }
 from "@ngrx/store";
 //import { projecttypeModule } from "src/app/MyComponent/project-type/project-type-module";
import { AccountModel } from "../../api/Account.Model";


 //import { TagModel } from "../Model/Tag.model";

 const getAccountstate = createFeatureSelector<AccountModel>('Account')

export const getAccountlist = createSelector(getAccountstate, (state) => {
    return state.list;
})

export const getAccount = createSelector(getAccountstate, (state) => {
    return state.Accountobj;
})






