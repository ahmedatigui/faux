import * as Joi from "joi";

import {
  dataEntityTypes,
  fakerFormats,
  supportedLocalization,
} from "../utils/mockApiConfiguration";

export const querySchema = Joi.object({
  data: Joi.object({
    locale: Joi.any().valid(...supportedLocalization),
    niche: Joi.any().valid(...dataEntityTypes),
    format: Joi.any().valid(...fakerFormats),
    limit: Joi.number().min(0).max(10000),
  }),
  sorting: Joi.object({
    field: Joi.string(),
    order: Joi.any().valid("desc", "asc"),
  }),
  page: Joi.number().min(1),
  options: Joi.object({
    seed: Joi.number(),
  }),
});

export const payloadSchema = Joi.object({
  locale: Joi.string().valid(...supportedLocalization),
  seed: Joi.number(),
  page: Joi.number().min(1),
  limit: Joi.number().min(0).max(10000),
  data: Joi.array()
    .items(
      Joi.alternatives().try(
        Joi.object().pattern(
          Joi.string(),
          Joi.alternatives().try(
            Joi.string().valid(...dataEntityTypes),
            Joi.object({
              value: Joi.string()
                .regex(/^[a-zA-Z]+$/)
                .required(), // pattern lower/uppercase letters
              options: Joi.object().optional(),
            }),
          ),
        ),
        Joi.string().valid(...dataEntityTypes),
      ),
    )
    .required(),
});
