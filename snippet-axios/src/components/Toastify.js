import { showMessage } from "react-native-flash-message";

const showSuccessMessage = (message) => {
  showMessage({
    message,
    type: "success",
    icon: "success",
  });
};

const showErrorMessage = (message) => {
  showMessage({
    message,
    type: "danger",
    icon: "danger",
  });
};

const showWarningMessage = (message) => {
  showMessage({
    message,
    type: "warning",
    icon: "warning",
  });
};

const showInfoMessage = (message) => {
  showMessage({
    message,
    type: "info",
    icon: "info",
  });
};

export {
  showSuccessMessage,
  showErrorMessage,
  showInfoMessage,
  showWarningMessage,
};
