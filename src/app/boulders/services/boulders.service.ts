import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
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
  private readonly boulderURL = `${environment.baseUrl_api}/boulders`;
  private readonly wallURL = `${environment.baseUrl_api}/walls`;

  constructor(private http: HttpClient) {}

  getBoulders(): Observable<Boulder[]> {
    return this.http.get<BouldersResponse>(this.boulderURL).pipe(
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
      .get<BouldersResponse>(`${this.boulderURL}?creator=${id}`)
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
      .get<BouldersResponse>(`${this.boulderURL}/achieved/?user=${id}`)
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

  getBouldersSaved(): Observable<Boulder[]> {
    return this.http.get<BouldersResponse>(`${this.boulderURL}/saved`).pipe(
      map((response) => response.boulders),
      catchError((response: HttpErrorResponse) =>
        throwError(
          () =>
            `Error getting boulders. Status: ${response.status}. Message: ${response.message}`
        )
      )
    );
  }

  getBouldersLike(): Observable<Boulder[]> {
    return this.http.get<BouldersResponse>(`${this.boulderURL}/like`).pipe(
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
    return this.http.get<BoulderResponse>(`${this.boulderURL}/${id}`).pipe(
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
    return this.http.get<WallsResponse>(this.wallURL).pipe(
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
      .post<WallResponse>(this.wallURL, wall)
      .pipe(map((response) => response.wall));
  }

  getCoords(image: WallImage): Observable<string> {
    return this.http
      .post<Coords>(`${environment.baseUrl_pyml}/test`, image)
      .pipe(map((response) => response.output));
  }

  getGrades(): Observable<[]> {
    return this.http.get<GradesResponse>(this.boulderURL + '/grades').pipe(
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
      .post<BoulderResponse>(this.boulderURL, boulder)
      .pipe(map((response) => response.boulder));
  }

  getAchievements(id: string): Observable<Achievement[]> {
    return this.http
      .get<AchievementsResponse>(`${this.boulderURL}/${id}/achievements`)
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
        `${this.boulderURL}/${id}/achievements`,
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

  postLike(id: string): Observable<void> {
    return this.http.post<void>(`${this.boulderURL}/${id}/like`, null);
  }

  postBoulderMark(id: string): Observable<void> {
    return this.http.post<void>(`${this.boulderURL}/${id}/save`, null);
  }

  removeLike(id: string): Observable<void> {
    return this.http.delete<void>(`${this.boulderURL}/${id}/like`);
  }

  removeAchievement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.boulderURL}/${id}/achievement`);
  }

  removeBoulderMark(id: string): Observable<void> {
    return this.http.delete<void>(`${this.boulderURL}/${id}/save`);
  }

  editBoulder(boulder: Boulder): Observable<Boulder> {
    return this.http
      .put<BoulderResponse>(
        // eslint-disable-next-line @typescript-eslint/dot-notation
        `${this.boulderURL}/${boulder['_id']}`,
        boulder
      )
      .pipe(
        map((response) => response.boulder),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error postting boulder. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }

  deleteBoulder(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.boulderURL}/${id}`)
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
