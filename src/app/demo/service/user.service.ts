import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../api/User';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class userservice {
    private apiUrl = 'http://localhost:3000/User';

    constructor(private http: HttpClient) { }

 userList:user[]=[];
 getUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.apiUrl);
 }
    // getAllUsers() {
    //     return this.http.get<any>('assets/demo/data/Users.json')
    //         .toPromise()
    //         .then(res => res.data as  user[])
    //         .then(data => data)
    //         ;    
    // }

    getUserById(id: number): Observable<user> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<user>(url);
      }


    //   checkUserCredentials(name: string, password: string): Observable<user> {
    //     const url = `${this.apiUrl}?FullName=${name}&password=${password}`;
    //     return this.http.get<user>(url);
    //   }
      checkUserCredentials(name: string, password: string): Observable<boolean> {
        const url = `${this.apiUrl}?FullName=${name}&password=${password}`;
        return this.http.get<user>(url).pipe(
          map(user => !!user), // Convert user object to boolean (true if user exists, false otherwise)
          catchError(() => of(false)) // Return false in case of error
        );
      }

      createUser(user: user): Observable<user> {
        
        return this.http.post<user>(this.apiUrl, user);


      }



      updateUser(user: user): Observable<user> {
        const url = `${this.apiUrl}/${user.id}`;
        return this.http.put<user>(url, user);
      }
    
      deleteUser(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
      }


    // getuserByNameAndPass(name:string,password:string):boolean
    // {
    //    var IsItemExist = this.userList.find(x=>x.FullName == name && x.password == password );

    //    if(IsItemExist!=null)
    //    {
    //        return true;
    //    }
    //    return false;
    // }

    //  SignupNewUser(data: any) {
    //      alert('FullName :  ' + data.FullName + ' ; email : ' + data.Email1 + ' ; pwd : ' + data.password);
    //     return this.http.post(, "")
        
        
        
    //     ;

       // var kkk = this.http.post('assets/demo/data/Users.json', data).subscribe(Response);
        
    
    
   // data:any)
    // {

    //     return this.http.get<any>('assets/demo/data/Users.json')
    //         .toPromise()
    //         .then(res => res.data as user[])
    //         .then(data => data);

    }


