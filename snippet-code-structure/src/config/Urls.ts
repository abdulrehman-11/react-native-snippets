export default {
  //Auth
  login: "shop/authentication/login",
  register: "shop/authentication/register",
  updateProfile: "user",
  UserBankAccount: "user/bank-account",
  UserBillingKey: "shop/user/billing/key",
  sendOTP: "authentication/password/otp",
  createNewPassword: "authentication/password",

  //Company
  manageCompany: "shop/my",
  status: "shop/stats",

  // Coupons
  manageCoupons: "shop/coupons",
  manageBoughtCoupon: (id: number) => `shop/coupons/bought/${id}`,

  // Games
  allGames: "games/all",

  //Shops
  shopLocation: (id: any) => `shop/locations?code=${id}`,
};
