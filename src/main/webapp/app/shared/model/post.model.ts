import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  date?: string;
  user?: IUser | null;
}

export const defaultValue: Readonly<IPost> = {};
