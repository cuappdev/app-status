export interface DownInterval {
  severity: Severity;
  description: string;
  startTime: string;
  endTime?: string;
}

export enum Severity {
  Medium,
  High,
}
