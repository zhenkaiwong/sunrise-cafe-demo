export type FilterStatus = {
  coffee: boolean;
  nonCoffee: boolean;
  pastries: boolean;
}
export function getFilterStatuses(filters: string[]): FilterStatus {
  const filterStatuses = {
    coffee: false,
    nonCoffee: false,
    pastries: false,
  };
  filters.forEach((filter) => {
    switch (filter) {
      case "coffee":
        filterStatuses.coffee = true;
        break;
      case "nonCoffee":
        filterStatuses.nonCoffee = true;
        break;
      case "pastries":
        filterStatuses.pastries = true;
        break;
      default:
        console.error(
          `Unable to translate filter \'${filter}\'. Such filter is not supported and will be skipped`
        );
    }
  });

  return filterStatuses;
}
