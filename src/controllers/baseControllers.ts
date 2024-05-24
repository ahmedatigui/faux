import { dataEntityTypes } from "../utils/mockApiConfiguration";

export function indexHandler() {
  return { niches: dataEntityTypes };
}
