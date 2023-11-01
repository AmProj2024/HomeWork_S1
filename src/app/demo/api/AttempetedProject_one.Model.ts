
export interface AttempetedProject {

    	Id:number;
	Name : string;
	Count:number;
	Description : string;
	IsEmployee:number;
	BirthDate : Date;
	UserId:number;

}

export interface AttempetedProjectModel {
    list: AttempetedProject[],
    AttempetedProjectobj: AttempetedProject,
    errormessage: string
}



