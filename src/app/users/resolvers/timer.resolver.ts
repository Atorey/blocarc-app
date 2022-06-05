import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Timer } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class TimerResolver implements Resolve<Timer> {
  constructor(private usersService: UsersService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Timer> {
    return this.usersService.getTimer().pipe(
      catchError((error) => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
