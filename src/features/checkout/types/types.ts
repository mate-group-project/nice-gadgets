export type DeliveryType = 'pickup' | 'delivery';

export type City = {
  Ref: string;
  DeliveryCity?: string;
  Present?: string;
  Description?: string;
  MainDescription?: string;
};

export type Warehouse = {
  Ref: string;
  Description: string;
};