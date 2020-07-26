import * as moment from 'moment';

export interface Post {
  id?: string,
  title: string,
  text: string,
  author: string,
  createdAt: moment.Moment,
}
