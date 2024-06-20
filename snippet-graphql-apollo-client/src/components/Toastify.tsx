import {showMessage} from 'react-native-flash-message';

const showSuccessMessage = (message: string) => {
  return showMessage({
    message,
    type: 'success',
  });
};
const showWarningMessage = (message: string) => {
  return showMessage({
    message,
    type: 'warning',
  });
};

const showInfoMessage = (message: string) => {
  return showMessage({
    message,
    type: 'info',
  });
};

const showErrorMessage = (message: string) => {
  return showMessage({
    message,
    type: 'danger',
  });
};

export {
  showErrorMessage,
  showSuccessMessage,
  showInfoMessage,
  showWarningMessage,
};
