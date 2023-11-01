

import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap, toArray } from "rxjs";
import { addActivity, addActivitysuccess, deleteActivity, deleteActivitysuccess, deleteListActivity, getActivity_Action, getActivitysuccess, loadActivity, loadActivityfail, loadActivitysuccess, updateActivity, updateActivitysuccess } from "./Activity.Action";
import { ActivityService } from "../../service/Activity.Service";
import { Router } from "@angular/router";
import { showalert } from "../Common/App.Action";

@Injectable()
export class ActivityEffects {
    constructor(private actin$: Actions, private service: ActivityService) {}

    _loadActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(loadActivity),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        console.log(data);
                        return loadActivitysuccess({ list: data })

                    }),
                    catchError((_error) => of(loadActivityfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(getActivity_Action),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {

                        return getActivitysuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(addActivity),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {

                        return of(addActivitysuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create Activity', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(updateActivity),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateActivitysuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update Activity', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteActivity = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteActivity),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteActivitysuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete Activity', resulttype: 'fail' })))
                )
            })
        )
    )





    _deleteListActivity = createEffect(() =>
  this.actin$.pipe(
    ofType(deleteListActivity),
    switchMap((action) => {
      const deleteRequests$ = action.codes.map(codes => this.service.DeleteList([codes]));
    //  alert(action.codes.length);
      return forkJoin(deleteRequests$).pipe(
        toArray(),
        concatMap((results) => {
          const successActions = results.map((data, index) =>
            deleteActivitysuccess({ code: action.codes[index] })
          );

          return of(...successActions, showalert({ message: 'Deleted successfully.', resulttype: 'pass' }));
        }),
        catchError((_error) =>
          of(showalert({ message: 'Failed to delete Activity', resulttype: 'fail'}))
          )
        );
      })
    )
  );


}
