import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Absences } from '../modal/absences';
@Injectable()
export class AbsencesService {

  //URLs for CRUD operations
  allAbsencesUrl = "http://localhost:8080/dormitory/api/tmpAbsences/all";
	absencesUrl = "http://localhost:8080/dormitory/api/tmpAbsences";
	//Create constructor to get Http instance
	constructor(private http:Http) { 
  }
  //Fetch all student
  getAllAbsences(): Observable<Absences[]> {
    return this.http.get(this.allAbsencesUrl)
       .map(this.extractData)
        .catch(this.handleError);

  }
  //Create Student
  createAbsences(abs: Absences):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log("CREATE SERVICE",abs);
      return this.http.post(this.absencesUrl+"/create", abs, options)
             .map(success => success.status)
             .catch(this.handleError);
  }
//Fetch Student by id
  getAbsencesById(absId: string): Observable<Absences> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', absId);
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.get(this.absencesUrl+"/"+absId, options)
       .map(this.extractData)
       .catch(this.handleError);
  }	
//Update Student
  updateAbsences(abs: Absences):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log("UPDATE SERVICE",abs);
      return this.http.put(this.absencesUrl+"/update", abs, options)
             .map(success => success.status)
             .catch(this.handleError);
  }
  //Delete article	
  deleteAbsencesById(absId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', absId);
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.delete(this.absencesUrl, options)
        .map(success => success.status)
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