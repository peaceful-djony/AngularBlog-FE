import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import * as moment from 'moment';

import {User} from "../../../shared/models/user";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {tap, shareReplay, catchError} from "rxjs/operators";
import {Auth} from "../../../shared/models/auth";

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  private static get authUrl(): string {
    return environment.baseUrl + 'auth'
  }

  get token(): string {
    const expIn = moment(localStorage.getItem('auth-token-exp'))
    if (expIn > moment()) {
      this.logout()
      return null;
    }
    return localStorage.getItem('auth-token')
  }

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    return this.http.post<Auth>(AuthService.authUrl, user)
      .pipe(
        tap(AuthService.setToken),
        shareReplay(), // TODO from documentation
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    AuthService.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private static setToken(authResult: Auth | null) {
    if (authResult) {
      const expiresIn = moment().add(authResult.expiresIn,'second');

      localStorage.setItem('auth-token', authResult.token)
      localStorage.setItem('auth-token-exp', expiresIn.toString())
    } else {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-token-exp')
    }
  }

  private handleError(errorResponse: HttpErrorResponse) {
    const {message, code} = errorResponse.error

    switch (code) {
      case 'INVALID_CREDENTIALS':
        this.error$.next(message)
        break;
      default:
        this.error$.next(message)
    }

    return throwError(errorResponse)
  }
}
