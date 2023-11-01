

import { Injectable } from '@angular/core';
import { AttempetedProject } from '../api/AttempetedProject.Model';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AttempetedProjectService {

  baseurl = 'http://localhost:3000/AttempetedProject';
  constructor(private http: HttpClient) {

  }

  GetAll() {
    return this.http.get<AttempetedProject[]>(this.baseurl);
  }

  AttempetedProjectprojects(): Observable<any> {
    return this.http.get(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<AttempetedProject>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }


   DeleteList(codes:number[]) {
    return this.http.delete(this.baseurl + '/' + codes);
  }

  Update(data: AttempetedProject) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: AttempetedProject) {
    return this.http.post(this.baseurl, data);
  }
}

