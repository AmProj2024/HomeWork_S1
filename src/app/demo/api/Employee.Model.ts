import { AutoMap } from "@automapper/classes";
import { user } from "./User";
//@AutoMap()
export class Employee {
	@AutoMap() 
    id?:number;
	@AutoMap() 
	Name? : string;
	@AutoMap()
	Description? : string;
	@AutoMap()
	IsEmployee?:boolean;
	@AutoMap()
	BirthDate? : Date;
	@AutoMap()
	UserId?:string;
	@AutoMap()
	User?:user;

}

export interface EmployeeModel {
    list: Employee[],
    Employeeobj: Employee,
    errormessage: string
}