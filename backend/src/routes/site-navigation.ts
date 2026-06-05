import { Router } from "express";
import { SiteNavigationService } from "../modules/site-navigation/site-navigation-service.js";
import { sendError, sendSuccess } from "../shared/http.js";

export const siteNavigationRouter = Router();

const siteNavigationService = new SiteNavigationService();

const readPageMap = (value: unknown): Record<string, boolean> | null => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const entries = Object.entries(value);
  if (entries.some(([, enabled]) => typeof enabled !== "boolean")) {
    return null;
  }

  return Object.fromEntries(entries) as Record<string, boolean>;
};

siteNavigationRouter.get("/", async (_req, res, next) => {
  try {
    const state = await siteNavigationService.getNavigationState();
    return sendSuccess(res, state);
  } catch (error) {
    return next(error);
  }
});

siteNavigationRouter.put("/", async (req, res, next) => {
  const pages = readPageMap(req.body?.pages);
  if (!pages) {
    return sendError(res, "Provide a pages mapping.", 400);
  }

  try {
    const state = await siteNavigationService.saveNavigationState(pages);
    return sendSuccess(res, state);
  } catch (error) {
    return next(error);
  }
});
