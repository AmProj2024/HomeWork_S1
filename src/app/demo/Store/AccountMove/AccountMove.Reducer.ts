



import { createReducer, on } from "@ngrx/store";
import {  AccountMoveState } from './AccountMove.Compostate';
import { loadAccountMovesuccess, getAccountMovesuccess, addAccountMovesuccess, deleteAccountMovesuccess, loadAccountMovefail, updateAccountMovesuccess, openpopup } from "./AccountMove.Action";

const _AccountMoveReducer = createReducer(AccountMoveState,
    on(loadAccountMovesuccess, (state, Action) => {
        return {
            ...state,
            list: [...Action.list],
            errormessage: ''
        }
    }),
    on(getAccountMovesuccess, (State, action) => {
        return {
            ...State,
            AccountMoveobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadAccountMovefail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addAccountMovesuccess, (State, action) => {
        const _maxid = Math.max(...State.list.map(o => o.id??0));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...State,
            list: [...State.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateAccountMovesuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteAccountMovesuccess, (state, action) => {
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
            AccountMoveobj: {
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

export function AccountMoveReducer(state: any, action: any) {
    return _AccountMoveReducer(state, action);
}







