import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {environment} from "../../../environments/environment";
import {Author} from "../models/author";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {
  }

  private static get serviceUrl(): string {
    return environment.baseUrl + 'account'
  }

  getAuthor(): Observable<Author> {
    const url = AccountService.serviceUrl + '/author'
    return this.http.get<Author>(url)
  }

  handleError(errorResponse: HttpErrorResponse): any {
    console.error(errorResponse.message);

    throwError(errorResponse);
  }
}
