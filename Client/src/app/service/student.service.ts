import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Student } from '../modal/student';
@Injectable()
export class StudentService {

  //URLs for CRUD operations
  allStudentUrl = "http://localhost:8080/dormitory/api/student/all";
	studentUrl = "http://localhost:8080/dormitory/api/student";
	//Create constructor to get Http instance
	constructor(private http:Http) { 
  }
  //Fetch all student
  getAllStudent(): Observable<Student[]> {
    return this.http.get(this.allStudentUrl)
       .map(this.extractData)
        .catch(this.handleError);

  }
  //Create Student
  createStudent(student: Student):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log("CREATE SERVICE",student);
      return this.http.post(this.studentUrl+"/create", student, options)
             .map(success => success.status)
             .catch(this.handleError);
  }
//Fetch Student by id
  getStudentById(studentId: string): Observable<Student> {
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  let cpParams = new URLSearchParams();
  cpParams.set('id', studentId);			
  let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
  return this.http.get(this.studentUrl+"/"+studentId, options)
       .map(this.extractData)
       .catch(this.handleError);
  }	
//Update Student
  updateStudent(student: Student):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log("UPDATE SERVICE",student);
      return this.http.put(this.studentUrl+"/update", student, options)
             .map(success => success.status)
             .catch(this.handleError);
  }
  //Delete article	
  deleteStudentById(studentId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', studentId);
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.delete(this.studentUrl+"/"+studentId, options)
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