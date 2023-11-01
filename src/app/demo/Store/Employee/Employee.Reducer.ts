



import { createReducer, on } from "@ngrx/store";
import {  EmployeeState } from './Employee.Compostate';
import { loadEmployeesuccess, getEmployeesuccess, addEmployeesuccess, deleteEmployeesuccess, loadEmployeefail, updateEmployeesuccess, openpopup } from "./Employee.Action";

const _EmployeeReducer = createReducer(EmployeeState,
    on(loadEmployeesuccess, (state, Action) => {
        return {
            ...state,
            list: [...Action.list],
            errormessage: ''
        }
    }),
    on(getEmployeesuccess, (State, action) => {
        return {
            ...State,
            Employeeobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadEmployeefail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addEmployeesuccess, (State, action) => {
        const _maxid = Math.max(...State.list.map(o => o.id??0));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...State,
            list: [...State.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateEmployeesuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deleteEmployeesuccess, (state, action) => {
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
            Employeeobj: {
                // Id:0,
                // Name:"",
                // Description:"",
                // IsEmployee:false,
                // BirthDate:2022,
                // UserId:0

            },
            errormessage:''
        }
    })
)

export function EmployeeReducer(state: any, action: any) {
    return _EmployeeReducer(state, action);
}







