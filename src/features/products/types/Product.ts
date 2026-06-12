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

export type ProductDescription = {
  title: string;
  text: string[];
};

export type ProductVariantOption = {
  id: string;
  name: string;
  color: string;
  capacity: string;
};

export type ProductDetails = {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  namespaceId: string;
  name: string;
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  color: string;
  images: string[]; 
  description: ProductDescription[]; 
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[]; 
  colorsAvailable: ProductVariantOption[];
  capacityAvailable: ProductVariantOption[];
};