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
    if (endTime && startTime > endTime) {
      throw new Error("Start time cannot occur after end time");
    }

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

  @prop()
  imageUrl?: string;

  constructor(name: string, imageUrl?: string) {
    this.name = name;
    this.downIntervals = [];
    this.lastUpdated = new Date();
    this.imageUrl = imageUrl;
  }
}

const AppModel = getModelForClass(App);

export { App, AppModel, DownInterval, stringToSeverityEnum };
