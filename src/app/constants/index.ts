import { CATEGORY } from '../interfaces/category';

export const categoryGroupByName: Record<CATEGORY, string> = {
  [CATEGORY.CANDES]: '0',
  [CATEGORY.WAX]: '1',
};

export const categoryGroupById = {
  0: [CATEGORY.CANDES],
  1: [CATEGORY.WAX],
  // '2': 'candlewick',
  // '3': 'other',
};
