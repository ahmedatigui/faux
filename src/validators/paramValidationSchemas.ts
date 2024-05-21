import * as Joi from "joi";

import { fakerModules, fakerFormats } from "../utils/faker";

export const schemas = {
  data: Joi.object({
    niche: Joi.string().allow([...fakerModules]),
    format: Joi.string().allow([...fakerFormats]),
    count: Joi.number().min(0).max(1000),
  }),
  // TODO
};
