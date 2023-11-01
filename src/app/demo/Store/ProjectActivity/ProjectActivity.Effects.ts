

import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap, toArray } from "rxjs";
import { addProjectActivity, addProjectActivitysuccess, deleteProjectActivity, deleteProjectActivitysuccess, deleteListProjectActivity, getProjectActivity_Action, getProjectActivitysuccess, loadProjectActivity, loadProjectActivityfail, loadProjectActivitysuccess, updateProjectActivity, updateProjectActivitysuccess } from "./ProjectActivity.Action";
import { ProjectActivityService } from "../../service/ProjectActivity.Service";
import { Router } from "@angular/router";
import { showalert } from "../Common/App.Action";

@Injectable()
export class ProjectActivityEffects {
    constructor(private actin$: Actions, private service: ProjectActivityService) {}

    _loadProjectActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(loadProjectActivity),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        console.log(data);
                        return loadProjectActivitysuccess({ list: data })

                    }),
                    catchError((_error) => of(loadProjectActivityfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getProjectActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(getProjectActivity_Action),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {

                        return getProjectActivitysuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addProjectActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(addProjectActivity),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {

                        return of(addProjectActivitysuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create ProjectActivity', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateProjectActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(updateProjectActivity),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateProjectActivitysuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update ProjectActivity', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteProjectActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteProjectActivity),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteProjectActivitysuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete ProjectActivity', resulttype: 'fail' })))
                )
            })
        )
    )





    _deleteListProjectActivity = createEffect(() =>
  this.actin$.pipe(
    ofType(deleteListProjectActivity),
    switchMap((action) => {
      const deleteRequests$ = action.codes.map(codes => this.service.DeleteList([codes]));
    //  alert(action.codes.length);
      return forkJoin(deleteRequests$).pipe(
        toArray(),
        concatMap((results) => {
          const successActions = results.map((data, index) =>
            deleteProjectActivitysuccess({ code: action.codes[index] })
          );

          return of(...successActions, showalert({ message: 'Deleted successfully.', resulttype: 'pass' }));
        }),
        catchError((_error) =>
          of(showalert({ message: 'Failed to delete ProjectActivity', resulttype: 'fail'}))
          )
        );
      })
    )
  );


}

//     _loadProjectActivity = createEffect(() =>
//         this.actin$.pipe(
//             ofType(loadProjectActivity),
//             exhaustMap((action) => {
//                 return this.service.GetAll().pipe(
//                     map((data) => {
//                         console.log(data);
//                         return loadProjectActivitysuccess({ list: data })
//                     }),
//                     catchError((_error) => of(loadProjectActivityfail({ errormessage: _error.message })))
//                 )
//             })
//         )
//     )

//     _getProjectActivity = createEffect(() =>
//         this.actin$.pipe(
//             ofType(getProjectActivity),
//             exhaustMap((action) => {
//                 return this.service.Getbycode(action.id).pipe(
//                     map((data) => {
//                         return getProjectActivitysuccess({ obj: data })
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _addProjectActivity = createEffect(() =>
//         this.actin$.pipe(
//             ofType(addProjectActivity),
//             switchMap((action) => {
//                 return this.service.Create(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(addProjectActivitysuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Created successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to create ProjectActivity', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _updateProjectActivity = createEffect(() =>
//         this.actin$.pipe(
//             ofType(updateProjectActivity),
//             switchMap((action) => {
//                 return this.service.Update(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(updateProjectActivitysuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to update ProjectActivity', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _deleteProjectActivity = createEffect(() =>
//         this.actin$.pipe(
//             ofType(deleteProjectActivity),
//             switchMap((action) => {
//                 return this.service.Delete(action.code).pipe(
//                     switchMap((data) => {
//                         return of(deleteProjectActivitysuccess({ code: action.code }),
//                             showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to delete ProjectActivity', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
// }


















