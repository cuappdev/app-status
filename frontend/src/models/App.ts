import { DownInterval } from "./DownInterval";

export interface App {
  name: string;
  id: string;
  downIntervals: DownInterval[];
  lastUpdated: Date;
  imageUrl?: string;
}
