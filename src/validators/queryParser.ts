export function parseFilter(filterValue: string, compareToValue: string) {
  const parsedFilter = filterValue.split(":");

  switch (parsedFilter[0]) {
    case "gt":
      return compareToValue > parsedFilter[1];
    case "eq":
      return compareToValue === parsedFilter[1];
    case "ls":
      return compareToValue < parsedFilter[1];
    default:
      break;
  }
}
