import { getModelForClass, prop } from "@typegoose/typegoose";

class BugReport {
  @prop()
  reporterEmail: string;

  @prop()
  appName: string;

  @prop()
  description: string;

  @prop()
  creationTime: Date;

  constructor(
    email: string,
    appName: string,
    desc: string,
    creationTime: Date
  ) {
    this.reporterEmail = email;
    this.appName = appName;
    this.description = desc;
    this.creationTime = creationTime;
  }
}

const BugReportModel = getModelForClass(BugReport);

export { BugReport, BugReportModel };
