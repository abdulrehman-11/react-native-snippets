import { Routes } from "../../../common";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../components/Toastify";
import { CPNetwork, Urls } from "../../../config";

const handleVerify = (code, value, phone_number, club_id, navigation) => {
  if (code.toString() !== value) {
    return showErrorMessage("Enter a valid code");
  }

  navigation.navigate(Routes.NewPasswordScreen, {
    code: value,
    phone_number,
    club_id,
  });
};

const resendCode = async (phone_number) => {
  const response = await CPNetwork.post(Urls.RegeneratePasswordToken, {
    phone_number,
  });

  if (!response.ok) {
    showErrorMessage("Failed to resend code");
    return 0;
  }
  showSuccessMessage("New otp has been sent!");
  const { code } = response.data;
  return code;
};

export { handleVerify, resendCode };
