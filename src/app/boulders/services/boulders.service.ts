import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Achievement,
  AchievementResponse,
  AchievementsResponse,
  Boulder,
  BoulderResponse,
  BouldersResponse,
  Coords,
  GradesResponse,
  Wall,
  WallImage,
  WallResponse,
  WallsResponse,
} from '../interfaces/boulder';

@Injectable({
  providedIn: 'root',
})
export class BouldersService {
  private readonly boulderURL = '/boulders';
  private readonly wallURL = '/walls';

  constructor(private http: HttpClient) {}

  getBoulders(): Observable<Boulder[]> {
    return this.http
      .get<BouldersResponse>('http://localhost:8080' + this.boulderURL)
      .pipe(
        map((response) => response.boulders),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting boulders. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  getBouldersByCreator(id: string): Observable<Boulder[]> {
    return this.http
      .get<BouldersResponse>(
        `http://localhost:8080${this.boulderURL}?creator=${id}`
      )
      .pipe(
        map((response) => response.boulders),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting boulders. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  getBouldersAchieved(id: string): Observable<Boulder[]> {
    return this.http
      .get<BouldersResponse>(
        `http://localhost:8080${this.boulderURL}/achievements/?creator=${id}`
      )
      .pipe(
        map((response) => response.boulders),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting boulders. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  getBoulder(id: number): Observable<Boulder> {
    return this.http
      .get<BoulderResponse>(`http://localhost:8080${this.boulderURL}/${id}`)
      .pipe(
        map((response) => response.boulder),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting boulder. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  getWalls(): Observable<Wall[]> {
    return this.http
      .get<WallsResponse>('http://localhost:8080' + this.wallURL)
      .pipe(
        map((response) => response.walls),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting boulders. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  saveWall(wall: Wall): Observable<Wall> {
    return this.http
      .post<WallResponse>('http://localhost:8080' + this.wallURL, wall)
      .pipe(map((response) => response.wall));
  }

  getCoords(image: WallImage): Observable<string> {
    return this.http
      .post<Coords>('http://localhost:8090/test', image)
      .pipe(map((response) => response.output));
  }

  getGrades(): Observable<[]> {
    return this.http
      .get<GradesResponse>(
        'http://localhost:8080' + this.boulderURL + '/grades'
      )
      .pipe(
        map((response) => response.grades),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting grades. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  saveBoulder(boulder: Boulder): Observable<Boulder> {
    return this.http
      .post<BoulderResponse>('http://localhost:8080' + this.boulderURL, boulder)
      .pipe(map((response) => response.boulder));
  }

  getAchievements(id: string): Observable<Achievement[]> {
    return this.http
      .get<AchievementsResponse>(
        `http://localhost:8080${this.boulderURL}/${id}/achievements`
      )
      .pipe(
        map((response) => response.achievements),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting achievements. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  saveAchievement(
    achievement: Achievement,
    id: string
  ): Observable<Achievement> {
    return this.http
      .post<AchievementResponse>(
        `http://localhost:8080${this.boulderURL}/${id}/achievements`,
        achievement
      )
      .pipe(
        map((response) => response.achievement),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error postting achievement. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }
}
