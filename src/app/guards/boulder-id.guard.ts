import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoulderIdGuard implements CanActivate {
  private constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(route.paramMap.get('id'));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!isNaN(+route.paramMap.get('id')!)) {
      return true;
    } else {
      return this.router.createUrlTree(['/boulders']);
    }
  }
}
