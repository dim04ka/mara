export enum CATEGORY {
  CANDES,
  WAX,
  CANDLEWICK,
  OTHER,
}
export type CATEGORY_URL = 'candles' | 'wax' | 'candlewick' | 'other';

export interface ICategory {
  name: string;
  url: string;
  img: string;
}
