import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User> {
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    if (route.paramMap.get('id')) {
      return this.usersService.getUser(+route.paramMap.get('id')).pipe(
        catchError(() => {
          this.router.navigate(['/']);
          return EMPTY;
        })
      );
    } else {
      return this.usersService.getUserMe().pipe(
        catchError(() => {
          this.router.navigate(['/']);
          return EMPTY;
        })
      );
    }
  }
}
