type AllowedCoupons = null | 'camera-333' | 'camera-444' | 'camera-555'

type Order =
  {
    camerasIds: number[];
    coupon: AllowedCoupons;
  };

export type { Order, AllowedCoupons };
