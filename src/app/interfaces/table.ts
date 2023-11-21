export enum Column {
  Title = 'title',
  Price = 'price',
  Images = 'images',
  SmallDescription = 'small_description',
  FullDescription = 'full_description',
  Category = 'category',
  CustomColumn = 'customColumn',
  Hide = 'hide',
  Count = 'count',
}
export interface ITableColumns {
  columnDef: Column;
  header: string;
  cell: (value: Product) => string;
  // filterType?: FILTER_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  isSingle?: boolean;
  sortDef?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save?: (value: any) => void;
}

export interface Product {
  id: string;
  images: string[];
  title: string;
  price: string;
  full_description: string;
  small_description: string;
  category: string;
  hide: boolean;
  countProduct: number;
}
