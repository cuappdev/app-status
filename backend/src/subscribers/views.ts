import { Router } from "express";
import { successJson } from "../utils/jsonResponses";
import SubscriberController from "./controllers";

const subscriberRouter = Router();

subscriberRouter.get("/", async (req, res) => {
  res
    .status(200)
    .send(successJson(await SubscriberController.getSubscribers()));
});

subscriberRouter.post("/", async (req, res, next) => {
  await SubscriberController.createSubscriber(req.body.email).catch((err) =>
    next(err)
  );
  res.status(201).send(successJson("Subscriber created"));
});

subscriberRouter.post("/subscribe", async (req, res, next) => {
  await SubscriberController.subscribeToApp(
    req.body.email,
    req.body.appName
  ).catch((err) => next(err));
  res.status(201).send(successJson("Subscribed to app"));
});

export default subscriberRouter;
