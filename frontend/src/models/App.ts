import { DownInterval } from "./DownInterval";

export interface App {
  id: string;
  name: string;
  downIntervals: DownInterval[];
  lastUpdated: string;
  imageUrl?: string;
}
