import { App, AppModel, DownInterval, stringToSeverityEnum } from "./models";

const getApps = () => AppModel.find();

const getAppById = (id: string) => AppModel.findById(id);

const createApp = (name: string) => AppModel.create(new App(name));

const appStatusChange = async (
  id: string,
  severity: string,
  description: string,
  startTime: Date,
  endTime?: Date
) => {
  const appDocument = await getAppById(id);

  if (!appDocument) {
    throw new Error("Invalid id supplied");
  }

  const severityEnum = stringToSeverityEnum(severity);
  const newInterval = new DownInterval(
    severityEnum,
    description,
    startTime,
    endTime
  );

  appDocument.downIntervals.push(newInterval);
  await appDocument.save();
};

const getAppDownIntervals = async (id: string) => {
  return (await getAppById(id))?.downIntervals;
};

export default {
  getApps,
  getAppById,
  createApp,
  appStatusChange,
  getAppDownIntervals,
};
