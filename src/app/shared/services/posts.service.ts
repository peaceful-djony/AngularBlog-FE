import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Post} from "../models/post";
import {environment} from "../../../environments/environment";
import {AccountService} from "./account.service";

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}

  private static get serviceUrl(): string {
    return environment.baseUrl + 'posts'
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(PostsService.serviceUrl, post)
  }
}
