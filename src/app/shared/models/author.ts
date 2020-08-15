import {Post} from "./post";

export interface Author {
  email: string,
  firstName: string,
  lastName: string,
  posts: Post[]
}
