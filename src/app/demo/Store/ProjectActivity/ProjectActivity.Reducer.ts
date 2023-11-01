



import { createReducer, on } from "@ngrx/store";
import {  ProjectActivityState } from './ProjectActivity.Compostate';
import { loadProjectActivitysuccess, getProjectActivitysuccess, addProjectActivitysuccess, deleteProjectActivitysuccess, loadProjectActivityfail, updateProjectActivitysuccess, openpopup } from "./ProjectActivity.Action";

const _ProjectActivityReducer = createReducer(ProjectActivityState,
    on(loadProjectActivitysuccess, (state, Action) => {
        return {
            ...state,
            list: [...Action.list],
            errormessage: ''
        }
    }),
    on(getProjectActivitysuccess, (State, action) => {
        return {
            ...State,
            ProjectActivityobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadProjectActivityfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addProjectActivitysuccess, (State, action) => {
        const _maxid = Math.max(...State.list.map(o => o.id??0));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...State,
            list: [...State.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateProjectActivitysuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteProjectActivitysuccess, (state, action) => {
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
            ProjectActivityobj: {
                id: 0,
                name: "",
                Description:"",
                EndAt:"",
                StartAt:"",
                Title:"",
                cost:4000

            }
        }
    })
)

export function ProjectActivityReducer(state: any, action: any) {
    return _ProjectActivityReducer(state, action);
}







