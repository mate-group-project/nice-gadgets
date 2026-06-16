const API_URL = 'https://api.novaposhta.ua/v2.0/json/';
const API_KEY = '16af6293d170d7be4272e5976bf3a4ed';

const request = async <T>(
  modelName: string,
  calledMethod: string,
  methodProperties = {},
): Promise<T> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: API_KEY,
      modelName,
      calledMethod,
      methodProperties,
    }),
  });

  if (!response.ok) {
    throw new Error(`Nova Poshta request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const novaPoshtaApi = {
  getWarehouses: <T>(cityRef: string) =>
    request<T>('AddressGeneral', 'getWarehouses', {
      CityRef: cityRef,
    }),

  searchSettlements: <T>(cityName: string) =>
    request<T>('Address', 'searchSettlements', {
      CityName: cityName,
      Limit: 20,
    }),
};
