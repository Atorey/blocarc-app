import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Boulder, BouldersResponse, Coords, Wall, WallImage, WallResponse, WallsResponse } from '../interfaces/boulder';

@Injectable({
  providedIn: 'root',
})
export class BouldersService {
  private readonly boulderURL = '/boulders';
  private readonly wallURL = '/walls';

  constructor(private http: HttpClient) {}

  getBoulders(): Observable<Boulder[]> {
    return this.http.get<BouldersResponse>('http://localhost:8080' + this.boulderURL).pipe(
      map((response) => response.boulders),
      catchError((response: HttpErrorResponse) =>
        throwError(
          () =>
            `Error getting boulders. Status: ${response.status}. Message: ${response.message}`
        )
      )
    );
  }

  getWalls(): Observable<Wall[]> {
    return this.http.get<WallsResponse>('http://localhost:8080' + this.wallURL).pipe(
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
    return this.http.post<WallResponse>('http://localhost:8080' + this.wallURL, wall).pipe(
      map((response) => response.wall),
    );
  }

  getCoords(image: WallImage): Observable<string> {
    return this.http.post<Coords>('http://localhost:8090/test', image).pipe(
      map((response) => response.output)
    );
  }
}
