



 import { createFeatureSelector, createSelector }
 from "@ngrx/store";
import { ActivityModel } from "../../api/Activity.Model";

 const getActivitystate = createFeatureSelector<ActivityModel>('Activity')

export const getActivitylist = createSelector(getActivitystate, (state) => {
    return state.list;
})

export const getActivity = createSelector(getActivitystate, (state) => {
    return state.Activityobj;
})