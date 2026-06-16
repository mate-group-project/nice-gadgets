export type PickupPoint = {
  id: 'en' | 'uk';
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};
