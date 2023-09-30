import { Router } from "express";
import { errorJson, successJson } from "../utils/jsonResponses";
import AppController from "./controllers";

const appRouter = Router();

appRouter.get("/", async (req, res) => {
  res.status(200).send(await AppController.getApps());
});

appRouter.get("/:id", async (req, res) => {
  try {
    res
      .status(200)
      .send(successJson(await AppController.getAppById(req.params.id)));
  } catch (err) {
    res.status(400).send(errorJson(err));
  }
});

appRouter.get("/down-intervals/:id", async (req, res) => {
  const app = await AppController.getAppById(req.params.id);
  res.status(200).send(app?.downIntervals);
});

appRouter.post("/", async (req, res) => {
  res
    .status(201)
    .send(successJson(await AppController.createApp(req.body.name)));
});

appRouter.post("/status/:id", async (req, res) => {
  await AppController.appStatusChange(
    req.params.id,
    req.body.severity,
    req.body.description,
    req.body.startTime,
    req.body.endTime
  );
  res.status(201).send(successJson("status updated"));
});

export default appRouter;
