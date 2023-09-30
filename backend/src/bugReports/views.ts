import { Router } from "express";
import { successJson } from "../utils/jsonResponses";
import BugController from "./controllers";

const bugRouter = Router();

bugRouter.get("/", async (req, res) => {
  res.status(200).send(successJson(await BugController.getBugReports()));
});

bugRouter.post("/", async (req, res) => {
  await BugController.createBugReport(
    req.body.email,
    req.body.appName,
    req.body.desc,
    new Date(req.body.createdTime)
  );
  res.status(201).send(successJson("Added bug report"));
});

export default bugRouter;
