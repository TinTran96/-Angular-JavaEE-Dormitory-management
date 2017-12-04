import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Class } from '../modal/Class';
@Injectable()
export class ClassService {
    //URLs for CRUD operations
  allClassUrl = "http://localhost:8080/dormitory/api/class/all";
  //Create constructor to get Http instance
  constructor(private http:Http) { 
    }
    //Fetch all Class
    getAllClass(): Observable<Class[]> {
    return this.http.get(this.allClassUrl)
        .map(this.extractData)
        .catch(this.handleError);

    }
    private extractData(res: Response) {
        let body = res.json();
          return body;
      }
      private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
      }
}