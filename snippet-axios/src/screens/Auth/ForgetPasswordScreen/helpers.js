import { Routes } from "../../../common";
import {
  showErrorMessage,
  showWarningMessage,
} from "../../../components/Toastify";
import { CPNetwork, Urls } from "../../../config";

const handleNext = async (callingCode, phoneNumber, club_id, navigation) => {
  if (!phoneNumber) return showWarningMessage("Enter your phone number");
  if (!club_id) return showWarningMessage("Enter Club Id");

  const response = await CPNetwork.post(Urls.ForgotPassword, {
    phone_number: callingCode + phoneNumber,
    club_id: club_id.toUpperCase(),
  });

  if (!response.ok) {
    return showErrorMessage(response.data.errors);
  }

  const { code } = response.data;
  navigation.navigate(Routes.CodeVerificationScreen, {
    code,
    phone_number: callingCode + phoneNumber,
    club_id,
  });
};

export { handleNext };
