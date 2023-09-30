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
};

export default {
  getBugReports,
  createBugReport,
};
