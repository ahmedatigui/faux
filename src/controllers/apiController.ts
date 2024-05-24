import * as Hapi from "@hapi/hapi";
import { Data } from "../models/test";

export async function apiHandler(request: Hapi.Request) {
  const queryParams = request.query;

  const seed = queryParams.options.seed;
  const locale = queryParams.data.locale;
  const count = queryParams.data.count;
  const niche = queryParams.data.niche;

  const model = new Data(seed, locale, count, niche);
  const data = await model.init();

  console.log(data);

  return { seed, locale, count, niche, data };
}
