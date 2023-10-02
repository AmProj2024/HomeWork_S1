import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { account } from '../api/Account';

@Injectable()
export class AccountService {

    constructor(private http: HttpClient) { }

    // getProductsSmall() {
    //     return this.http.get<any>('assets/demo/data/products-small.json')
    //         .toPromise()
    //         .then(res => res.data as Product[])
    //         .then(data => data);
    // }

    getAccounts() {
        return this.http.get<any>('assets/demo/data/Accounts.json')
            .toPromise()
            .then(res => res.data as  account[])
            .then(data => data);
    }

    // getProductsMixed() {
    //     return this.http.get<any>('assets/demo/data/products-mixed.json')
    //         .toPromise()
    //         .then(res => res.data as Product[])
    //         .then(data => data);
    // }


}
