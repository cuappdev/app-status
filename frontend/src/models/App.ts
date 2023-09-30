import { DownInterval } from "./DownInterval";

export interface App {
  id: string;
  name: string;
  id: string;
  downIntervals: DownInterval[];
  lastUpdated: Date;
  imageUrl?: string;
}
