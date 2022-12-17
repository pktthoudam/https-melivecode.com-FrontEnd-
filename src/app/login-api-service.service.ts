import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  } from '../app/interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class LoginApiServiceService {

  header = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient:HttpClient) { }

  private loginApiUrl ="https://www.melivecode.com/api/login";
  private authLoginApi ="https://www.melivecode.com/api/auth/user"


  //  loginUser
  loginUsers(body:any):Observable<any>{
    return this.httpClient.post(this.loginApiUrl, body)
  }

  getAccessToken(){
    return localStorage.getItem("jwt");
  }
  // authLogin
  authLoginUser():Observable<any>{
    return this.httpClient.get<any>(this.authLoginApi, {headers:this.header})
  }

}
