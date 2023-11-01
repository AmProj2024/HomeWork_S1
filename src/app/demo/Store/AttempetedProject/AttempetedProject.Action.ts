





import { createAction, props } from "@ngrx/store";
import { AttempetedProject } from "../../api/AttempetedProject.Model";

export const LOAD_AttempetedProject = '[AttempetedProject page]load AttempetedProject'
export const LOAD_AttempetedProject_SUCCESS = '[AttempetedProject page]load AttempetedProject success'
export const LOAD_AttempetedProject_FAIL = '[AttempetedProject page]load AttempetedProject fail'
export const ADD_AttempetedProject = '[AttempetedProject page]add AttempetedProject'
export const ADD_AttempetedProject_SUCCESS = '[AttempetedProject page]add AttempetedProject success'
export const UPDATE_AttempetedProject = '[AttempetedProject page]update AttempetedProject'
export const UPDATE_AttempetedProject_SUCCESS = '[AttempetedProject page]update AttempetedProject success'

export const DELETE_AttempetedProject = '[AttempetedProject page]delete AttempetedProject'
export const DELETE_AttempetedProject_SUCCESS = '[AttempetedProject page]delete AttempetedProject success'

export const DELETE_List_AttempetedProject = '[AttempetedProject page]delete AttempetedProject'
export const DELETE_List_AttempetedProject_SUCCESS = '[AttempetedProject page]delete AttempetedProject success'


export const GET_AttempetedProject = '[AttempetedProject page]get AttempetedProject'
export const GET_AttempetedProject_SUCCESS = '[AttempetedProject page]get AttempetedProject success'
export const OPEN_POPUP = '[AttempetedProject page]open popup'


export const loadAttempetedProject = createAction(LOAD_AttempetedProject)
export const loadAttempetedProjectsuccess = createAction(LOAD_AttempetedProject_SUCCESS, props<{ list: AttempetedProject[] }>())
export const loadAttempetedProjectfail = createAction(LOAD_AttempetedProject_FAIL, props<{ errormessage: string }>())

export const addAttempetedProject = createAction(ADD_AttempetedProject, props<{ inputdata: AttempetedProject }>())
export const addAttempetedProjectsuccess = createAction(ADD_AttempetedProject_SUCCESS, props<{ inputdata: AttempetedProject }>())

export const updateAttempetedProject = createAction(UPDATE_AttempetedProject, props<{ inputdata: AttempetedProject }>())
export const updateAttempetedProjectsuccess = createAction(UPDATE_AttempetedProject_SUCCESS, props<{ inputdata: AttempetedProject }>())

export const  deleteAttempetedProject = createAction(DELETE_AttempetedProject, props<{ code: number }>())
export const deleteAttempetedProjectsuccess = createAction(DELETE_AttempetedProject_SUCCESS, props<{ code: number }>())

export const deleteListAttempetedProject =  createAction(DELETE_List_AttempetedProject, props<{ codes: number[] }>())
export const deleteListAttempetedProjectsuccess = createAction(DELETE_List_AttempetedProject_SUCCESS, props<{ code: number[] }>())


export const getAttempetedProject_Action = createAction(GET_AttempetedProject, props<{ id: number }>())
export const getAttempetedProjectsuccess = createAction(GET_AttempetedProject_SUCCESS, props<{ obj: AttempetedProject }>())

export const openpopup = createAction(OPEN_POPUP);





