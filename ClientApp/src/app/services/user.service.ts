import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Userlogin } from '../models/userlogin';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = 'user/';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private api: ApiService ,
     private http: HttpClient,
     private router: Router ){
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
      this.currentUser = this.currentUserSubject.asObservable();
    }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  addNewUser(user: User) {
    return this.api.post(this.url, user);
  }

  getUser(id: number) {
    return this.api.get(this.url + id.toString());
  }

  getAllUsers() {
    return this.api.get(this.url);
  }

  deleteUser(id: number) {
    return this.api.delete(this.url + id.toString());
  }


  login(user: Userlogin){
    return this.api.post(this.url + 'authentificate', user);
  }

  loginsubs(user: Userlogin){
    return this.api.post(this.url + 'authentificate', user)
    .pipe(map(user => {

      sessionStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }))
  }

  logout(){
    sessionStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

}
