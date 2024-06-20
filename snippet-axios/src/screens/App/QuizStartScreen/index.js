import React, { useState, useEffect } from "react";
import { View, Image, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { Screen, Text, ActivityIndicator } from "../../../components";
import { Button } from "../../../components/Buttons";
import { AuthHeader } from "../../../components/Headers";
import { showWarningMessage } from "../../../components/Toastify";
import { getQuizQuestions, getQuizResult, EnterTheGame } from "./helpers";
import styles from "./styles";

const QuizStartScreen = ({ navigation, route }) => {
  const { quiz } = route.params;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizResult, setQuizResult] = useState();
  const focused = useIsFocused();

  useEffect(() => {
    focused &&
      (async () => {
        setLoading(true);
        const result = await getQuizQuestions(quiz?.id);
        if (result) setQuestions(result);
        const res = await getQuizResult(quiz?.id);
        if (res) setQuizResult(res);
        setLoading(false);
      })();
  }, [focused]);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AuthHeader title="Game Details" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.txtStyles}>
              Your Ticket to the Gamification of Learning
            </Text>
          </View>
          <Image
            source={require("../../../../assets/Images/cpa_small_logo.png")}
            style={styles.imageStyles}
          />
          <Text style={styles.txtStyles2}>Instruction for game</Text>

          {quiz?.quiz_description && (
            <Text style={styles.description}>{quiz?.quiz_description}</Text>
          )}

          <Text style={styles.quizTime}>
            Attempts: {quiz?.is_one_time ? "1" : "unlimited"}
          </Text>

          <Button
            title={"Enter The Game"}
            gradient
            onPress={async () => {
              if (
                quiz.is_one_time &&
                quiz.is_one_time === quizResult.attempts
              ) {
                return showWarningMessage("You can not play this quiz again!");
              }

              setLoading(true);
              await EnterTheGame(
                quizResult,
                navigation,
                questions,
                quiz.heading
              );
              setLoading(false);
            }}
          />
        </ScrollView>
      </Screen>
    </>
  );
};

export default QuizStartScreen;
