import { showErrorMessage } from "../../../components/Toastify";
import { config, CPNetwork, Urls } from "../../../config";

const getGroups = async (type) => {
  const url =
    type === "member"
      ? Urls.GetFilters
      : type === "item"
      ? Urls.GetItemFilters
      : Urls.GetSportGroupMembers;

  const response = await CPNetwork.get(url, (await config()).headers);

  if (!response.ok) {
    showErrorMessage("Failed to load data");
    return [];
  }

  const { filters } = response.data;
  return filters;
};

export { getGroups };
