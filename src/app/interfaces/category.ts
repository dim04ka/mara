export enum CATEGORY {
  CANDES,
  WAX,
  CANDLEWICK,
  OTHER,
  PACKAGE,
  CONTAINER,
}
export type CATEGORY_URL = 'candles' | 'wax' | 'candlewick' | 'other' | 'package' | 'container';

export interface ICategory {
  name: string;
  url: string;
  img: string;
}
