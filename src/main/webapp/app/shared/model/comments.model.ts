import { IPost } from 'app/shared/model/post.model';
import { IUser } from 'app/shared/model/user.model';

export interface IComments {
  id?: number;
  comment?: string;
  post?: IPost | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IComments> = {};
