import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Achievement,
  AchievementResponse,
  AchievementsResponse,
} from 'src/app/boulders/interfaces/boulder';
import { Goal, PullUp, Timer, User, UserResponse } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly userURL = `${environment.baseUrl_api}/users`;

  constructor(private http: HttpClient) {}

  getUserMe(): Observable<User> {
    return this.http
      .get<UserResponse>(`${this.userURL}/me`)
      .pipe(map((response) => response.user));
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<UserResponse>(`${this.userURL}/${id}`)
      .pipe(map((response) => response.user));
  }

  getTimer(): Observable<Timer> {
    return this.http
      .get<Timer>(`${this.userURL}/timer`)
      .pipe(map((response) => response));
  }

  postTimer(timer: Timer): Observable<void> {
    return this.http
      .put<void>(
        // eslint-disable-next-line @typescript-eslint/dot-notation
        `${this.userURL}/timer`,
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
      .get<PullUp>(`${this.userURL}/pull-ups`)
      .pipe(map((response) => response));
  }

  postPullUps(pullUps: PullUp): Observable<void> {
    return this.http
      .put<void>(
        // eslint-disable-next-line @typescript-eslint/dot-notation
        `${this.userURL}/pull-ups`,
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

  getGoal(): Observable<Goal> {
    return this.http
      .get<Goal>(`${this.userURL}/goal`)
      .pipe(map((response) => response));
  }

  postGoal(goal: Goal): Observable<void> {
    return this.http
      .put<void>(
        // eslint-disable-next-line @typescript-eslint/dot-notation
        `${this.userURL}/goal`,
        goal
      )
      .pipe(
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error posting goal. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  getAchievementsBetweenDates(
    dateFirst: string,
    dateLast: string
  ): Observable<Achievement[]> {
    return this.http
      .get<AchievementsResponse>(
        `${this.userURL}/achievements/?dateFirst=${dateFirst}&dateLast=${dateLast}`
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

  getLastAchieved(): Observable<Achievement> {
    return this.http
      .get<AchievementResponse>(`${this.userURL}/last-achieved`)
      .pipe(
        map((response) => response.achievement),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting boulders. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }
}
