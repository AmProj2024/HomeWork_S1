

import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap, toArray } from "rxjs";
import { addAttempetedProject, addAttempetedProjectsuccess, deleteAttempetedProject, deleteAttempetedProjectsuccess, deleteListAttempetedProject, getAttempetedProject_Action, getAttempetedProjectsuccess, loadAttempetedProject, loadAttempetedProjectfail, loadAttempetedProjectsuccess, updateAttempetedProject, updateAttempetedProjectsuccess } from "./AttempetedProject.Action";
import { AttempetedProjectService } from "../../service/AttempetedProject.Service";
import { Router } from "@angular/router";
import { showalert } from "../Common/App.Action";

@Injectable()
export class AttempetedProjectEffects {
    constructor(private actin$: Actions, private service: AttempetedProjectService) {}

    _loadAttempetedProject = createEffect(() =>
        this.actin$.pipe(
            ofType(loadAttempetedProject),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        console.log(data);
                        return loadAttempetedProjectsuccess({ list: data })

                    }),
                    catchError((_error) => of(loadAttempetedProjectfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getAttempetedProject = createEffect(() =>
        this.actin$.pipe(
            ofType(getAttempetedProject_Action),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {

                        return getAttempetedProjectsuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addAttempetedProject = createEffect(() =>
        this.actin$.pipe(
            ofType(addAttempetedProject),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {

                        return of(addAttempetedProjectsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create AttempetedProject', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateAttempetedProject = createEffect(() =>
        this.actin$.pipe(
            ofType(updateAttempetedProject),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateAttempetedProjectsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update AttempetedProject', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteAttempetedProject = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteAttempetedProject),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteAttempetedProjectsuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete AttempetedProject', resulttype: 'fail' })))
                )
            })
        )
    )





    _deleteListAttempetedProject = createEffect(() =>
  this.actin$.pipe(
    ofType(deleteListAttempetedProject),
    switchMap((action) => {
      const deleteRequests$ = action.codes.map(codes => this.service.DeleteList([codes]));
    //  alert(action.codes.length);
      return forkJoin(deleteRequests$).pipe(
        toArray(),
        concatMap((results) => {
          const successActions = results.map((data, index) =>
            deleteAttempetedProjectsuccess({ code: action.codes[index] })
          );

          return of(...successActions, showalert({ message: 'Deleted successfully.', resulttype: 'pass' }));
        }),
        catchError((_error) =>
          of(showalert({ message: 'Failed to delete AttempetedProject', resulttype: 'fail'}))
          )
        );
      })
    )
  );


}

//     _loadAttempetedProject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(loadAttempetedProject),
//             exhaustMap((action) => {
//                 return this.service.GetAll().pipe(
//                     map((data) => {
//                         console.log(data);
//                         return loadAttempetedProjectsuccess({ list: data })
//                     }),
//                     catchError((_error) => of(loadAttempetedProjectfail({ errormessage: _error.message })))
//                 )
//             })
//         )
//     )

//     _getAttempetedProject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(getAttempetedProject),
//             exhaustMap((action) => {
//                 return this.service.Getbycode(action.id).pipe(
//                     map((data) => {
//                         return getAttempetedProjectsuccess({ obj: data })
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _addAttempetedProject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(addAttempetedProject),
//             switchMap((action) => {
//                 return this.service.Create(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(addAttempetedProjectsuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Created successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to create AttempetedProject', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _updateAttempetedProject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(updateAttempetedProject),
//             switchMap((action) => {
//                 return this.service.Update(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(updateAttempetedProjectsuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to update AttempetedProject', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _deleteAttempetedProject = createEffect(() =>
//         this.actin$.pipe(
//             ofType(deleteAttempetedProject),
//             switchMap((action) => {
//                 return this.service.Delete(action.code).pipe(
//                     switchMap((data) => {
//                         return of(deleteAttempetedProjectsuccess({ code: action.code }),
//                             showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to delete AttempetedProject', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
// }


















