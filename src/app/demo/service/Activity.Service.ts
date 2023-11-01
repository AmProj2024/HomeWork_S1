

import { Injectable } from '@angular/core';
import { Activity } from '../api/Activity.Model';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ActivityService {

  baseurl = 'http://localhost:3000/Activity';
  constructor(private http: HttpClient) {

  }

  GetAll() {
    // var kkk= this.http.get<Activity[]>(this.baseurl).toPromise().then(x=> alert(x?.length));
    // //alert(kkk.);

    return this.http.get<Activity[]>(this.baseurl);
  }

  Activityprojects(): Observable<any> {
    return this.http.get(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<Activity>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }


   DeleteList(codes:number[]) {
    return this.http.delete(this.baseurl + '/' + codes);
  }

  Update(data: Activity) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: Activity) {
    return this.http.post(this.baseurl, data);
  }
}

