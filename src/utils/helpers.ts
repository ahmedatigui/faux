export function generateFiltersRegexPatter(filterOperators: string[]) {
  const pattern = `/${filterOperators.join("|")}/g`;
  return new RegExp(pattern);
}
