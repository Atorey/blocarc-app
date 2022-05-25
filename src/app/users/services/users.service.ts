import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Timer, User, UserResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly userURL = '/users';

  constructor(private http: HttpClient) {}

  getUserMe(): Observable<User> {
    return this.http
      .get<UserResponse>(`http://localhost:8080${this.userURL}/me`)
      .pipe(map((response) => response.user));
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<UserResponse>(`http://localhost:8080${this.userURL}/${id}`)
      .pipe(map((response) => response.user));
  }

  getTimer(): Observable<Timer> {
    return this.http
      .get<Timer>(`http://localhost:8080${this.userURL}/timer`)
      .pipe(map((response) => response));
  }

  postTimer(timer: Timer): Observable<void> {
    return this.http
      .put<void>(
        // eslint-disable-next-line @typescript-eslint/dot-notation
        `http://localhost:8080${this.userURL}/timer`,
        timer
      )
      .pipe(
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error deleting boulder. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }
}
