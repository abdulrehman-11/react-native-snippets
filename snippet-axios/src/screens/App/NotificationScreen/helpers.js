import { showErrorMessage } from "../../../components/Toastify";
import { config, CPNetwork, Urls } from "../../../config";

const getNotifications = async () => {
  const response = await CPNetwork.get(
    Urls.GetNotifications,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to laod notifications");
    return 0;
  }

  const { notifications } = response.data;
  return notifications;
};

const clearAll = async () => {
  const response = await CPNetwork.post(
    Urls.MarkReadNotifications,
    {},
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to clear the notifications");
    return 0;
  }

  return 1;
};

export { clearAll, getNotifications };
