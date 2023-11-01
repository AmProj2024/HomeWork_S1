

import { Injectable } from '@angular/core';
import { AccountMove } from '../api/AccountMove.Model';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountMoveService {

  baseurl = 'http://localhost:3000/AccountMove';
  constructor(private http: HttpClient) {

  }

  GetAll() {
    return this.http.get<AccountMove[]>(this.baseurl);
  }

  AccountMoveprojects(): Observable<any> {
    return this.http.get(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<AccountMove>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }


   DeleteList(codes:number[]) {
    return this.http.delete(this.baseurl + '/' + codes);
  }

  Update(data: AccountMove) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: AccountMove) {
    alert(data.id);
    return this.http.post(this.baseurl, data);
  }
}

