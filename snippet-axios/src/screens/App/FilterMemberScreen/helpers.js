import { showErrorMessage } from "../../../components/Toastify";
import { config, CPNetwork, Urls } from "../../../config";

const getFilterMembers = async (id) => {
  const response = await CPNetwork.get(
    Urls.GetFilterMembers + id,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load");
    return [];
  }

  const { members } = response.data;
  return members;
};

export { getFilterMembers };
