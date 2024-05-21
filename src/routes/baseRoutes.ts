import * as Hapi from "@hapi/hapi";
import { indexHandler, apiHandler } from "../controllers/baseControllers";

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
