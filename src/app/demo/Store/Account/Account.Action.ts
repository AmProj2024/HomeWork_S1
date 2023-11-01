





import { createAction, props } from "@ngrx/store";
import { Account } from "../../api/Account.Model";

export const LOAD_Account = '[Account page]load Account'
export const LOAD_Account_SUCCESS = '[Account page]load Account success'
export const LOAD_Account_FAIL = '[Account page]load Account fail'
export const ADD_Account = '[Account page]add Account'
export const ADD_Account_SUCCESS = '[Account page]add Account success'
export const UPDATE_Account = '[Account page]update Account'
export const UPDATE_Account_SUCCESS = '[Account page]update Account success'

export const DELETE_Account = '[Account page]delete Account'
export const DELETE_Account_SUCCESS = '[Account page]delete Account success'

export const DELETE_List_Account = '[Account page]delete Account'
export const DELETE_List_Account_SUCCESS = '[Account page]delete Account success'


export const GET_Account = '[Account page]get Account'
export const GET_Account_SUCCESS = '[Account page]get Account success'
export const OPEN_POPUP = '[Account page]open popup'


export const loadAccount = createAction(LOAD_Account)
export const loadAccountsuccess = createAction(LOAD_Account_SUCCESS, props<{ list: Account[] }>())
export const loadAccountfail = createAction(LOAD_Account_FAIL, props<{ errormessage: string }>())

export const addAccount = createAction(ADD_Account, props<{ inputdata: Account }>())
export const addAccountsuccess = createAction(ADD_Account_SUCCESS, props<{ inputdata: Account }>())

export const updateAccount = createAction(UPDATE_Account, props<{ inputdata: Account }>())
export const updateAccountsuccess = createAction(UPDATE_Account_SUCCESS, props<{ inputdata: Account }>())

export const  deleteAccount = createAction(DELETE_Account, props<{ code: number }>())
export const deleteAccountsuccess = createAction(DELETE_Account_SUCCESS, props<{ code: number }>())

export const deleteListAccount =  createAction(DELETE_List_Account, props<{ codes: number[] }>())
export const deleteListAccountsuccess = createAction(DELETE_List_Account_SUCCESS, props<{ code: number[] }>())


export const getAccount_Action = createAction(GET_Account, props<{ id: number }>())
export const getAccountsuccess = createAction(GET_Account_SUCCESS, props<{ obj: Account }>())

export const openpopup = createAction(OPEN_POPUP);





