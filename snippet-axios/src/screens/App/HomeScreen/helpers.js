import { config, CPNetwork, Urls } from "../../../config";
import { showErrorMessage } from "../../../components/Toastify";
import { Routes } from "../../../common";

const getGames = async (id) => {
  const response = await CPNetwork.get(
    Urls.GetGames + id,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load games");
    return 0;
  }

  const { games } = response.data;
  return games;
};

const getContentInfo = async (id) => {
  const response = await CPNetwork.get(
    Urls.GetContentInfo + id,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load the content information");
    return 0;
  }

  const { contentInfos } = response.data;
  return contentInfos;
};

const handleRestart = async (quiz, navigation) => {
  const data = {
    question_no: 0,
    points: 0,
    attempts: quiz.attempts + 1,
  };

  const response = await CPNetwork.post(
    Urls.AddQuizResult + quiz.id,
    data,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    return showErrorMessage("Failed to restart the game");
  }
  navigation.navigate(Routes.QuizStartScreen, { quiz });
};

const getNotificationsCount = async () => {
  const response = await CPNetwork.get(
    Urls.GetNotificationsCount,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    return 0;
  }

  const { notifications } = response.data;
  return notifications;
};

export { getGames, handleRestart, getContentInfo, getNotificationsCount };
