import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => console.log({isAuthenticatedPublic: isAuthenticated})),
        tap(isAuthenticated => {
          if(isAuthenticated) {
            this.router.navigate(['/heroes/list'])
          }
        }),
        map(isAuthenticated => !isAuthenticated)
      )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkAuthStatus();
  }

}
