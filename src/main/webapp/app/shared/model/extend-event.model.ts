import dayjs from 'dayjs';

export interface IExtendEvent {
  id?: number;
  eventname?: string;
  date?: string;
  location?: string;
  eventdescription?: string;
  club?: string;
}

export const defaultValue: Readonly<IExtendEvent> = {};
