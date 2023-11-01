





import { createAction, props } from "@ngrx/store";
import { NewCostCenter } from "../../api/NewCostCenter.Model";

export const LOAD_NewCostCenter = '[NewCostCenter page]load NewCostCenter'
export const LOAD_NewCostCenter_SUCCESS = '[NewCostCenter page]load NewCostCenter success'
export const LOAD_NewCostCenter_FAIL = '[NewCostCenter page]load NewCostCenter fail'
export const ADD_NewCostCenter = '[NewCostCenter page]add NewCostCenter'
export const ADD_NewCostCenter_SUCCESS = '[NewCostCenter page]add NewCostCenter success'
export const UPDATE_NewCostCenter = '[NewCostCenter page]update NewCostCenter'
export const UPDATE_NewCostCenter_SUCCESS = '[NewCostCenter page]update NewCostCenter success'

export const DELETE_NewCostCenter = '[NewCostCenter page]delete NewCostCenter'
export const DELETE_NewCostCenter_SUCCESS = '[NewCostCenter page]delete NewCostCenter success'

export const DELETE_List_NewCostCenter = '[NewCostCenter page]delete NewCostCenter'
export const DELETE_List_NewCostCenter_SUCCESS = '[NewCostCenter page]delete NewCostCenter success'


export const GET_NewCostCenter = '[NewCostCenter page]get NewCostCenter'
export const GET_NewCostCenter_SUCCESS = '[NewCostCenter page]get NewCostCenter success'
export const OPEN_POPUP = '[NewCostCenter page]open popup'


export const loadNewCostCenter = createAction(LOAD_NewCostCenter)
export const loadNewCostCentersuccess = createAction(LOAD_NewCostCenter_SUCCESS, props<{ list: NewCostCenter[] }>())
export const loadNewCostCenterfail = createAction(LOAD_NewCostCenter_FAIL, props<{ errormessage: string }>())

export const addNewCostCenter = createAction(ADD_NewCostCenter, props<{ inputdata: NewCostCenter }>())
export const addNewCostCentersuccess = createAction(ADD_NewCostCenter_SUCCESS, props<{ inputdata: NewCostCenter }>())

export const updateNewCostCenter = createAction(UPDATE_NewCostCenter, props<{ inputdata: NewCostCenter }>())
export const updateNewCostCentersuccess = createAction(UPDATE_NewCostCenter_SUCCESS, props<{ inputdata: NewCostCenter }>())

export const  deleteNewCostCenter = createAction(DELETE_NewCostCenter, props<{ code: number }>())
export const deleteNewCostCentersuccess = createAction(DELETE_NewCostCenter_SUCCESS, props<{ code: number }>())

export const deleteListNewCostCenter =  createAction(DELETE_List_NewCostCenter, props<{ codes: number[] }>())
export const deleteListNewCostCentersuccess = createAction(DELETE_List_NewCostCenter_SUCCESS, props<{ code: number[] }>())


export const getNewCostCenter_Action = createAction(GET_NewCostCenter, props<{ id: number }>())
export const getNewCostCentersuccess = createAction(GET_NewCostCenter_SUCCESS, props<{ obj: NewCostCenter }>())

export const openpopup = createAction(OPEN_POPUP);





