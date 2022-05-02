import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return from(Storage.get({ key: 'token' })).pipe(
      switchMap((token) => {
        if (!token.value) {
          throw new Error();
        }

        const authReq = req.clone({
          headers: req.headers.set('Authorization', `bearer ${token.value}`),
        });
        return next.handle(authReq);
      }),
      catchError((e) => next.handle(req))
    );
  }
}
