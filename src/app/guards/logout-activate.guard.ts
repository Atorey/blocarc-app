import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelfAuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutActivateGuard implements CanActivate {
  constructor(private authService: SelfAuthService, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLogged().pipe(
      map((logged) => {
        if (logged) {
          return this.router.createUrlTree(['/home']);
        }
        return true;
      })
    );
  }
}
