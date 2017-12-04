import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Room } from '../modal/room';
@Injectable()
export class RoomService {
    //URLs for CRUD operations
  allRoomUrl = "http://localhost:8080/dormitory/api/room/all";
  RoomUrl = "http://localhost:8080/dormitory/api/room";
  //Create constructor to get Http instance
  constructor(private http:Http) { 
    }
    //Fetch all student
    getAllRoom(): Observable<Room[]> {
    return this.http.get(this.allRoomUrl)
        .map(this.extractData)
        .catch(this.handleError);

    }
    getRoomById(roomId: string): Observable<Room> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let cpParams = new URLSearchParams();
      cpParams.set('id', roomId);			
      let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
      return this.http.get(this.RoomUrl+"/"+roomId, options)
           .map(this.extractData)
           .catch(this.handleError);
      }	
    createRoom(room: Room):Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log("CREATE SERVICE",room);
        return this.http.post(this.RoomUrl+"/create", room, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Update Student
  updateRoom(room: Room):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });
      console.log("UPDATE SERVICE",room);
      return this.http.put(this.RoomUrl+"/update", room, options)
             .map(success => success.status)
             .catch(this.handleError);
  }
  //Delete article	
  deleteRoomById(roomId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', roomId);
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.delete(this.RoomUrl+"/"+roomId, options)
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