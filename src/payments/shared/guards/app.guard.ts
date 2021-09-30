import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/store/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private store: Store) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.redirectIfNotAuthenticated();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.redirectIfNotAuthenticated();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.redirectIfNotAuthenticated();
  }

  private redirectIfNotAuthenticated(): boolean {
    const token = this.store.selectSnapshot(AuthState.token);
    if (!token) {
      this.store.dispatch(new Navigate(['/auth/login']));
    }
    return !!token;
  }
}
