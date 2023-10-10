
import { Injectable } from '@angular/core';
import { Allproject } from '../Store/Allproject.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AllprojectService {

  baseurl = 'http://localhost:3000/Allproject';
  constructor(private http: HttpClient) {

  }

  GetAll() {
    return this.http.get<Allproject[]>(this.baseurl);
  }

  getAllprojects(): Observable<any> {
    return this.http.get(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<Allproject>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  Update(data: Allproject) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: Allproject) {
    return this.http.post(this.baseurl, data);
  }
}