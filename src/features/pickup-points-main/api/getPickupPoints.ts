import { client } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { PickupPoint } from '../types/PickupPoint';

// type Language = 'en' | 'uk';

type StoresResponse = {
  id: string;
  data: PickupPoint[];
};

export const getPickupPoints = async () => {
  const response = await client.get<StoresResponse>(
    `${ENDPOINTS.stores}`,
  );

  console.log('getPickupPoints response:', response);

  return response.data;
};
