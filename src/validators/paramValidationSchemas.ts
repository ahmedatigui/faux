import * as Joi from "joi";

import {
  dataEntityTypes,
  fakerFormats,
  supportedLocalization,
} from "../utils/mockApiConfiguration";

export const querySchema = {
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
  page: Joi.number(),
  options: Joi.object({
    seed: Joi.number(),
    nested: Joi.boolean().falsy("false").falsy(0).truthy("true").truthy(1),
    depth: Joi.number().min(1).max(3),
  }),
};
