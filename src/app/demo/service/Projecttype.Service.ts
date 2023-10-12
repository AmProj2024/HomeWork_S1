import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { account } from '../api/Account';
import { projecttype } from '../api/projecttype';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

export class projecttypeService {

    constructor(private http: HttpClient) { }


    private apiUrl = 'http://localhost:3000/ProjectType';
  
    getprojecttype(): Observable<projecttype[]> {
      return this.http.get<projecttype[]>(this.apiUrl);
    }
  
    getprojecttypeById(id: number): Observable<projecttype> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<projecttype>(url);
    }
  
    createprojecttype(projecttype: projecttype): Observable<projecttype> {
        projecttype.id = "55";
        projecttype.Description = "";

      return this.http.post<projecttype>(this.apiUrl, projecttype);
    }



  
    updateprojecttype(user: projecttype): Observable<projecttype> {
      const url = `${this.apiUrl}/${user.id}`;
      return this.http.put<projecttype>(url, user);
    }
  
    deleteprojecttype(id: number): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete(url);
    }

  
  }
  
    // getProductsSmall() {
    //     return this.http.get<any>('assets/demo/data/products-small.json')
    //         .toPromise()
    //         .then(res => res.data as Product[])
    //         .then(data => data);
    // }

    // getProjectss() {
    //     return this.http.get<any>('assets/demo/data/projecttype.json')
    //         .toPromise()
    //         .then(res => res.data as  projecttype[])
    //         .then(data => data);
    // }



    // postitem(data:projecttype)
    // {
    //     return this.http.post<any>('assets/demo/data/projecttype.json',data)
    //         .toPromise()
    //         .then(res => res.data as  projecttype[])
    //         .then(data => data);


    // }

    // getProductsMixed() {
    //     return this.http.get<any>('assets/demo/data/products-mixed.json')
    //         .toPromise()
    //         .then(res => res.data as Product[])
    //         .then(data => data);
    // }


