import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { User } from '../modal/user';

@Injectable()
export class UserService {
    private isUserLoggedIn;
    private username;
    private userInfor:User;

    userUrl = "http://localhost:8080/dormitory/api/users/login";
    reguserUrl="http://localhost:8080/dormitory/api/users/signup";

    constructor(private http:Http) {
        this.isUserLoggedIn = false;
    }

    getUser()
    {
        return this.userInfor;
    }
    setUserLoggedIn(user:User)
    {
        this.isUserLoggedIn = true;
        this.userInfor = user;
    }

    getUserLoggedIn(){
        return this.isUserLoggedIn;
    }

    userLogin(user: User):Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log("CREATE SERVICE",user);
        return this.http.post(this.userUrl, user, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
    createUser(user: User):Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          console.log("CREATE SERVICE",user);
          return this.http.post(this.reguserUrl, user, options)
                 .map(success => success.status)
                 .catch(this.handleError);
      }
    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
      }
      private extractData(res: Response) {
        let body = res.json();
          return body;
      }
}