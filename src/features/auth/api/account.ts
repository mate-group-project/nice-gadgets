import { client } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";

export type StoredUser = {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  };
  delivery: {
    type: string;
    storeId: string;
  };
};

export type Order = {
  id: string;
  email: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
  total: number;
};

export const findUserByEmail = (email: string) => {
  return client
    .get<StoredUser[]>(`${ENDPOINTS.users}?customer.email=${email}`)
    .then((users) => users[0] ?? null);
}

export const getOrdersByEmail = (email: string) => {
  return client.get<Order[]>(`${ENDPOINTS.orders}?email=${email}`)
}

export const updateUserPassword = (userId: string, newPassword: string, currentUser: StoredUser) => {
  return client.patch(`${ENDPOINTS.users}/${userId}`, {
    customer: { ...currentUser.customer, password: newPassword },
  });
};