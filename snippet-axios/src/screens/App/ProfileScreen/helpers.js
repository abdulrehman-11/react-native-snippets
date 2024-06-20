import { CPNetwork, Urls } from "../../../config";
import { showErrorMessage } from "../../../components/Toastify";

const deleteMyAccount = async (id) => {
  const response = await CPNetwork.delete(Urls.DeleteAccount + id);

  if (!response.ok) {
    showErrorMessage("Failed to delete your account");
    return 0;
  }

  return 1;
};

export { deleteMyAccount };
