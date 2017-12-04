import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Building } from '../modal/building';
@Injectable()
export class BuildingService {
    //URLs for CRUD operations
  allBuildingUrl = "http://localhost:8080/dormitory/api/building/all";
  //Create constructor to get Http instance
  constructor(private http:Http) { 
    }
    //Fetch all student
    getAllBuilding(): Observable<Building[]> {
    return this.http.get(this.allBuildingUrl)
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