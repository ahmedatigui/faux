import * as Hapi from "@hapi/hapi";
import * as Joi from "joi";
import { indexHandler, apiHandler } from "../controllers";
import { querySchema } from "../validators/paramValidationSchemas";

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
    options: {
      validate: {
        query: Joi.compile(querySchema), // query expects precompiled rules
        // failAction: (err) => {
        //   throw err.info; // Provide detailed validation error responses
        //   // return err;
        // },
      },
    },
  },
];
