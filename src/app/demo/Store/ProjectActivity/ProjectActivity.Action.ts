





import { createAction, props } from "@ngrx/store";
import { ProjectActivity } from "../../api/ProjectActivity.Model";

export const LOAD_ProjectActivity = '[ProjectActivity page]load ProjectActivity'
export const LOAD_ProjectActivity_SUCCESS = '[ProjectActivity page]load ProjectActivity success'
export const LOAD_ProjectActivity_FAIL = '[ProjectActivity page]load ProjectActivity fail'
export const ADD_ProjectActivity = '[ProjectActivity page]add ProjectActivity'
export const ADD_ProjectActivity_SUCCESS = '[ProjectActivity page]add ProjectActivity success'
export const UPDATE_ProjectActivity = '[ProjectActivity page]update ProjectActivity'
export const UPDATE_ProjectActivity_SUCCESS = '[ProjectActivity page]update ProjectActivity success'

export const DELETE_ProjectActivity = '[ProjectActivity page]delete ProjectActivity'
export const DELETE_ProjectActivity_SUCCESS = '[ProjectActivity page]delete ProjectActivity success'

export const DELETE_List_ProjectActivity = '[ProjectActivity page]delete ProjectActivity'
export const DELETE_List_ProjectActivity_SUCCESS = '[ProjectActivity page]delete ProjectActivity success'


export const GET_ProjectActivity = '[ProjectActivity page]get ProjectActivity'
export const GET_ProjectActivity_SUCCESS = '[ProjectActivity page]get ProjectActivity success'
export const OPEN_POPUP = '[ProjectActivity page]open popup'


export const loadProjectActivity = createAction(LOAD_ProjectActivity)
export const loadProjectActivitysuccess = createAction(LOAD_ProjectActivity_SUCCESS, props<{ list: ProjectActivity[] }>())
export const loadProjectActivityfail = createAction(LOAD_ProjectActivity_FAIL, props<{ errormessage: string }>())

export const addProjectActivity = createAction(ADD_ProjectActivity, props<{ inputdata: ProjectActivity }>())
export const addProjectActivitysuccess = createAction(ADD_ProjectActivity_SUCCESS, props<{ inputdata: ProjectActivity }>())

export const updateProjectActivity = createAction(UPDATE_ProjectActivity, props<{ inputdata: ProjectActivity }>())
export const updateProjectActivitysuccess = createAction(UPDATE_ProjectActivity_SUCCESS, props<{ inputdata: ProjectActivity }>())

export const  deleteProjectActivity = createAction(DELETE_ProjectActivity, props<{ code: number }>())
export const deleteProjectActivitysuccess = createAction(DELETE_ProjectActivity_SUCCESS, props<{ code: number }>())

export const deleteListProjectActivity =  createAction(DELETE_List_ProjectActivity, props<{ codes: number[] }>())
export const deleteListProjectActivitysuccess = createAction(DELETE_List_ProjectActivity_SUCCESS, props<{ code: number[] }>())


export const getProjectActivity_Action = createAction(GET_ProjectActivity, props<{ id: number }>())
export const getProjectActivitysuccess = createAction(GET_ProjectActivity_SUCCESS, props<{ obj: ProjectActivity }>())

export const openpopup = createAction(OPEN_POPUP);





