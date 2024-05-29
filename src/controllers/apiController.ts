import * as Hapi from "@hapi/hapi";
import { Data, mockerData } from "../models";
import { Payload } from "../utils/types";

export async function getApiHandler(request: Hapi.Request) {
  const queryParams = request.query;

  const seed = queryParams?.options?.seed;
  const locale = queryParams?.data?.locale;
  const limit = queryParams?.data?.limit;
  const niche = queryParams?.data?.niche;
  const sortField = queryParams?.sorting?.field;
  const sortOrder = queryParams?.sorting?.order;
  // const filters = queryParams?.filters;
  const page = queryParams?.page;

  const model = new Data(
    seed,
    locale,
    limit,
    niche,
    sortField,
    sortOrder,
    page,
  );
  const data = await model.init();

  return { seed, locale, limit, niche, sortField, sortOrder, page, data };
}

export async function postApiHandler(request: Hapi.Request) {
  const payload = request.payload as Payload;

  const dataSchema = payload?.data;
  const seed = payload?.seed;
  const locale = payload?.locale;
  const limit = payload?.limit;
  const page = payload?.page;

  const model = new mockerData(dataSchema, seed, locale, limit, page);
  const data = await model.init();

  return data;
}
