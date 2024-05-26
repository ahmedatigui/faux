import * as Hapi from "@hapi/hapi";
import { Data } from "../models/dataGenerator";

export async function apiHandler(request: Hapi.Request) {
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

  console.log(data);

  return { seed, locale, limit, niche, sortField, sortOrder, page, data };
}
