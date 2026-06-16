import { Router } from "express";
import { getFrivilligkraftAdapter } from "../adapters/registry/frivilligkraft-registry.js";
import { FrivilligkraftService } from "../modules/frivilligkraft/frivilligkraft-service.js";
import { sendSuccess } from "../shared/http.js";

export const frivilligkraftRouter = Router();

const DEFAULT_TAKE = 20;
const MAX_TAKE = 100;

const parseGeoLocationIds = (value: unknown): number[] => {
  const raw = Array.isArray(value) ? value : value === undefined ? [] : [value];
  return raw
    .map((entry) => Number.parseInt(String(entry), 10))
    .filter((id) => Number.isInteger(id) && id > 0);
};

const parseNonNegativeInt = (value: unknown, fallback: number): number => {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

frivilligkraftRouter.get("/missions", async (req, res, next) => {
  try {
    const geoLocationIds = parseGeoLocationIds(req.query.geoLocationIds);
    const skip = parseNonNegativeInt(req.query.skip, 0);
    const take = Math.min(parseNonNegativeInt(req.query.take, DEFAULT_TAKE) || DEFAULT_TAKE, MAX_TAKE);

    const service = new FrivilligkraftService(getFrivilligkraftAdapter());
    const { missions, totalCount } = await service.listMissions({ geoLocationIds, skip, take });

    return sendSuccess(
      res,
      { items: missions, totalCount },
      {
        provider: "frivilligkraft",
        adapterBoundary: true,
      },
    );
  } catch (error) {
    return next(error);
  }
});
