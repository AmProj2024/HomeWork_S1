

import { Injectable } from '@angular/core';
import { ProjectActivity } from '../api/ProjectActivity.Model';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProjectActivityService {

  baseurl = 'http://localhost:3000/ProjectActivity';
  constructor(private http: HttpClient) {

  }

  GetAll() {
    return this.http.get<ProjectActivity[]>(this.baseurl);
  }

  ProjectActivityprojects(): Observable<any> {
    return this.http.get(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<ProjectActivity>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }


   DeleteList(codes:number[]) {
    return this.http.delete(this.baseurl + '/' + codes);
  }

  Update(data: ProjectActivity) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: ProjectActivity) {
    return this.http.post(this.baseurl, data);
  }
}

