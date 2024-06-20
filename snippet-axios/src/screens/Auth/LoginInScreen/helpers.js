import { LoginValidation } from "../../../validations";
import {
  showErrorMessage,
  showWarningMessage,
} from "../../../components/Toastify";
import { CPNetwork, Urls, config } from "../../../config";

export const handleLogin = async (
  callingCode,
  phoneNumber,
  password,
  clubId
) => {
  const errors = LoginValidation({
    phone_number: phoneNumber,
    password,
    club_id: clubId,
  });

  if (Object.entries(errors).length) {
    const error = Object.keys(errors);
    showWarningMessage(errors[error[0]]);
    return 0;
  }

  const data = {
    phone_number: callingCode + phoneNumber,
    password,
    club_id: clubId,
  };

  const response = await CPNetwork.post(
    Urls.Login,
    data,
    (
      await config()
    ).headers
  );
  if (!response.ok) {
    return showErrorMessage(response.data.message);
  }

  return response.data;
};
