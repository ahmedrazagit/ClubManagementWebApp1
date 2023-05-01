import { IUser } from 'app/shared/model/user.model';

export interface IExtendClub {
  id?: number;
  clubname?: string;
  clubdescription?: string;
  numberofmembers?: number;
  numberofevents?: number;
  university?: string;
  user?: IUser | null;
}

export const defaultValue: Readonly<IExtendClub> = {};
