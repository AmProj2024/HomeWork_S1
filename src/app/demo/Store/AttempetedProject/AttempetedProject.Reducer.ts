



import { createReducer, on } from "@ngrx/store";
import {  AttempetedProjectState } from './AttempetedProject.Compostate';
import { loadAttempetedProjectsuccess, getAttempetedProjectsuccess, addAttempetedProjectsuccess, deleteAttempetedProjectsuccess, loadAttempetedProjectfail, updateAttempetedProjectsuccess, openpopup } from "./AttempetedProject.Action";

const _AttempetedProjectReducer = createReducer(AttempetedProjectState,
    on(loadAttempetedProjectsuccess, (state, Action) => {
        return {
            ...state,
            list: [...Action.list],
            errormessage: ''
        }
    }),
    on(getAttempetedProjectsuccess, (State, action) => {
        return {
            ...State,
            AttempetedProjectobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadAttempetedProjectfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addAttempetedProjectsuccess, (State, action) => {
        const _maxid = Math.max(...State.list.map(o => o.id??0));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...State,
            list: [...State.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateAttempetedProjectsuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteAttempetedProjectsuccess, (state, action) => {
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
            AttempetedProjectobj: {
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

export function AttempetedProjectReducer(state: any, action: any) {
    return _AttempetedProjectReducer(state, action);
}







