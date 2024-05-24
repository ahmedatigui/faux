import * as Joi from "joi";

import {
  dataEntityTypes,
  fakerFormats,
  filterOperators,
  supportedLocalization,
} from "../utils/mockApiConfiguration";
import { generateFiltersRegexPatter } from "../utils/helpers";

export const querySchema = {
  data: Joi.object({
    locale: Joi.any().valid(...supportedLocalization),
    niche: Joi.any().valid(...dataEntityTypes),
    format: Joi.any().valid(...fakerFormats),
    count: Joi.number().min(0).max(10000),
  }),
  filters: Joi.array().items(
    Joi.string().pattern(generateFiltersRegexPatter(filterOperators)),
  ),
  sorting: Joi.object({
    field: Joi.string(),
    order: Joi.any().valid("desc", "asc"),
  }),
  pagination: Joi.object({ page: Joi.number() }),
  options: Joi.object({
    seed: Joi.number(),
    nested: Joi.boolean().falsy("false").falsy(0).truthy("true").truthy(1),
    depth: Joi.number().min(1).max(3),
  }),
};
