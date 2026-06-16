import { client } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

export type Store = {
  id: string;
  name: string;
};

type StoresResponse = {
  data: Store[];
};

export const getStores = () => {
  return client.get<StoresResponse>(ENDPOINTS.stores);
};