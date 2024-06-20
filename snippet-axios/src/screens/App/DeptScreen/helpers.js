import { config, CPNetwork, Urls } from "../../../config";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../components/Toastify";

const getDepartments = async () => {
  const response = await CPNetwork.get(
    Urls.GetDepartments,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load departments");
    return 0;
  }

  const { departments } = response.data;
  return departments;
};

const changeDepartment = async (id) => {
  const response = await CPNetwork.post(
    Urls.ChangeDepartment + id,
    {},
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to change the department");
    return 0;
  }

  showSuccessMessage("Department changed successfully!");
  return 1;
};

export { getDepartments, changeDepartment };
