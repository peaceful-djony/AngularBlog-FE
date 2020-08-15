import * as moment from 'moment';
import {Author} from "./author";

export interface Post {
  id?: string,
  title: string,
  content: string,
  author: Author,
  createdAt: moment.Moment,
}
