import { showErrorMessage } from "../../../components/Toastify";
import { config, CPNetwork, Urls } from "../../../config";

const getLeaderBoard = async () => {
  const response = await CPNetwork.get(
    Urls.GetLeaderBoard,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load leaderboard data");
    return 0;
  }

  const { result } = response.data;
  return result;
};

export { getLeaderBoard };
