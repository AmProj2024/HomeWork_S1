import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../api/Transaction';

@Injectable()
export class TransactionService {

    constructor(private http: HttpClient) { }



    getAllTransactions() 
    {
        return this.http.get<any>('assets/demo/data/Transaction.json')
            .toPromise()
            .then(res => res.data as  Transaction[])
            .then(data => data)
            ;    
    }

    // getuserByNameAndPass(name:string,password:string):boolean
    // {
    //    var IsItemExist = this.userList.find(x=>x.name == name && x.password == password );

    //    if(IsItemExist!=null)
    //    {
    //        return true;
    //    }
    //    return false;
    // }

}