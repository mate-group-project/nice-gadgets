export type PickupPoint = {
  id: number,
  name: string,
  address: string,
  coordinates: {
    lat: number,
    lng: number,
  },
};