

import { Injectable } from '@angular/core';
import { Account } from '../api/Account.Model';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {

  baseurl = 'http://localhost:3000/Account';
  constructor(private http: HttpClient) {

  }

  GetAll() {
    return this.http.get<Account[]>(this.baseurl);
  }

  Accountprojects(): Observable<any> {
    return this.http.get(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<Account>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }


   DeleteList(codes:number[]) {
    return this.http.delete(this.baseurl + '/' + codes);
  }

  Update(data: Account) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: Account) {
    return this.http.post(this.baseurl, data);
  }
}

