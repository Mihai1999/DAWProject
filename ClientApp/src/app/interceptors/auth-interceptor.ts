import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { User } from "../models/user";
import { UserService } from "../services/user.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  private AUTH_HEADER= "Authorization";

  currentUser: User;

  constructor(private userService: UserService){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
    //var user: User =new User(JSON.parse(sessionStorage.getItem('user'))) ;
    this.userService.currentUser.subscribe(x => this.currentUser = x);

    var user = this.currentUser;
    if(user == null){
      return next.handle(request);
    }

    request = request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + user.token)

    });

    //console.log(request.headers.get(this.AUTH_HEADER));

    return next.handle(request);
  }

}