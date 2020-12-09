import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { getBaseUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = environment.requestUrl;

  private readonly header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow_Origin': '*',
    
  });

  constructor(private http: HttpClient) {
  }

  // getUser(id: number){
  //   return this.http.get(this.apiUrl + 'user/' + id.toString(),{ headers: this.header});
  // }

  get<T>(path: string, params: {} = {}): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get<T>(this.apiUrl + path, { params, headers: this.header });
  }

  post<T>(path: string, body: object = {}): Observable<any> {
    return this.http.post<T>(this.apiUrl + path, body);
  }

  put<T>(path: string, body: object = {}): Observable<any> {
    return this.http.put<T>(this.apiUrl + path, body);
  }

  delete<T>(path: string): Observable<any> {
    return this.http.delete<T>(this.apiUrl + path);
  }
}
