import { showErrorMessage } from "../../../components/Toastify";
import { config, CPNetwork, Urls } from "../../../config";

const getFilterItems = async (id) => {
  const response = await CPNetwork.get(
    Urls.GetFilterItems + id,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load Items");
    return [];
  }

  const { items } = response.data;
  return items;
};

export { getFilterItems };
