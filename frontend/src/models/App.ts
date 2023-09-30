import { DownInterval } from "./DownInterval";

export interface App {
  name: string;
  downIntervals: DownInterval[];
  lastUpdated: Date;
}
