

import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap, toArray } from "rxjs";
import { addAccountMove, addAccountMovesuccess, deleteAccountMove, deleteAccountMovesuccess, deleteListAccountMove, getAccountMove_Action, getAccountMovesuccess, loadAccountMove, loadAccountMovefail, loadAccountMovesuccess, updateAccountMove, updateAccountMovesuccess } from "./AccountMove.Action";
import { AccountMoveService } from "../../service/AccountMove.Service";
import { Router } from "@angular/router";
import { showalert } from "../Common/App.Action";

@Injectable()
export class AccountMoveEffects {
    constructor(private actin$: Actions, private service: AccountMoveService) {}

    _loadAccountMove = createEffect(() =>
        this.actin$.pipe(
            ofType(loadAccountMove),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        console.log(data);
                        return loadAccountMovesuccess({ list: data })

                    }),
                    catchError((_error) => of(loadAccountMovefail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getAccountMove = createEffect(() =>
        this.actin$.pipe(
            ofType(getAccountMove_Action),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {

                        return getAccountMovesuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addAccountMove = createEffect(() =>
        this.actin$.pipe(
            ofType(addAccountMove),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {

                        return of(addAccountMovesuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create AccountMove', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateAccountMove = createEffect(() =>
        this.actin$.pipe(
            ofType(updateAccountMove),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateAccountMovesuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update AccountMove', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteAccountMove = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteAccountMove),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteAccountMovesuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete AccountMove', resulttype: 'fail' })))
                )
            })
        )
    )





    _deleteListAccountMove = createEffect(() =>
  this.actin$.pipe(
    ofType(deleteListAccountMove),
    switchMap((action) => {
      const deleteRequests$ = action.codes.map(codes => this.service.DeleteList([codes]));
    //  alert(action.codes.length);
      return forkJoin(deleteRequests$).pipe(
        toArray(),
        concatMap((results) => {
          const successActions = results.map((data, index) =>
            deleteAccountMovesuccess({ code: action.codes[index] })
          );

          return of(...successActions, showalert({ message: 'Deleted successfully.', resulttype: 'pass' }));
        }),
        catchError((_error) =>
          of(showalert({ message: 'Failed to delete AccountMove', resulttype: 'fail'}))
          )
        );
      })
    )
  );


}

//     _loadAccountMove = createEffect(() =>
//         this.actin$.pipe(
//             ofType(loadAccountMove),
//             exhaustMap((action) => {
//                 return this.service.GetAll().pipe(
//                     map((data) => {
//                         console.log(data);
//                         return loadAccountMovesuccess({ list: data })
//                     }),
//                     catchError((_error) => of(loadAccountMovefail({ errormessage: _error.message })))
//                 )
//             })
//         )
//     )

//     _getAccountMove = createEffect(() =>
//         this.actin$.pipe(
//             ofType(getAccountMove),
//             exhaustMap((action) => {
//                 return this.service.Getbycode(action.id).pipe(
//                     map((data) => {
//                         return getAccountMovesuccess({ obj: data })
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _addAccountMove = createEffect(() =>
//         this.actin$.pipe(
//             ofType(addAccountMove),
//             switchMap((action) => {
//                 return this.service.Create(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(addAccountMovesuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Created successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to create AccountMove', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _updateAccountMove = createEffect(() =>
//         this.actin$.pipe(
//             ofType(updateAccountMove),
//             switchMap((action) => {
//                 return this.service.Update(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(updateAccountMovesuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to update AccountMove', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _deleteAccountMove = createEffect(() =>
//         this.actin$.pipe(
//             ofType(deleteAccountMove),
//             switchMap((action) => {
//                 return this.service.Delete(action.code).pipe(
//                     switchMap((data) => {
//                         return of(deleteAccountMovesuccess({ code: action.code }),
//                             showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to delete AccountMove', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
// }


















