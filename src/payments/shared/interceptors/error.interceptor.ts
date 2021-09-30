import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private messageService:MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(requestError => {
          const { error } = requestError;
          this.messageService.add({
            severity: 'error',
            summary: `HTTP Error - ${requestError.status}`,
            detail:  error && error.message
          })
          return throwError(requestError)
        })
      );
  }
}
