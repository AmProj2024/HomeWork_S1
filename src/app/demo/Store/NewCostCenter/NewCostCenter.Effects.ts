

import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap, toArray } from "rxjs";
import { addNewCostCenter, addNewCostCentersuccess, deleteNewCostCenter, deleteNewCostCentersuccess, deleteListNewCostCenter, getNewCostCenter_Action, getNewCostCentersuccess, loadNewCostCenter, loadNewCostCenterfail, loadNewCostCentersuccess, updateNewCostCenter, updateNewCostCentersuccess } from "./NewCostCenter.Action";
import { NewCostCenterService } from "../../service/NewCostCenter.Service";
import { Router } from "@angular/router";
import { showalert } from "../Common/App.Action"; 

@Injectable()
export class NewCostCenterEffects {
    constructor(private actin$: Actions, private service: NewCostCenterService) {}

    _loadNewCostCenter = createEffect(() =>
        this.actin$.pipe(
            ofType(loadNewCostCenter),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        console.log(data);
                        return loadNewCostCentersuccess({ list: data })

                    }),
                    catchError((_error) => of(loadNewCostCenterfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getNewCostCenter = createEffect(() =>
        this.actin$.pipe(
            ofType(getNewCostCenter_Action),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {

                        return getNewCostCentersuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addNewCostCenter = createEffect(() =>
        this.actin$.pipe(
            ofType(addNewCostCenter),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {

                        return of(addNewCostCentersuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create NewCostCenter', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateNewCostCenter = createEffect(() =>
        this.actin$.pipe(
            ofType(updateNewCostCenter),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateNewCostCentersuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update NewCostCenter', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteNewCostCenter = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteNewCostCenter),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteNewCostCentersuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete NewCostCenter', resulttype: 'fail' })))
                )
            })
        )
    )





    _deleteListNewCostCenter = createEffect(() =>
  this.actin$.pipe(
    ofType(deleteListNewCostCenter),
    switchMap((action) => {
      const deleteRequests$ = action.codes.map(codes => this.service.DeleteList([codes]));
    //  alert(action.codes.length);
      return forkJoin(deleteRequests$).pipe(
        toArray(),
        concatMap((results) => {
          const successActions = results.map((data, index) =>
            deleteNewCostCentersuccess({ code: action.codes[index] })
          );

          return of(...successActions, showalert({ message: 'Deleted successfully.', resulttype: 'pass' }));
        }),
        catchError((_error) =>
          of(showalert({ message: 'Failed to delete NewCostCenter', resulttype: 'fail'}))
          )
        );
      })
    )
  );


}