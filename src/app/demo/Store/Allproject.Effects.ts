import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { addAllproject, addAllprojectsuccess, deleteAllproject, deleteAllprojectsuccess, getAllproject_Action, getAllprojectsuccess, loadAllproject, loadAllprojectfail, loadAllprojectsuccess, updateAllproject, updateAllprojectsuccess } from "./Allproject.Action_";
import { AllprojectService } from "../service/AllprojectService";
//import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { showalert } from "./Common/App.Action";


@Injectable()
export class AllprojectEffects {
    constructor(private actin$: Actions, private service: AllprojectService) {

    }



    _loadAllProject = createEffect(() =>
        this.actin$.pipe(
            ofType(loadAllproject),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        console.log(data);
                        return loadAllprojectsuccess({ list: data })
                    }),
                    catchError((_error) => of(loadAllprojectfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getAllproject = createEffect(() =>
        this.actin$.pipe(
            ofType(getAllproject_Action),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {
                        return getAllprojectsuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addAllproject = createEffect(() =>
        this.actin$.pipe(
            ofType(addAllproject),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(addAllprojectsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create Allproject', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateAllproject = createEffect(() =>
        this.actin$.pipe(
            ofType(updateAllproject),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateAllprojectsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update Allproject', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteAllproject = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteAllproject),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteAllprojectsuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete Allproject', resulttype: 'fail' })))
                )
            })
        )
    )
}


//     _loadAllproject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(loadAllproject),
//             exhaustMap((action) => {
//                 return this.service.GetAll().pipe(
//                     map((data) => {
//                         console.log(data);
//                         return loadAllprojectsuccess({ list: data })
//                     }),
//                     catchError((_error) => of(loadAllprojectfail({ errormessage: _error.message })))
//                 )
//             })
//         )
//     )

//     _getAllproject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(getAllproject),
//             exhaustMap((action) => {
//                 return this.service.Getbycode(action.id).pipe(
//                     map((data) => {
//                         return getAllprojectsuccess({ obj: data })
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _addAllproject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(addAllproject),
//             switchMap((action) => {
//                 return this.service.Create(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(addAllprojectsuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Created successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to create Allproject', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _updateAllproject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(updateAllproject),
//             switchMap((action) => {
//                 return this.service.Update(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(updateAllprojectsuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to update Allproject', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _deleteAllproject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(deleteAllproject),
//             switchMap((action) => {
//                 return this.service.Delete(action.code).pipe(
//                     switchMap((data) => {
//                         return of(deleteAllprojectsuccess({ code: action.code }),
//                             showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to delete Allproject', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
// }