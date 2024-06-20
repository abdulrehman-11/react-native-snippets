import { Routes } from "../../../common";
import {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
} from "../../../components/Toastify";
import { SignUpValidation } from "../../../validations";
import { config, CPNetwork, Urls } from "../../../config";

const handleSignUp = async (
  name,
  username,
  countryCode,
  callingCode,
  phoneNumber,
  email,
  password,
  club_id,
  check,
  employeeTypeID
) => {
  const errors = SignUpValidation({
    name,
    phoneNumber,
    email,
    password,
    check,
    employee_type_id: employeeTypeID,
  });
  if (Object.entries(errors).length !== 0) {
    const error = Object.keys(errors);
    return showWarningMessage(errors[error[0]]);
  }

  const data = {
    name,
    user_name: username,
    phone_number: callingCode + phoneNumber,
    email,
    password,
    employee_type_id: employeeTypeID,
    club_id,
    calling_code: callingCode,
    country_code: countryCode,
  };

  const response = await CPNetwork.post(Urls.Register, data);
  if (!response.ok) {
    showErrorMessage(response.data.errors[0]);
    return 0;
  }

  return response.data;
};

const searchClub = async (name) => {
  const response = await CPNetwork.get(
    Urls.GetClub + name,
    (
      await config()
    ).headers
  );
  if (!response.ok) {
    showErrorMessage(response.data.errors);
    return -1;
  }

  const { club, employeeTypes } = response.data;

  const newEmployeeTypes = employeeTypes.map((item) => {
    return { label: item.name, value: item.id };
  });

  return { club, newEmployeeTypes };
};

export { handleSignUp, searchClub };
