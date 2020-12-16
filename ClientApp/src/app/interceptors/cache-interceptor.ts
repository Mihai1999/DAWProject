import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.method != 'GET'){
      return next.handle(request)
    }
    //console.log("cache interceptor works");
    var fromCache = this.cache.get(request.url)
    if(fromCache != null){
      console.log("cache interceptor works");
      return of(fromCache)
    }

    return next.handle(request).pipe(tap(event => {
      if(event instanceof HttpResponse){
        this.cache.set(event.url, event);
      }
    }
    ));

  }
}
