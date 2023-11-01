export interface NewCostCenter {
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

export interface NewCostCenterModel {
   list: NewCostCenter[],
   NewCostCenterobj: NewCostCenter,
   errormessage: string
}
