import React from "react";
import { View, ScrollView } from "react-native";

import styles from "./styles";
import { Screen, Text } from "../../../components";
import { AppHeader } from "../../../components/Headers";

const AboutUsScreen = () => {
  return (
    <Screen>
      <AppHeader title="About Us" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          The Club Passport App has been developed by Mark Schlake and his 30+
          years of involvement with technology solutions for private clubs.
        </Text>
        <Text style={styles.text}>
          If your club uses Jonas, Clubessential (ClubSoft) or Northstar
          Technologies then you are already familiar with Mark's work. Jonas's
          first website product, Clubhouse Online was developed with Mark's
          ClubSoft team in Kansas City. Then ClubSoft's Accounting and
          Point-of-Sale products were acquired by Clubessential. Mark recently
          was the VP of product Strategy at Northstar Technology.
        </Text>
        <Text style={styles.text}>
          And as before, Mark turned to technology for the answer, hence the
          Club Passport Mobile App, which unlocks that last mile between your
          Club Management System and your staff.
        </Text>
      </ScrollView>
      <View style={styles.container}></View>
    </Screen>
  );
};

export default AboutUsScreen;
