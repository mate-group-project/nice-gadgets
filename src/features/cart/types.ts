export type ProductCart = {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  name: string;
  fullPrice: number;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  capacity?: string;
};
