import { createAction, props } from "@ngrx/store";
import { Allproject } from "./Allproject.model";

export const LOAD_Allproject = '[Allproject page]load Allproject'
export const LOAD_Allproject_SUCCESS = '[Allproject page]load Allproject success'
export const LOAD_Allproject_FAIL = '[Allproject page]load Allproject fail'
export const ADD_Allproject = '[Allproject page]add Allproject'
export const ADD_Allproject_SUCCESS = '[Allproject page]add Allproject success'
export const UPDATE_Allproject = '[Allproject page]update Allproject'
export const UPDATE_Allproject_SUCCESS = '[Allproject page]update Allproject success'

export const DELETE_Allproject = '[Allproject page]delete Allproject'
export const DELETE_Allproject_SUCCESS = '[Allproject page]delete Allproject success'

export const GET_Allproject = '[Allproject page]get Allproject'
export const GET_Allproject_SUCCESS = '[Allproject page]get Allproject success'
export const OPEN_POPUP = '[Allproject page]open popup'


export const loadAllproject = createAction(LOAD_Allproject)
export const loadAllprojectsuccess = createAction(LOAD_Allproject_SUCCESS, props<{ list: Allproject[] }>())
export const loadAllprojectfail = createAction(LOAD_Allproject_FAIL, props<{ errormessage: string }>())

export const addAllproject = createAction(ADD_Allproject, props<{ inputdata: Allproject }>())
export const addAllprojectsuccess = createAction(ADD_Allproject_SUCCESS, props<{ inputdata: Allproject }>())

export const updateAllproject = createAction(UPDATE_Allproject, props<{ inputdata: Allproject }>())
export const updateAllprojectsuccess = createAction(UPDATE_Allproject_SUCCESS, props<{ inputdata: Allproject }>())

export const deleteAllproject = createAction(DELETE_Allproject, props<{ code: number }>())
export const deleteAllprojectsuccess = createAction(DELETE_Allproject_SUCCESS, props<{ code: number }>())

export const getAllproject_Action = createAction(GET_Allproject, props<{ id: number }>())
export const getAllprojectsuccess = createAction(GET_Allproject_SUCCESS, props<{ obj: Allproject }>())

export const openpopup = createAction(OPEN_POPUP);