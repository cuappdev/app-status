export interface DownInterval {
  startDate: Date;
  endDate: Date;
  description: string;
  serverity: Serverity;
}
enum Serverity {
  Medium,
  High,
}
