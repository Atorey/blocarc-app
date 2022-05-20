import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TokenResponse } from '../interfaces/auth';
import { Storage } from '@capacitor/storage';
import { User, UserLogin } from 'src/app/users/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = '/auth';
  logged = false;
  loginChange$ = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {}

  login(userLogin: UserLogin): Observable<void> {
    return this.http
      .post<TokenResponse>(
        'http://localhost:8080' + `${this.authURL}/login`,
        userLogin
      )
      .pipe(
        switchMap(async (response) => {
          try {
            await Storage.set({ key: 'token', value: response.accessToken });
            this.logged = true;
            this.loginChange$.next(true);
          } catch (e) {
            throw new Error('Can\'t save authentication token in storage!');
          }
        })
      );
  }

  /*   googleLogin(userSocialLogin: UserSocialLogin): Observable<void> {
    return this.http
      .post<TokenResponse>(`${this.authURL}/google`, userSocialLogin)
      .pipe(
        switchMap(async (response) => {
          try {
            await Storage.set({ key: 'token', value: response.accessToken });
            this.logged = true;
            this.loginChange$.next(true);
          } catch (e) {
            throw new Error("Can't save authentication token in storage!");
          }
        })
      );
  }

  facebookLogin(userSocialLogin: UserSocialLogin): Observable<void> {
    return this.http
      .post<TokenResponse>(`${this.authURL}/facebook`, userSocialLogin)
      .pipe(
        switchMap(async (response) => {
          try {
            await Storage.set({ key: 'token', value: response.accessToken });
            this.logged = true;
            this.loginChange$.next(true);
          } catch (e) {
            throw new Error("Can't save authentication token in storage!");
          }
        })
      );
  } */

  /*   async logout(): Promise<void> {
    await Storage.remove({ key: 'token' });
    this.logged = false;
    this.loginChange$.next(false);
  }
 */

  isLogged(): Observable<boolean> {
    if (this.logged) {
      return of(true);
    }
    return from(Storage.get({ key: 'token' })).pipe(
      switchMap((token) => {
        if (!token.value) {
          throw new Error();
        }
        return this.http
          .get('http://localhost:8080' + `${this.authURL}/validate`)
          .pipe(
            map(() => {
              this.logged = true;
              this.loginChange$.next(true);
              return true;
            }),
            catchError((error) => of(false))
          );
      }),
      catchError((e) => of(false))
    );
  }

  register(user: User): Observable<void> {
    return this.http
      .post('http://localhost:8080' + `${this.authURL}/register`, user)
      .pipe(map(() => null));
  }
}
