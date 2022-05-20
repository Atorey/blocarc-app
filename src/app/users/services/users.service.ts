import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserResponse } from '../interfaces/user';

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

  getUser(id: number): Observable<User> {
    return this.http
      .get<UserResponse>(`http://localhost:8080${this.userURL}/${id}`)
      .pipe(map((response) => response.user));
  }
}
