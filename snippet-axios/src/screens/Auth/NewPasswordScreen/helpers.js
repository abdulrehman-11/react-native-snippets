import { ResetPasswordValidation } from "../../../validations";
import {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
} from "../../../components/Toastify";
import { CPNetwork, Urls } from "../../../config";
import { Routes } from "../../../common";

const handleReset = async (
  code,
  phone_number,
  password,
  confirmPassword,
  club_id,
  navigation
) => {
  const data = { code, phone_number, password, confirmPassword, club_id };
  const errors = ResetPasswordValidation(data);

  if (Object.entries(errors).length !== 0) {
    const error = Object.keys(errors);
    return showWarningMessage(errors[error[0]]);
  }

  const response = await CPNetwork.post(Urls.ResetPassword, data);
  if (!response.ok) {
    return showErrorMessage("Failed to reset password");
  }
  showSuccessMessage("Password updated sucessfully!");
  navigation.navigate(Routes.LoginScreen);
};

export { handleReset };
