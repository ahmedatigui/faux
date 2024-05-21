import * as Hapi from "@hapi/hapi";
import { parseParams } from "../validators/paramsParser";
//import { validateParams } from "../validators/paramValidation";

export function apiHandler(request: Hapi.Request) {
  const params = request.url.search.slice(1);
  const parsedParams = parseParams(params);
  // const validatedParams = validateParams(parsedParams); // TODO
  return parsedParams;
}
