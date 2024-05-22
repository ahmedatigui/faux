import * as Hapi from "@hapi/hapi";

export function apiHandler(request: Hapi.Request) {
  const queryParams = request.query;
  return queryParams;
}
