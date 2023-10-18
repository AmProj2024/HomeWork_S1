export interface Allproject {
    id?: number,
    name?: string
    Description?:string,
    projecttypeId?:number,
    projecttypeName?:string,
    EndAt? : string,
    StartAt?:string,
    Title?:string,
    cost?:number
}

export interface AllprojectModel {
    list: Allproject[],
    Allprojectobj: Allproject,
    errormessage: string
}