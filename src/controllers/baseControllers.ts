import {
  dataEntityTypes,
  supportedLocalization,
} from "../utils/mockApiConfiguration";

export function indexHandler() {
  return { niches: dataEntityTypes, locales: supportedLocalization };
}
