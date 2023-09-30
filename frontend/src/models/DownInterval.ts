export interface DownInterval {
  severity: Severity;
  description: string;
  startTime: Date;
  endTime?: Date;
}

enum Severity {
  Medium,
  High,
}
