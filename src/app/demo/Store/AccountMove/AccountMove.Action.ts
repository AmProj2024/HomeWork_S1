





import { createAction, props } from "@ngrx/store";
import { AccountMove } from "../../api/AccountMove.Model";

export const LOAD_AccountMove = '[AccountMove page]load AccountMove'
export const LOAD_AccountMove_SUCCESS = '[AccountMove page]load AccountMove success'
export const LOAD_AccountMove_FAIL = '[AccountMove page]load AccountMove fail'
export const ADD_AccountMove = '[AccountMove page]add AccountMove'
export const ADD_AccountMove_SUCCESS = '[AccountMove page]add AccountMove success'
export const UPDATE_AccountMove = '[AccountMove page]update AccountMove'
export const UPDATE_AccountMove_SUCCESS = '[AccountMove page]update AccountMove success'

export const DELETE_AccountMove = '[AccountMove page]delete AccountMove'
export const DELETE_AccountMove_SUCCESS = '[AccountMove page]delete AccountMove success'

export const DELETE_List_AccountMove = '[AccountMove page]delete AccountMove'
export const DELETE_List_AccountMove_SUCCESS = '[AccountMove page]delete AccountMove success'


export const GET_AccountMove = '[AccountMove page]get AccountMove'
export const GET_AccountMove_SUCCESS = '[AccountMove page]get AccountMove success'
export const OPEN_POPUP = '[AccountMove page]open popup'


export const loadAccountMove = createAction(LOAD_AccountMove)
export const loadAccountMovesuccess = createAction(LOAD_AccountMove_SUCCESS, props<{ list: AccountMove[] }>())
export const loadAccountMovefail = createAction(LOAD_AccountMove_FAIL, props<{ errormessage: string }>())

export const addAccountMove = createAction(ADD_AccountMove, props<{ inputdata: AccountMove }>())
export const addAccountMovesuccess = createAction(ADD_AccountMove_SUCCESS, props<{ inputdata: AccountMove }>())

export const updateAccountMove = createAction(UPDATE_AccountMove, props<{ inputdata: AccountMove }>())
export const updateAccountMovesuccess = createAction(UPDATE_AccountMove_SUCCESS, props<{ inputdata: AccountMove }>())

export const  deleteAccountMove = createAction(DELETE_AccountMove, props<{ code: number }>())
export const deleteAccountMovesuccess = createAction(DELETE_AccountMove_SUCCESS, props<{ code: number }>())

export const deleteListAccountMove =  createAction(DELETE_List_AccountMove, props<{ codes: number[] }>())
export const deleteListAccountMovesuccess = createAction(DELETE_List_AccountMove_SUCCESS, props<{ code: number[] }>())


export const getAccountMove_Action = createAction(GET_AccountMove, props<{ id: number }>())
export const getAccountMovesuccess = createAction(GET_AccountMove_SUCCESS, props<{ obj: AccountMove }>())

export const openpopup = createAction(OPEN_POPUP);





