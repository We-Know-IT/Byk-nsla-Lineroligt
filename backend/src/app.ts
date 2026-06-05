import cors from "cors";
import express from "express";
import { eventsRouter } from "./routes/events.js";
import { frivilligkraftRouter } from "./routes/frivilligkraft.js";
import { healthRouter } from "./routes/health.js";
import { samhallsbyggeRouter } from "./routes/samhallsbygge.js";
import { siteThemesRouter } from "./routes/site-themes.js";
import { siteNavigationRouter } from "./routes/site-navigation.js";
import { weatherRouter } from "./routes/weather.js";
import { notFoundHandler, sendError } from "./shared/http.js";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/api/events", eventsRouter);
  app.use("/api/frivilligkraft", frivilligkraftRouter);
  app.use("/api/samhallsbygge", samhallsbyggeRouter);
  app.use("/api/site-themes", siteThemesRouter);
  app.use("/api/site-navigation", siteNavigationRouter);
  app.use("/api/weather", weatherRouter);

  app.use(notFoundHandler);

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof Error) {
      return sendError(res, error.message, 500);
    }
    return sendError(res, "Unexpected server error", 500);
  });

  return app;
};
