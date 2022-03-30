import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Boulder, BouldersResponse } from '../interfaces/boulder';

@Injectable({
  providedIn: 'root'
})
export class BouldersService {
  private readonly boulderURL = '/boulders';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Boulder[]> {
    return this.http
      .get<BouldersResponse>(this.boulderURL)
      .pipe(
        map(response => response.boulders),
        catchError((response: HttpErrorResponse) =>
          throwError(
            () =>
              `Error getting boulders. Status: ${response.status}. Message: ${response.message}`
          )
        )
      );
  }
}
