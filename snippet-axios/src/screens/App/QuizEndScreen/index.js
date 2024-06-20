import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import { useUser } from "../../../hooks";
import { Routes } from "../../../common";
import { Screen, Text } from "../../../components";
import { Button } from "../../../components/Buttons";
import { baseUrl } from "../../../config";

const QuizEndScreen = ({ navigation, route }) => {
  const { points, quizName } = route.params;
  const { user } = useUser();

  const PointsCount = () => {
    return (
      <View style={styles.pointsCountContainer}>
        <Image source={require("../../../../assets/Images/ic_dollar.png")} />
        <Text>{points}</Text>
      </View>
    );
  };
  return (
    <Screen>
      <View style={styles.container1}>
        <Text style={styles.txtStyles}>{quizName}</Text>
      </View>
      <View style={styles.conatiner2}>
        <Image
          source={
            user?.image
              ? { uri: baseUrl + user?.image }
              : require("../../../../assets/Images/ic_passport.png")
          }
          style={styles.imageStyles}
        />
        <Text>{user?.name}</Text>
        <Text style={styles.txtStyles2}>{user?.clubName}</Text>
      </View>
      <View style={styles.conatiner3}>
        <Text style={styles.txtStyles3}>Points Earned</Text>
        <PointsCount />
        <Button
          title={"Leaderboard"}
          gradient
          onPress={() => navigation.navigate(Routes.LeaderBoardScreen)}
        />
        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() => navigation.navigate(Routes.HomeScreen)}
        >
          <Text style={styles.txtStyles4}>More games</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default QuizEndScreen;
