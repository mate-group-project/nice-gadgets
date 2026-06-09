export type Product = {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export type ProductAggregated = {
  id: string;
  name: string;
  image: string;
};
