import { Injectable } from '@angular/core';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const CRM_USER_KEY='crm.user.key';
const TOKEN_CRM_KEY='token.crm.key';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser?:User;
  private token?:string;

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem(CRM_USER_KEY)){
      this.currentUser = JSON.parse(sessionStorage.getItem(CRM_USER_KEY)!);
      this.token = sessionStorage.getItem(TOKEN_CRM_KEY)!;
    }
  }

  get authenticated():boolean{
    return !!this.currentUser;
  }

  get jwtToken():string|undefined{
    return this.token;
  }

  disconnect():void{
    this.currentUser = undefined;
    this.token = undefined;
    sessionStorage.clear()
  }

  authentUser(login:string, password:string):Observable<User>{
    return this.http.post<AuthentResponse>('/api/auth/login', {email:login, password:password})
            .pipe(
              map((response:AuthentResponse) =>{
                this.currentUser= response.user;
                this.token = response.token;
                sessionStorage.setItem(CRM_USER_KEY, JSON.stringify(this.currentUser));
                sessionStorage.setItem(TOKEN_CRM_KEY, this.token);
                return this.currentUser;
              })
            );
  }

}

interface AuthentResponse{
  user:User,
  token:string
}
