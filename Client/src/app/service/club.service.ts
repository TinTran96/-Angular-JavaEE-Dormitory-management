import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Club } from '../modal/Club';
@Injectable()
export class ClubService {
    //URLs for CRUD operations
  allClubUrl = "http://localhost:8080/dormitory/api/club/all";
  //Create constructor to get Http instance
  constructor(private http:Http) { 
    }
    //Fetch all student
    getAllClub(): Observable<Club[]> {
    return this.http.get(this.allClubUrl)
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