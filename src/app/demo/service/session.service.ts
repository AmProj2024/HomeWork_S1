import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    private sessionData: any;
  
    constructor() {
      // Initialize session data
      this.sessionData = {};
    }
  
    setSessionData(key: string, value: any): void {
      // Set session data
   //   this.sessionData[key] = value;
     // const token = localStorage.getItem('token');
      localStorage.setItem(key,value);

    }


    
    getSessionData(key: string): any {
      // Get session data
    //  return this.sessionData[key];
   //  return  localStorage.getItem(key);
     if( localStorage.getItem(key))
     return true;



    }
  
    clearSessionData(): void {
      // Clear session data
      this.sessionData = {};
    }
  }