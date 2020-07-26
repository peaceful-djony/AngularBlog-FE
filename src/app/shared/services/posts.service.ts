import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post";
import {Observable} from "rxjs";

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>('', post)
  }
}
