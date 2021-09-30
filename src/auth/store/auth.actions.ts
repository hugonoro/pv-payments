export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: { username: string, password: string }) {
  }
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';

  constructor(public payload: any) {
  }
}

export class LoginError {
  static readonly type = '[Auth] Login Error';

  constructor(public payload: any) {
  }
}
