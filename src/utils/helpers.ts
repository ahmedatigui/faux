import { sortOrder } from "./types";

export function generateFiltersRegexPatter(filterOperators: string[]) {
  const pattern = `/${filterOperators.join("|")}/g`;
  return new RegExp(pattern);
}

export function sortByDynamicProperty(arr: [], prop: string, order: sortOrder) {
  return arr.sort((a, b) => {
    const aValue = new Date(a[prop]).getTime();
    const bValue = new Date(b[prop]).getTime();

    // if values are dates
    if (!isNaN(aValue) || !isNaN(bValue)) {
      if (order === "desc") return bValue - aValue;
      else if (order === "asc") return aValue - bValue;
    }

    // if values are not dates
    if (order === "desc") return a[prop] < b[prop] ? 1 : -1;
    else if (order === "asc") return a[prop] > b[prop] ? 1 : -1;
  });
}
