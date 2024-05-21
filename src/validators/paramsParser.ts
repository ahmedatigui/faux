import * as qs from "qs";

export function parseParams(params: string): qs.ParsedQs {
  return qs.parse(params);
}
