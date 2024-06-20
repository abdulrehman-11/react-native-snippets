import { useContext } from "react";
import { NotificationContext } from "../context";

const useNotifications = () => {
  const { hasNotifications, setHasNotifications } =
    useContext(NotificationContext);

  return { hasNotifications, setHasNotifications };
};

export default useNotifications;
