import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../api/Employee.Model';

@Injectable()
export class EmployeeService {

  baseurl = 'http://localhost:3000/Employee';
  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<Employee[]>(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<Employee>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  DeleteList(codes: number[]) {
   // return this.http.delete(this.baseurl + '/' + codes).toPromise();
   return this.http.delete(this.baseurl + '/' + codes).toPromise()
  .catch(error => {
    console.error('API delete request error:', error);
    throw error; // Rethrow the error to propagate it to the caller
  });
  }

  Update(data: Employee) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: Employee) {
    return this.http.post(this.baseurl, data);
  }
}

