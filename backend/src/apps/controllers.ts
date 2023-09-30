import { App, AppModel, DownInterval, stringToSeverityEnum } from "./models";

const getApps = () => AppModel.find();

const getAppById = (id: string) => AppModel.findById(id);

const createApp = (name: string, imageUrl?: string) =>
  AppModel.create(new App(name, imageUrl));

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

  const numDownIntervals = appDocument.downIntervals.length;
  if (numDownIntervals > 0) {
    const lastEnd = appDocument.downIntervals[numDownIntervals - 1].endTime;
    if (!lastEnd || startTime < lastEnd) {
      throw new Error("Overlapping intervals not allowed");
    }
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

const appFixed = async (id: string, fixTime: Date) => {
  let app = (await getAppById(id))!;
  app.downIntervals[app.downIntervals.length - 1].endTime = fixTime;
  await app.save();
};

const getAppDownIntervals = async (id: string) => {
  return (await getAppById(id))?.downIntervals;
};

const updateImage = async (id: string, imageUrl: string) => {
  let app = (await getAppById(id))!;
  app.imageUrl = imageUrl;
  await app.save();
};

export default {
  getApps,
  getAppById,
  createApp,
  appStatusChange,
  appFixed,
  getAppDownIntervals,
  updateImage,
};
