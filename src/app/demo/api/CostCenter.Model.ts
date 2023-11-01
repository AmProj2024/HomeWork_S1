export interface CostCenter {
     id?: number,
    // name?: string
    // Description?:string,
    // projecttypeId?:number,
    // projecttypeName?:string,
    // EndAt? : string,
    // StartAt?:string,
    // Title?:string,
    // cost?:number
}

export interface CostCenterModel {
    list: CostCenter[],
    CostCenterobj: CostCenter,
    errormessage: string
}
