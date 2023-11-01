

import { Injectable } from '@angular/core';
import { NewCostCenterModel,NewCostCenter } from '../api/NewCostCenter.Model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewCostCenterService {

  baseurl = 'http://localhost:3000/NewCostCenter';
  constructor(private http: HttpClient) {

  }

  GetAll() {
    return this.http.get<NewCostCenter[]>(this.baseurl);
  }

  NewCostCenterprojects(): Observable<any> {
    return this.http.get(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<NewCostCenter>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }


   DeleteList(codes:number[]) {
    return this.http.delete(this.baseurl + '/' + codes);
  }

  Update(data: NewCostCenter) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: NewCostCenter) {
    return this.http.post(this.baseurl, data);
  }
}

