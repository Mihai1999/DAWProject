import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userlogin } from '../models/userlogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = 'user/';


  constructor(private api: ApiService , private http: HttpClient ){ }

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


}
