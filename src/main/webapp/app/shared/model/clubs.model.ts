export interface IClubs {
  id?: number;
  clubname?: string;
  clubdescription?: string;
  numberofmembers?: number;
  numberofevents?: number;
}

export const defaultValue: Readonly<IClubs> = {};
