import { useContext } from "react";

import useDepartmentId from "./useDepartmentId";
import { storeUser } from "../utils/storage";
import { UserContext } from "../context";
import { config, CPNetwork, Urls } from "../config";
import { showErrorMessage } from "../components/Toastify";

const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  const { setDepartmentId } = useDepartmentId();

  const saveUser = async (user) => {
    setUser(user);
    setDepartmentId(user.employee_type_id);
    await storeUser(JSON.stringify(user));
  };

  const GetUser = async () => {
    const response = await CPNetwork.get(
      Urls.GetUser,
      (
        await config()
      ).headers
    );

    if (!response.ok) {
      return showErrorMessage("Failed to load user data");
    }
    setUser(response.data.user);
  };
  return { user, saveUser, GetUser };
};

export default useUser;
