import React, { useState } from "react";
import { View, StyleSheet, Modal, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors, Routes, TextSizes } from "../../common";
import { Screen, Text, ActivityIndicator } from "../../components";
import { Button } from "../../components/Buttons";
import { config, CPNetwork, Urls } from "../../config";

const ResultModal = ({
  visible,
  setVisible,
  correct,
  answer,
  points,
  questionIndex,
  setQuestionIndex,
  setPoints,
  totalQuestions,
  setSelectedAnswer,
  quizName,
  quizResult,
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    let currentPoints = points;
    if (correct) {
      currentPoints++;
      setPoints(points + 1);
    }

    const { quiz_id, attempts } = quizResult;
    const data = {
      question_no: questionIndex + 1,
      points: currentPoints,
      attempts,
    };
    setLoading(true);
    const response = await CPNetwork.post(
      Urls.AddQuizResult + quiz_id,
      data,
      (
        await config()
      ).headers
    );
    setLoading(false);
    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setVisible(false);
      setSelectedAnswer(null);
      navigation.navigate(Routes.QuizEndScreen, {
        points: currentPoints,
        quizName: quizName,
      });
    }

    setSelectedAnswer(null);
    setVisible(false);
  };

  const renderWrongAnswerText = () => (
    <>
      <Text style={styles.text}>Oops</Text>
      <Text style={styles.text}>Sorry better luck next time.</Text>
    </>
  );

  const renderCorrectAnswerText = () => (
    <>
      <Text style={styles.text}>Awesome</Text>
      <Text style={styles.text}>Congrats</Text>
    </>
  );

  return (
    <Modal visible={visible}>
      <ActivityIndicator visible={loading} />
      <Screen>
        <Image
          source={
            correct
              ? require("../../../assets/Images/correctCircleWithStars.png")
              : require("../../../assets/Images/wrongCircle.png")
          }
          style={correct ? styles.correctImage : styles.image}
        />
        <View style={styles.container}>
          {correct ? renderCorrectAnswerText() : renderWrongAnswerText()}
        </View>

        <Text style={{ alignSelf: "center" }}>Correct answer is:</Text>
        <Text style={styles.answer}> {answer}</Text>

        <Text style={styles.points}>
          Your Total Points: {correct ? points + 1 : points}
        </Text>
        <Button gradient title="Next" onPress={handlePress} />
      </Screen>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "10%",
  },
  text: {
    color: Colors.blue,
  },
  answer: {
    fontSize: TextSizes.SubHeading,
    color: Colors.RED,
    alignSelf: "center",
    marginBottom: "5%",
    textAlign: "center",
  },
  points: {
    color: Colors.blue,
    alignSelf: "center",
    marginBottom: "5%",
    fontSize: TextSizes.SubHeading,
  },
  image: {
    marginLeft: "17%",
    marginTop: "20%",
  },
  correctImage: {
    marginLeft: "22%",
    marginTop: "20%",
  },
});

export default ResultModal;
