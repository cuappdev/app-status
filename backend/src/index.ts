import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";
import spec from "../api-spec.json";
import appRouter from "./apps/views";
import bugRouter from "./bugReports/views";
import { dbConnect } from "./database";
import jsonErrorHandler from "./middleware/jsonError";
import subscriberRouter from "./subscribers/views";

const app = express();
app.use(cors());

// Middleware to parse json request bodies
app.use(bodyParser.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));

/**
 * Sub-routers for our main router, we should have one sub-router per "entity" in the application
 */
app.use("/apps", appRouter);
app.use("/bug-reports", bugRouter);
app.use("/subscribers", subscriberRouter);

/**
 * Some dummy routes to illustrate express syntax
 */
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.use(jsonErrorHandler);

app.listen(process.env.PORT || 8000, async () => {
  console.log("✅ Server is up and running");
  await dbConnect();
});
