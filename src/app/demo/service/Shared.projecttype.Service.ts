import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedProjecttypeService {
  private projectTypeDataSubject = new BehaviorSubject<any>(null);
  projectTypeData$ = this.projectTypeDataSubject.asObservable();

  updateProjectTypeData(data: any) {
    this.projectTypeDataSubject.next(data);
  }
}