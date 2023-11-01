
export interface ProjectActivity {

    	id?:number;
	Name? : string;
	ActivityId?:number;
	Description? : string;
	Date? : Date;
	IsActive?:boolean;

}

export interface ProjectActivityModel {
    list: ProjectActivity[],
    ProjectActivityobj: ProjectActivity,
    errormessage: string
}



