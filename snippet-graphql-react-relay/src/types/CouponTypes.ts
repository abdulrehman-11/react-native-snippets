export type Coupon = {
  coupon_background: string;
  coupons_available: number;
  coupon_sale_end_date: string;
  coupon_id: number;
  coupon_image: string;
  coupon_name: string;
  coupon_description: string;
  coupon_price: number;
  coupon_sales_price: number;
  coupon_sale_start_date: string;
  coupon_usage_start_date: string;
  coupon_usage_end_date: string;
  coupon_rebuyible: boolean;
  shop_logo: string;
  coupon_metadata: {
    bought_price: number;
    bought_at: string;
    used_at: string | null;
  };
  coupon_associated_game: {
    game_id: string;
    game_image: string;
    game_join_fee: number;
    game_name: string;
    game_rating: number;
  };
};
