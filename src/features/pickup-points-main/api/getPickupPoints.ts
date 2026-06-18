import { client } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { PickupPoint } from '../types/PickupPoint';

type Language = 'en' | 'ua';

type StoresResponse = {
  id: string;
  data: PickupPoint[];
};

export const getPickupPoints = async (language: Language) => {
  const response = await client.get<StoresResponse>(`${ENDPOINTS.stores}/${language}`);

  console.log('getPickupPoints response:', response);

  return response.data;
};
