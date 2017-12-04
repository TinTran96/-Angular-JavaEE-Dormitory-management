import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Faculty } from '../modal/faculty';
@Injectable()
export class FacultyService {
    //URLs for CRUD operations
  allFacultyUrl = "http://localhost:8080/api/all-faculty";
  //Create constructor to get Http instance
  constructor(private http:Http) { 
    }
    //Fetch all student
    getAllFaculty(): Observable<Faculty[]> {
    return this.http.get(this.allFacultyUrl)
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