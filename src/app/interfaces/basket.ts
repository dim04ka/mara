import { Product } from './table';

export interface Basket {}

export interface Item {
  id: string;
  count: number;
}

export interface IBasketOrder extends Product {
  countProduct: number;
}
