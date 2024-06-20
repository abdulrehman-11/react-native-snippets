export type Card = {
  payment_method_id: string;
  payment_method_card_brand: string;
  payment_method_card_last4: string;
  payment_method_card_exp_month: number;
  payment_method_card_exp_year: number;
};

export type Bank = {
  bank_id: string;
  account_number: string;
  account_name: string;
  bank_name: string;
  ifsc_code: string;
  last_update_at: string;
  branch_number: number;
  deposit_type: string;
  account_name_furigana: string;
};
