export interface DownInterval {
  severity: Severity;
  description: string;
  startTime: Date;
  endTime?: Date;
}

export enum Severity {
  Medium,
  High,
}
