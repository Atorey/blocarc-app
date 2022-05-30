import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Achievement,
  AchievementResponse,
  AchievementsResponse,
} from 'src/app/boulders/interfaces/boulder';
import {
  GoalResponse,
  PullUp,
  Timer,
  User,
  UserResponse,
} from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly userURL = '/users';

  constructor(private http: HttpClient) {}

  getUserMe(): Observable<User> {
    return this.http
      .get<UserResponse>(
        `https://blocarc-services-production.up.railway.app${this.userURL}/me`
      )
      .pipe(map((response) => response.user));
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<UserResponse>(
        `https://blocarc-services-production.up.railway.app${this.userURL}/${id}`
      )
      .pipe(map((response) => response.user));
  }

  getTimer(): Observable<Timer> {
    return this.http
      .get<Timer>(
        `https://blocarc-services-production.up.railway.app${this.userURL}/timer`
      )
      .pipe(map((response) => response));
  }

  postTimer(timer: Timer): Observable<void> {
    return this.http
      .put<void>(
        // eslint-disable-next-line @typescript-eslint/dot-notation
        `https://blocarc-services-production.up.railway.app${this.userURL}/timer`,
        timer
      )
      .pipe(
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error posting timer. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  getPullUps(): Observable<PullUp> {
    return this.http
      .get<PullUp>(
        `https://blocarc-services-production.up.railway.app${this.userURL}/pull-ups`
      )
      .pipe(map((response) => response));
  }

  postPullUps(pullUps: PullUp): Observable<void> {
    return this.http
      .put<void>(
        // eslint-disable-next-line @typescript-eslint/dot-notation
        `https://blocarc-services-production.up.railway.app${this.userURL}/pull-ups`,
        pullUps
      )
      .pipe(
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error posting pull-ups. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  getGoal(): Observable<number> {
    return this.http
      .get<GoalResponse>(
        `https://blocarc-services-production.up.railway.app${this.userURL}/goal`
      )
      .pipe(map((response) => response.goal));
  }

  getAchievementsBetweenDates(
    dateFirst: string,
    dateLast: string
  ): Observable<Achievement[]> {
    return this.http
      .get<AchievementsResponse>(
        `https://blocarc-services-production.up.railway.app${this.userURL}/achievements/?dateFirst=${dateFirst}&dateLast=${dateLast}`
      )
      .pipe(
        map((response) => response.achievements),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting boulders. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }
}
