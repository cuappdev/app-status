import nodemailer from "nodemailer";
import SubscriberController from "../subscribers/controllers";
import { App, AppModel, DownInterval, stringToSeverityEnum } from "./models";

const getApps = () => AppModel.find();

const getAppById = (id: string) => AppModel.findById(id);

const createApp = (name: string, imageUrl?: string) =>
  AppModel.create(new App(name, imageUrl));

const appStatusChange = async (
  id: string,
  severity: string,
  description: string,
  startTimeString: string,
  endTimeString?: string
) => {
  let startTime = new Date(startTimeString);
  let endTime = endTimeString ? new Date(endTimeString) : undefined;

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

  appDocument.lastUpdated = new Date();
  appDocument.downIntervals.push(newInterval);
  await appDocument.save();
};

const appFixed = async (id: string, fixTime: Date) => {
  let app = (await getAppById(id))!;
  app.lastUpdated = new Date();
  app.downIntervals[app.downIntervals.length - 1].endTime = fixTime;
  app.markModified("downIntervals");
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

const sendStatusEmail = (
  userEmail: string,
  appName: string,
  oldStatus: string,
  newStatus: string,
  mailTransporter: nodemailer.Transporter
) => {
  const emailDetails = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `[Cornell AppDev] ${appName} status update`,
    text: `The app status of ${appName} has changed from ${oldStatus} to ${newStatus}. You are receiving this email because you subscribed to updates for this app on the Cornell AppDev status platform.`,
  };

  return mailTransporter.sendMail(emailDetails);
};

const sendStatusEmails = async (
  appId: string,
  oldStatus: string,
  newStatus: string
) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const appName = (await getAppById(appId))?.name!;
  const users = await SubscriberController.getSubscribers();
  for (const user of users) {
    if (new Set(user.subscribedApps).has(appName)) {
      sendStatusEmail(
        user.email,
        appName,
        oldStatus,
        newStatus,
        mailTransporter
      ).catch((err) => console.error(err));
    }
  }
};

export default {
  getApps,
  getAppById,
  createApp,
  appStatusChange,
  appFixed,
  getAppDownIntervals,
  updateImage,
  sendStatusEmails,
};
