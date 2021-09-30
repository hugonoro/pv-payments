import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  login({ username, password }: { username: string, password: string }): Observable<any> {
    if (username === 'user' && password === 'userPass') {
      return of(new HttpResponse({ status: 200, body: { token: btoa(username + ':' + password) } }));
    }
    return throwError({ error: { message: 'Username or password is incorrect' } });
  }
}
