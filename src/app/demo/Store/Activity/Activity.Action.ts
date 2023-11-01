





import { createAction, props } from "@ngrx/store";
import { Activity } from "../../api/Activity.Model";

export const LOAD_Activity = '[Activity page]load Activity'
export const LOAD_Activity_SUCCESS = '[Activity page]load Activity success'
export const LOAD_Activity_FAIL = '[Activity page]load Activity fail'
export const ADD_Activity = '[Activity page]add Activity'
export const ADD_Activity_SUCCESS = '[Activity page]add Activity success'
export const UPDATE_Activity = '[Activity page]update Activity'
export const UPDATE_Activity_SUCCESS = '[Activity page]update Activity success'

export const DELETE_Activity = '[Activity page]delete Activity'
export const DELETE_Activity_SUCCESS = '[Activity page]delete Activity success'

export const DELETE_List_Activity = '[Activity page]delete Activity'
export const DELETE_List_Activity_SUCCESS = '[Activity page]delete Activity success'


export const GET_Activity = '[Activity page]get Activity'
export const GET_Activity_SUCCESS = '[Activity page]get Activity success'
export const OPEN_POPUP = '[Activity page]open popup'


export const loadActivity = createAction(LOAD_Activity)
export const loadActivitysuccess = createAction(LOAD_Activity_SUCCESS, props<{ list: Activity[] }>())
export const loadActivityfail = createAction(LOAD_Activity_FAIL, props<{ errormessage: string }>())

export const addActivity = createAction(ADD_Activity, props<{ inputdata: Activity }>())
export const addActivitysuccess = createAction(ADD_Activity_SUCCESS, props<{ inputdata: Activity }>())

export const updateActivity = createAction(UPDATE_Activity, props<{ inputdata: Activity }>())
export const updateActivitysuccess = createAction(UPDATE_Activity_SUCCESS, props<{ inputdata: Activity }>())

export const  deleteActivity = createAction(DELETE_Activity, props<{ code: number }>())
export const deleteActivitysuccess = createAction(DELETE_Activity_SUCCESS, props<{ code: number }>())

export const deleteListActivity =  createAction(DELETE_List_Activity, props<{ codes: number[] }>())
export const deleteListActivitysuccess = createAction(DELETE_List_Activity_SUCCESS, props<{ code: number[] }>())


export const getActivity_Action = createAction(GET_Activity, props<{ id: number }>())
export const getActivitysuccess = createAction(GET_Activity_SUCCESS, props<{ obj: Activity }>())

export const openpopup = createAction(OPEN_POPUP);





