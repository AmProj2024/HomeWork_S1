import { createReducer, on } from "@ngrx/store";
import {  AllprojectState } from "./Allproject.State_";
import { loadAllprojectsuccess, getAllprojectsuccess, addAllprojectsuccess, deleteAllprojectsuccess, loadAllprojectfail, updateAllprojectsuccess, openpopup } from "./Allproject.Action_";

const _AllprojectReducer = createReducer(AllprojectState,
    on(loadAllprojectsuccess, (state, Action) => {
        return {
            ...state,
            list: [...Action.list],
            errormessage: ''
        }
    }),
    on(getAllprojectsuccess, (State, action) => {
        return {
            ...State,
            Allprojectobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadAllprojectfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addAllprojectsuccess, (State, action) => {
        const _maxid = Math.max(...State.list.map(o => o.id));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...State,
            list: [...State.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateAllprojectsuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteAllprojectsuccess, (state, action) => {
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
            Allprojectobj: {
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

export function AllprojectReducer(state: any, action: any) {
    return _AllprojectReducer(state, action);
}