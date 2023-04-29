import dayjs from 'dayjs';

export interface IUniUser {
  id?: number;
  name?: string | null;
  nickname?: string | null;
  role?: string | null;
  studentId?: string | null;
  gender?: string | null;
  birthday?: string | null;
  clubs?: string | null;
  uni?: string | null;
  email?: string | null;
  balance?: number | null;
}

export const defaultValue: Readonly<IUniUser> = {};
