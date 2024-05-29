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
  filters: Joi.object().pattern(
    /^[a-zA-Z]+$/, // pattern lower/uppercase letters
    Joi.string().pattern(/^[^:]+:[^:]+$/), // pattern "string:string"
  ),
  sorting: Joi.object({
    field: Joi.string(),
    order: Joi.any().valid("desc", "asc", "rand"),
  }),
  page: Joi.number().min(1),
  options: Joi.object({
    seed: Joi.number(),
    nested: Joi.boolean().falsy("false").falsy(0).truthy("true").truthy(1),
    depth: Joi.number().min(1).max(3),
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
