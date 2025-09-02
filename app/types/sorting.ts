export const SortValues = {
  PriceLowHigh: 'Price (low to high)',
  PriceHighLow: 'Price (high to low)',
  NameAToZ: 'Name (A to Z)',
  NameZToA: 'Name (Z to A)',
} as const;

export type PriceSort = typeof SortValues.PriceLowHigh | typeof SortValues.PriceHighLow;
export type NameSort = typeof SortValues.NameAToZ | typeof SortValues.NameZToA;
export type SortByValue = PriceSort | NameSort;
