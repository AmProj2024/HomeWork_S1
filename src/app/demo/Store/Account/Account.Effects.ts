

import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap, toArray } from "rxjs";
import { addAccount, addAccountsuccess, deleteAccount, deleteAccountsuccess, deleteListAccount, getAccount_Action, getAccountsuccess, loadAccount, loadAccountfail, loadAccountsuccess, updateAccount, updateAccountsuccess } from "./Account.Action";
import { AccountService } from "../../service/Account.service";
import { Router } from "@angular/router";
import { showalert } from "../Common/App.Action";

@Injectable()
export class AccountEffects {
    constructor(private actin$: Actions, private service: AccountService) {}

    _loadAccount = createEffect(() =>
        this.actin$.pipe(
            ofType(loadAccount),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        console.log(data);
                        return loadAccountsuccess({ list: data })

                    }),
                    catchError((_error) => of(loadAccountfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getAccount = createEffect(() =>
        this.actin$.pipe(
            ofType(getAccount_Action),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {

                        return getAccountsuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addAccount = createEffect(() =>
        this.actin$.pipe(
            ofType(addAccount),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {

                        return of(addAccountsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create Account', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateAccount = createEffect(() =>
        this.actin$.pipe(
            ofType(updateAccount),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateAccountsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update Account', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteAccount = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteAccount),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteAccountsuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete Account', resulttype: 'fail' })))
                )
            })
        )
    )





    _deleteListAccount = createEffect(() =>
  this.actin$.pipe(
    ofType(deleteListAccount),
    switchMap((action) => {
      const deleteRequests$ = action.codes.map(codes => this.service.DeleteList([codes]));
    //  alert(action.codes.length);
      return forkJoin(deleteRequests$).pipe(
        toArray(),
        concatMap((results) => {
          const successActions = results.map((data, index) =>
            deleteAccountsuccess({ code: action.codes[index] })
          );

          return of(...successActions, showalert({ message: 'Deleted successfully.', resulttype: 'pass' }));
        }),
        catchError((_error) =>
          of(showalert({ message: 'Failed to delete Account', resulttype: 'fail'}))
          )
        );
      })
    )
  );


}

//     _loadAccount = createEffect(() =>
//         this.actin$.pipe(
//             ofType(loadAccount),
//             exhaustMap((action) => {
//                 return this.service.GetAll().pipe(
//                     map((data) => {
//                         console.log(data);
//                         return loadAccountsuccess({ list: data })
//                     }),
//                     catchError((_error) => of(loadAccountfail({ errormessage: _error.message })))
//                 )
//             })
//         )
//     )

//     _getAccount = createEffect(() =>
//         this.actin$.pipe(
//             ofType(getAccount),
//             exhaustMap((action) => {
//                 return this.service.Getbycode(action.id).pipe(
//                     map((data) => {
//                         return getAccountsuccess({ obj: data })
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _addAccount = createEffect(() =>
//         this.actin$.pipe(
//             ofType(addAccount),
//             switchMap((action) => {
//                 return this.service.Create(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(addAccountsuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Created successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to create Account', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _updateAccount = createEffect(() =>
//         this.actin$.pipe(
//             ofType(updateAccount),
//             switchMap((action) => {
//                 return this.service.Update(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(updateAccountsuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to update Account', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _deleteAccount = createEffect(() =>
//         this.actin$.pipe(
//             ofType(deleteAccount),
//             switchMap((action) => {
//                 return this.service.Delete(action.code).pipe(
//                     switchMap((data) => {
//                         return of(deleteAccountsuccess({ code: action.code }),
//                             showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to delete Account', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
// }


















