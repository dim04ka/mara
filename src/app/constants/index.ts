import { CATEGORY, CATEGORY_URL, ICategory } from '../interfaces/category';

// export const categoryGroupByName: Record<CATEGORY, string> = {
//   [CATEGORY.CANDES]: '0',
//   [CATEGORY.WAX]: '1',
// };
//
// export const categoryGroupById = {
//   0: [CATEGORY.CANDES],
//   1: [CATEGORY.WAX],
//   2: [CATEGORY.CANDLEWICK],
//   3: [CATEGORY.OTHER],
// };
export const categoryGroupById = {
  0: 'candles',
  1: 'wax',
  2: 'candlewick',
  3: 'other',
};
export const categoryGroup: Record<CATEGORY_URL, string> = {
  candles: '0',
  wax: '1',
  candlewick: '2',
  other: '3',
};
export const PRODUCTS_URL = 'https://back-ashy-six.vercel.app';

export const infinityMenuItems = [
  'воск',
  'фитили',
  'аромамасла',
  'свечи',
  'быстрый самовывоз с нашего склада',
  'бесплатная доставка по тбилиси от 350 лар',
];

export const categories: ICategory[] = [
  {
    name: 'Свечи',
    url: 'candles',
    img: '/assets/images/category/category-candles.png',
  },
  {
    name: 'Воски',
    url: 'wax',
    img: '/assets/images/category/category-vox.png',
  },
  {
    name: 'Фитили',
    url: 'candlewick',
    img: '/assets/images/category/category-wick.png',
  },
  {
    name: 'Другое',
    url: 'other',
    img: '/assets/images/category/category-other.png',
  },
];
