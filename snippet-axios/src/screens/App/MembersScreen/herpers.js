import { showErrorMessage } from "../../../components/Toastify";
import { config, CPNetwork, Urls } from "../../../config";

const getMembers = async (offSet) => {
  const response = await CPNetwork.get(
    Urls.GetMembers + offSet,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load members");
    return [];
  }

  const { members } = response.data;
  return members;
};

const getFilters = async () => {
  const response = await CPNetwork.get(
    Urls.GetFilters,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to filters");
    return [];
  }

  const { filters } = response.data;
  return filters;
};

export { getMembers, getFilters };
