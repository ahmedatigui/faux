import * as Hapi from "@hapi/hapi";
import { indexHandler } from "../controllers/baseControllers";
import { apiHandler } from "../controllers/apiController";

export const baseRoutes: Hapi.ServerRoute<Hapi.ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/",
    handler: indexHandler,
  },
  {
    method: "GET",
    path: "/api",
    handler: apiHandler,
  },
];
