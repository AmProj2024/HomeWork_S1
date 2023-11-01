
export interface Activity {

    	id?:number;
	Name? : string;
	DateActivity? : string;
	EmployeeId?:number;
	Active?:boolean;

}

export interface ActivityModel {
    list: Activity[],
    Activityobj: Activity,
    errormessage: string
}


