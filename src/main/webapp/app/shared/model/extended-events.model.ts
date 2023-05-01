import dayjs from 'dayjs';
import { IExtendClub } from 'app/shared/model/extend-club.model';
import { IUser } from 'app/shared/model/user.model';
import { CategoryType } from 'app/shared/model/enumerations/category-type.model';

export interface IExtendedEvents {
  id?: number;
  event?: string;
  date?: string;
  location?: string;
  eventdescription?: string;
  category?: CategoryType | null;
  club?: IExtendClub | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IExtendedEvents> = {};
