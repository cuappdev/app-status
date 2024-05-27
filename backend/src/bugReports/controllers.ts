import nodemailer from "nodemailer";
import { BugReport, BugReportModel } from "./models";

const getBugReports = () => BugReportModel.find();

const createBugReport = async (
  email: string,
  appName: string,
  desc: string,
  creationTime: Date
) => {
  await BugReportModel.create(
    new BugReport(email, appName, desc, creationTime)
  );
  sendReportEmail(email, appName, desc, creationTime).catch((err) =>
    console.error(err)
  );
};

const sendReportEmail = (
  userEmail: string,
  appName: string,
  desc: string,
  creationTime: Date
) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailDetails = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `[Cornell AppDev] ${appName} Bug Report`,
    text: `Email: ${userEmail}\nReport Date: ${creationTime.toDateString()}\nApp: ${appName}\nDescription: ${desc}`,
  };

  return mailTransporter.sendMail(emailDetails);
};

export default {
  getBugReports,
  createBugReport,
};
