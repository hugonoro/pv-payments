import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this.store.selectSnapshot(AuthState.token)

    return request.clone({
        setHeaders: {
          Authorization: `Basic ${token}`
        }
    })
  }
}
