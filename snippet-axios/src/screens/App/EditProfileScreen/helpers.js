import {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
} from '../../../components/Toastify';
import {config, CPNetwork, Urls} from '../../../config';
import {UpdateProfileValidation} from '../../../validations';

const handleUpdateProfile = async (
  newImage,
  name,
  email,
  username,
  phoneNumber,
  callingCode,
  countryCode,
  password,
  user_notification_id,
) => {
  const data = {name, phoneNumber};

  const errors = UpdateProfileValidation(data);
  if (Object.entries(errors).length !== 0) {
    const error = Object.keys(errors);
    return showWarningMessage(errors[error[0]]);
  }

  let values = {
    name,
    phone_number: callingCode + phoneNumber,
    calling_code: callingCode,
    country_code: countryCode,
    user_name: username,
    email,
  };

  if (newImage) {
    values.image = newImage;
  }
  if (password) {
    values.password = password;
  }
  if (user_notification_id) {
    values.user_notification_id = user_notification_id;
  }
  const response = await CPNetwork.patch(
    Urls.UpdateProfile,
    values,
    (
      await config()
    ).headers,
  );

  if (!response.ok) {
    showErrorMessage('Failed to update the profile');
    return 0;
  }

  const {user} = response.data;
  showSuccessMessage('Profile Updated');
  return user;
};

export {handleUpdateProfile};
