



import { createReducer, on } from "@ngrx/store";
import { NewCostCenterState } from "./NewCostCenter.Compostate";
import { loadNewCostCentersuccess, getNewCostCentersuccess, addNewCostCentersuccess, deleteNewCostCentersuccess, loadNewCostCenterfail, updateNewCostCentersuccess, openpopup } from "./NewCostCenter.Action";

const _NewCostCenterReducer = createReducer(NewCostCenterState,
    on(loadNewCostCentersuccess, (state, Action) => {
        return {
            ...state,
            list: [...Action.list],
            errormessage: ''
        }
    }),
    on(getNewCostCentersuccess, (State, action) => {
        return {
            ...State,
            NewCostCenterobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadNewCostCenterfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addNewCostCentersuccess, (State, action) => {
        const _maxid = Math.max(...State.list.map(o => o.id??0));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...State,
            list: [...State.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateNewCostCentersuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteNewCostCentersuccess, (state, action) => {
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
            NewCostCenterobj: {
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

export function NewCostCenterReducer(state: any, action: any) {
    return _NewCostCenterReducer(state, action);
}







