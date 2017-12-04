import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Floor } from '../modal/floor';
@Injectable()
export class FloorService {
    //URLs for CRUD operations
  allFloorUrl = "http://localhost:8080/dormitory/api/floor/all";
  //Create constructor to get Http instance
  constructor(private http:Http) { 
    }
    //Fetch all student
    getAllFloor(): Observable<Floor[]> {
    return this.http.get(this.allFloorUrl)
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