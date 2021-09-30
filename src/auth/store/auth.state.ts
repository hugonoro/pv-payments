import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth/auth.service';

import * as AuthActions from './auth.actions';

export class AuthStateModel {
  token?: string;
  isLoading?: boolean;
  user?: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isLoading: false
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static isLoading(state: AuthStateModel) {
    return state.isLoading;
  }

  constructor(private authService: AuthService, private messageService: MessageService) {
  }

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, { payload }: AuthActions.Login) {
    ctx.patchState({ isLoading: true });
    return this.authService.login(payload)
      .pipe(
        mergeMap(result => ctx.dispatch(new AuthActions.LoginSuccess(result))),
        catchError(error => ctx.dispatch(new AuthActions.LoginError(error)))
      );
  }

  @Action(AuthActions.LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, { payload }: AuthActions.LoginSuccess) {
    ctx.patchState({
      token: payload.body.token
    });
    ctx.dispatch(new Navigate(['/']));
  }

  @Action(AuthActions.LoginError)
  loginError(ctx: StateContext<AuthStateModel>, {payload}: AuthActions.LoginError) {
    ctx.patchState( { isLoading: false})

    this.messageService.add({
      severity: 'error',
      summary: 'Authentication Error',
      detail: payload.error.message
    })
  }
}
