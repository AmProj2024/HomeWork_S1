



import { createReducer, on } from "@ngrx/store";
import {  ActivityState } from './Activity.Compostate';
import { loadActivitysuccess, getActivitysuccess, addActivitysuccess, deleteActivitysuccess, loadActivityfail, updateActivitysuccess, openpopup } from "./Activity.Action";

const _ActivityReducer = createReducer(ActivityState,
    on(loadActivitysuccess, (state, Action) => {
        return {
            ...state,
            list: [...Action.list],
            errormessage: ''
        }
    }),
    on(getActivitysuccess, (State, action) => {
        return {
            ...State,
            Activityobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadActivityfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addActivitysuccess, (State, action) => {
        const _maxid = Math.max(...State.list.map(o => o.id??0));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...State,
            list: [...State.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateActivitysuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteActivitysuccess, (state, action) => {
        const _newdata = state.list.filter(o => o.id !== action.code);
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(openpopup, (state, Action) => {
        return {
            ...state,
            Activityobj: {
                id: 0,
                Name: "",
                Active:false,
                DateActivity:"",
                EmployeeId:0

            }
        }
    })
)

export function ActivityReducer(state: any, action: any) {
    return _ActivityReducer(state, action);
}







