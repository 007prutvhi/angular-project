import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../auth.service";
import * as AuthAction from '../store/auth.actions'

@Injectable()
export class AuthEffect {
    constructor(private action$: Actions,
        private http: HttpClient,) { }
   
    authLogin = this.action$.pipe(ofType(AuthAction.LOGIN_START),
        switchMap((authData: AuthAction.loginStart) => {
            return this.http
                .post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(map(resData => {
                   const expetationDate = new Date (new Date().getTime() + +resData.expiresIn*1000);
                   return of(new AuthAction.Login({email: resData.email , userId : resData.idToken , token: resData.idToken , expirationDate : expetationDate}))
                }), catchError(error => {
                    // ...
                    return of()
                }))
        })
    )
}