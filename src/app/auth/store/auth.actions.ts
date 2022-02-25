import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] login';
export const LOGOUT = '[Auth] logout';
export const LOGIN_START = '[Auth] login start'

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class loginStart implements Action {
  readonly type = LOGIN_START;

  constructor ( public payload : {email : string , password  : string} ) {}
}

export type AuthActions = Login | Logout;
