import { Bank, Card } from "./PaymentCardType";

export type User = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_phone_number: string;
  user_avatar: string;
  default_payment_method: Card | null;
  user_bank_account: Bank | null;
  user_invite_link: string;
  user_invited_by: {
    inviter_name: string;
    inviter_avatar: string;
  } | null;
  wallets: {
    CP_TOKEN: string;
    USD: string;
  };
};
