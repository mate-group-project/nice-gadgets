import { client } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

export type OrderItem = {
  productId: number | string;
  quantity: number;
  price: number;
};

export type Order = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  delivery:
    | {
        type: 'pickup';
        storeId: string;
      }
    | {
        type: 'delivery';
        city: string;
        cityRef: string;
        warehouse: string;
        warehouseRef: string;
      };

  items: OrderItem[];
  total: number;
};

export const createOrder = (data: Order) => {
  return client.post(ENDPOINTS.orders, data);
};
