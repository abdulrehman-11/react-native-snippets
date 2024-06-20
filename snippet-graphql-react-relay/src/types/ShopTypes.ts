export type Shop = {
  shop_uuid: string;
  shop_name: string;
  shop_name_furigana: string;
  shop_logo: string | null;
  shop_pr: string;
  shop_contact: {
    contact_uuid: string;
    contact_name: string;
    contact_name_furigana: string;
    contact_phone_number: string;
    contact_url: string;
  };
  shop_location: {
    location_uuid: string;
    location_postal_code: string;
    location_prefecture: string;
    location_address: string;
    location_building: string;
  };
};
