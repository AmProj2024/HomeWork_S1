





import { createAction, props } from "@ngrx/store";
import { Employee } from "../../api/Employee.Model";

export const LOAD_Employee = '[Employee page]load Employee'
export const LOAD_Employee_SUCCESS = '[Employee page]load Employee success'
export const LOAD_Employee_FAIL = '[Employee page]load Employee fail'
export const ADD_Employee = '[Employee page]add Employee'
export const ADD_Employee_SUCCESS = '[Employee page]add Employee success'
export const UPDATE_Employee = '[Employee page]update Employee'
export const UPDATE_Employee_SUCCESS = '[Employee page]update Employee success'

export const DELETE_Employee = '[Employee page]delete Employee'
export const DELETE_Employee_SUCCESS = '[Employee page]delete Employee success'

export const DELETE_List_Employee = '[Employee page]delete Employee'
export const DELETE_List_Employee_SUCCESS = '[Employee page]delete Employee success'


export const GET_Employee = '[Employee page]get Employee'
export const GET_Employee_SUCCESS = '[Employee page]get Employee success'
export const OPEN_POPUP = '[Employee page]open popup'


export const loadEmployee = createAction(LOAD_Employee)
export const loadEmployeesuccess = createAction(LOAD_Employee_SUCCESS, props<{ list: Employee[] }>())
export const loadEmployeefail = createAction(LOAD_Employee_FAIL, props<{ errormessage: string }>())

export const addEmployee = createAction(ADD_Employee, props<{ inputdata: Employee }>())
export const addEmployeesuccess = createAction(ADD_Employee_SUCCESS, props<{ inputdata: Employee }>())

export const updateEmployee = createAction(UPDATE_Employee, props<{ inputdata: Employee }>())
export const updateEmployeesuccess = createAction(UPDATE_Employee_SUCCESS, props<{ inputdata: Employee }>())

export const  deleteEmployee = createAction(DELETE_Employee, props<{ code: number }>())
export const deleteEmployeesuccess = createAction(DELETE_Employee_SUCCESS, props<{ code: number }>())

export const deleteListEmployee =  createAction(DELETE_List_Employee, props<{ codes: number[] }>())
export const deleteListEmployeesuccess = createAction(DELETE_List_Employee_SUCCESS, props<{ code: number[] }>())


export const getEmployee_Action = createAction(GET_Employee, props<{ id: number }>())
export const getEmployeesuccess = createAction(GET_Employee_SUCCESS, props<{ obj: Employee }>())

export const openpopup = createAction(OPEN_POPUP);





