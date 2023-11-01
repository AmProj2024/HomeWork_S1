



 import { createFeatureSelector, createSelector }
 from "@ngrx/store";
 //import { projecttypeModule } from "src/app/MyComponent/project-type/project-type-module";
import { EmployeeModel } from "../../api/Employee.Model";


 //import { TagModel } from "../Model/Tag.model";

 const getEmployeestate = createFeatureSelector<EmployeeModel>('Employee')

export const getEmployeelist = createSelector(getEmployeestate, (state) => {
    return state.list;
})

export const getEmployee = createSelector(getEmployeestate, (state) => {
    return state.Employeeobj;
})






