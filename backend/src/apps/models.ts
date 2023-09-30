import { getModelForClass, prop } from "@typegoose/typegoose";

enum Severity {
  Medium,
  High,
}

const stringToSeverityEnum = (severityString: string) => {
  switch (severityString) {
    case "Medium":
      return Severity.Medium;
    case "High":
      return Severity.High;
    default:
      throw new Error("Invalid severity provided");
  }
};

class DownInterval {
  @prop()
  severity: Severity;

  @prop()
  description: string;

  @prop()
  startTime: Date;

  @prop()
  endTime?: Date;

  constructor(
    severity: Severity,
    description: string,
    startTime: Date,
    endTime?: Date
  ) {
    this.severity = severity;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

class App {
  @prop()
  name: string;

  @prop()
  downIntervals: DownInterval[];

  @prop()
  lastUpdated: Date;

  constructor(name: string) {
    this.name = name;
    this.downIntervals = [];
    this.lastUpdated = new Date();
  }
}

const AppModel = getModelForClass(App);

export { App, AppModel, DownInterval, stringToSeverityEnum };
