import * as Hapi from "@hapi/hapi";
import * as Joi from "joi";
import { indexHandler, getApiHandler, postApiHandler } from "../controllers";
import { querySchema, payloadSchema } from "../validators";

export const baseRoutes: Hapi.ServerRoute<Hapi.ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/",
    handler: indexHandler,
  },
  {
    method: "GET",
    path: "/api",
    handler: getApiHandler,
    options: {
      validate: {
        query: querySchema,
        failAction: (_request, h, err) => {
          const validationError = err as Joi.ValidationError;

          const errorDetails = validationError.details.map(
            (detail: Joi.ValidationErrorItem) => ({
              message: detail.message,
              path: detail.path,
              type: detail.type,
            }),
          );
          return h
            .response({ status: "fail", errors: errorDetails })
            .code(400)
            .takeover();
        },
      },
    },
  },
  {
    method: "POST",
    path: "/api",
    handler: postApiHandler,
    options: {
      validate: {
        payload: payloadSchema,
        failAction: (_request, h, err) => {
          const validationError = err as Joi.ValidationError;

          const errorDetails = validationError.details.map(
            (detail: Joi.ValidationErrorItem) => ({
              message: detail.message,
              path: detail.path,
              type: detail.type,
            }),
          );
          return h
            .response({ status: "fail", errors: errorDetails })
            .code(400)
            .takeover();
        },
      },
    },
  },
];
