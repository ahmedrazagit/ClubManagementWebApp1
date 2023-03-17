import dayjs from 'dayjs';

export interface IEvent {
  id?: number;
  name?: string | null;
  date?: string;
  location?: string;
  description?: string;
}

export const defaultValue: Readonly<IEvent> = {};
