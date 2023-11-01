



import { createReducer, on } from "@ngrx/store";
import {  AccountState } from './Account.Compostate';
import { loadAccountsuccess, getAccountsuccess, addAccountsuccess, deleteAccountsuccess, loadAccountfail, updateAccountsuccess, openpopup } from "./Account.Action";

const _AccountReducer = createReducer(AccountState,
    on(loadAccountsuccess, (state, Action) => {
        return {
            ...state,
            list: [...Action.list],
            errormessage: ''
        }
    }),
    on(getAccountsuccess, (State, action) => {
        return {
            ...State,
            Accountobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadAccountfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addAccountsuccess, (State, action) => {
        const _maxid = Math.max(...State.list.map(o => o.id??0));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...State,
            list: [...State.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateAccountsuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteAccountsuccess, (state, action) => {
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
            Accountobj: {
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

export function AccountReducer(state: any, action: any) {
    return _AccountReducer(state, action);
}







