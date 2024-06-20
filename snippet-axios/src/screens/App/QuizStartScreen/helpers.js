import { Routes } from "../../../common";
import { showErrorMessage } from "../../../components/Toastify";
import { config, CPNetwork, Urls } from "../../../config";

const getQuizQuestions = async (id) => {
  const response = await CPNetwork.get(
    Urls.GetQuizQuestions + id,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load quiz questions");
    return 0;
  }

  const { questions } = response.data;
  return questions;
};

const getQuizResult = async (id) => {
  const response = await CPNetwork.get(
    Urls.GetQuizResult + id,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    showErrorMessage("Failed to load quiz result");
    return 0;
  }

  const { quizResult } = response.data;
  return quizResult;
};

const EnterTheGame = async (quizResult, navigation, questions, name) => {
  const { quiz_id, question_no, points, attempts } = quizResult;

  const data = {
    question_no,
    points,
    attempts: attempts + 1,
  };

  const response = await CPNetwork.post(
    Urls.AddQuizResult + quiz_id,
    data,
    (
      await config()
    ).headers
  );

  if (!response.ok) {
    return showErrorMessage("Failed to enter the game");
  }

  navigation.navigate(Routes.QuizDetailScreen, {
    questions,
    name,
    quizResult: { ...quizResult, attempts: attempts + 1 },
  });
};

export { getQuizQuestions, getQuizResult, EnterTheGame };
