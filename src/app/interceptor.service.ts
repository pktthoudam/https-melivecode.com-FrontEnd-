import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http"
import { LoginApiServiceService } from './login-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

constructor(private LoginApiService:LoginApiServiceService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler){
    const accessToken = this.LoginApiService.getAccessToken();
    req = req.clone({
      setHeaders:{
        Authorization : `Bearer ${accessToken}`
      }
    });
    return next.handle(req);
  }
}
