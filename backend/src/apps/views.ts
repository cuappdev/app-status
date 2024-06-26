import { Router } from "express";
import { successJson } from "../utils/jsonResponses";
import AppController from "./controllers";

const appRouter = Router();

appRouter.get("/", async (req, res) => {
  res.status(200).send(successJson(await AppController.getApps()));
});

appRouter.get("/:id", async (req, res, next) => {
  try {
    res
      .status(200)
      .send(successJson(await AppController.getAppById(req.params.id)));
  } catch (err) {
    next(err);
  }
});

appRouter.get("/down-intervals/:id", async (req, res) => {
  const app = await AppController.getAppById(req.params.id);
  res.status(200).send(app?.downIntervals);
});

appRouter.post("/", async (req, res) => {
  res
    .status(201)
    .send(
      successJson(
        await AppController.createApp(req.body.name, req.body.imageUrl)
      )
    );
});

appRouter.post("/app-down/:id", async (req, res, next) => {
  try {
    await AppController.appStatusChange(
      req.params.id,
      req.body.severity,
      req.body.description,
      req.body.startTime,
      req.body.endTime
    );
    res.status(201).send(successJson("status updated"));
  } catch (err) {
    next(err);
  }
});

appRouter.post("/app-fixed/:id", async (req, res, next) => {
  try {
    await AppController.appFixed(req.params.id, new Date(req.body.date));
    await AppController.sendStatusEmails(
      req.params.id,
      "Down",
      "Up and running"
    );
    res.status(200).send(successJson("App fixed"));
  } catch (err) {
    next(err);
  }
});

appRouter.post("/update-image/:id", async (req, res) => {
  await AppController.updateImage(req.params.id, req.body.imageUrl);
  res.status(201).send(successJson(req.body.imageUrl));
});

export default appRouter;
