import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../api/User';

@Injectable()
export class userservice {

    constructor(private http: HttpClient) { }

 userList:user[]=[];


    getAllUsers() {
        return this.http.get<any>('assets/demo/data/Users.json')
            .toPromise()
            .then(res => res.data as  user[])
            .then(data => data)
            ;    
    }

    getuserByNameAndPass(name:string,password:string):boolean
    {
       var IsItemExist = this.userList.find(x=>x.name == name && x.password == password );

       if(IsItemExist!=null)
       {
           return true;
       }
       return false;
    }

}