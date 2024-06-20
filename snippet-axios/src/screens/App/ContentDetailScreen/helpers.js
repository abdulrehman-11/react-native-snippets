import { showErrorMessage } from "../../../components/Toastify";
import { config, CPNetwork, Urls } from "../../../config";

const getContentDetail = async (id) => {
  const response = await CPNetwork.get(
    Urls.GetSingleContentInfo + id,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load the content detail");
    return 0;
  }

  const { contentInfo } = response.data;

  return contentInfo;
};

export { getContentDetail };
