

import { Injectable } from "@angular/core"
//import { concatMap, exhaustMap, forkJoin, from, map, of, toArray } from "rxjs";


import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, forkJoin, map, of, switchMap, toArray } from "rxjs";
import { addEmployee, addEmployeesuccess, deleteEmployee, deleteEmployeesuccess, deleteListEmployee, getEmployee_Action, getEmployeesuccess, loadEmployee, loadEmployeefail, loadEmployeesuccess, updateEmployee, updateEmployeesuccess } from "./Employee.Action";
import { EmployeeService } from "../../service/Employee.Service";
import { Router } from "@angular/router";
import { showalert } from "../Common/App.Action";





@Injectable()
export class EmployeeEffects {
  constructor(private actin$: Actions, private service: EmployeeService) { }

  _loadEmployee = createEffect(() =>
    this.actin$.pipe(
      ofType(loadEmployee),
      exhaustMap((action) => {
        return this.service.GetAll().pipe(
          map((data) => {
            console.log(data);
            return loadEmployeesuccess({ list: data })

          }),
          catchError((_error) => of(loadEmployeefail({ errormessage: _error.message })))
        )
      })
    )
  )

  _getEmployee = createEffect(() =>
    this.actin$.pipe(
      ofType(getEmployee_Action),
      exhaustMap((action) => {
        return this.service.Getbycode(action.id).pipe(
          map((data) => {

            return getEmployeesuccess({ obj: data })
          }),
          catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
        )
      })
    )
  )

  // _addEmployee = createEffect(() =>
  //     this.actin$.pipe(
  //         ofType(addEmployee),
  //         switchMap((action) => {
  //             return this.service.Create(action.inputdata).pipe(
  //                 switchMap((data) => {

  //                     return of(addEmployeesuccess({ inputdata: action.inputdata }),
  //                         showalert({ message: 'Created successfully.', resulttype: 'pass' }))
  //                 }),
  //                 catchError((_error) => of(showalert({ message: 'Failed to create Employee', resulttype: 'fail' })))
  //             )
  //         })
  //     )
  // )

  //     _addEmployee = createEffect(() =>
  //     this.actin$.pipe(
  //       ofType(addEmployee),
  //       switchMap((action) => {
  //         return from(this.service.Create(action.inputdata)).pipe(
  //           switchMap((data) => {
  //             return of(
  //               addEmployeesuccess({ inputdata: action.inputdata }),
  //               showalert({ message: 'Created successfully.', resulttype: 'pass' })
  //             );
  //           }),
  //           catchError((_error) =>
  //             of(showalert({ message: 'Failed to create Employee', resulttype: 'fail' }))
  //           )
  //         );
  //       })
  //     )
  //   );

  _addEmployee = createEffect(() =>
    this.actin$.pipe(
      ofType(addEmployee),
      switchMap((action) => {
        return this.service.Create(action.inputdata).pipe(
          switchMap((data) => {

            return of(addEmployeesuccess({ inputdata: action.inputdata }),
              showalert({ message: 'Created successfully.', resulttype: 'pass' }))
          }),
          catchError((_error) => of(showalert({ message: 'Failed to create Allproject', resulttype: 'fail' })))
        )
      })
    )
  );

//   _addAllproject = createEffect(() =>
//   this.actin$.pipe(
//       ofType(addEmployee),
//       switchMap((action) => {
//           return this.service.Create(action.inputdata).pipe(
//               switchMap((data) => {

//                   return of(addEmployeesuccess({ inputdata: action.inputdata }),
//                       showalert({ message: 'Created successfully.', resulttype: 'pass' }))
//               }),
//               catchError((_error) => of(showalert({ message: 'Failed to create Allproject', resulttype: 'fail' })))
//           )
//       })
//   )
// )




  _updateEmployee = createEffect(() =>
    this.actin$.pipe(
      ofType(updateEmployee),
      switchMap((action) => {
        return this.service.Update(action.inputdata).pipe(
          switchMap((data) => {
            return of(updateEmployeesuccess({ inputdata: action.inputdata }),
              showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
          }),
          catchError((_error) => of(showalert({ message: 'Failed to update Employee', resulttype: 'fail' })))
        )
      })
    )
  )
  _deleteEmployee = createEffect(() =>
    this.actin$.pipe(
      ofType(deleteEmployee),
      switchMap((action) => {
        return this.service.Delete(action.code).pipe(
          switchMap((data) => {
            return of(deleteEmployeesuccess({ code: action.code }),
              showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
          }),
          catchError((_error) => of(showalert({ message: 'Failed to delete Employee', resulttype: 'fail' })))
        )
      })
    )
  )





  _deleteListEmployee = createEffect(() =>
    this.actin$.pipe(
      ofType(deleteListEmployee),
      switchMap((action) => {
        const deleteRequests$ = action.codes.map(codes => this.service.DeleteList([codes]));
        //  alert(action.codes.length);
        return forkJoin(deleteRequests$).pipe(
          toArray(),
          concatMap((results) => {
            const successActions = results.map((data, index) =>
              deleteEmployeesuccess({ code: action.codes[index] })
            );

            return of(...successActions, showalert({ message: 'Deleted successfully.', resulttype: 'pass' }));
          }),
          catchError((_error) =>
            of(showalert({ message: 'Failed to delete Employee', resulttype: 'fail' }))
          )
        );
      })
    )
  );


}

//     _loadEmployee = createEffect(() =>
//         this.actin$.pipe(
//             ofType(loadEmployee),
//             exhaustMap((action) => {
//                 return this.service.GetAll().pipe(
//                     map((data) => {
//                         console.log(data);
//                         return loadEmployeesuccess({ list: data })
//                     }),
//                     catchError((_error) => of(loadEmployeefail({ errormessage: _error.message })))
//                 )
//             })
//         )
//     )

//     _getEmployee = createEffect(() =>
//         this.actin$.pipe(
//             ofType(getEmployee),
//             exhaustMap((action) => {
//                 return this.service.Getbycode(action.id).pipe(
//                     map((data) => {
//                         return getEmployeesuccess({ obj: data })
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
//                 )
//             })
//         )
//     )

//     _addEmployee = createEffect(() =>
//         this.actin$.pipe(
//             ofType(addEmployee),
//             switchMap((action) => {
//                 return this.service.Create(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(addEmployeesuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Created successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to create Employee', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _updateEmployee = createEffect(() =>
//         this.actin$.pipe(
//             ofType(updateEmployee),
//             switchMap((action) => {
//                 return this.service.Update(action.inputdata).pipe(
//                     switchMap((data) => {
//                         return of(updateEmployeesuccess({ inputdata: action.inputdata }),
//                             showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to update Employee', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
//     _deleteEmployee = createEffect(() =>
//         this.actin$.pipe(
//             ofType(deleteEmployee),
//             switchMap((action) => {
//                 return this.service.Delete(action.code).pipe(
//                     switchMap((data) => {
//                         return of(deleteEmployeesuccess({ code: action.code }),
//                             showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
//                     }),
//                     catchError((_error) => of(showalert({ message: 'Failed to delete Employee', resulttype: 'fail' })))
//                 )
//             })
//         )
//     )
// }


















