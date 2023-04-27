import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  date?: string;
  imageContentType?: string | null;
  image?: string | null;
  annoncement?: boolean | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IPost> = {
  annoncement: false,
};
