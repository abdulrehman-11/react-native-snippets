import React from "react";
import { TouchableOpacity, Image, ScrollView, View } from "react-native";
import { Routes } from "../../../common";

import styles from "./styles";
import { Field, Screen, Text } from "../../../components";
import { AppHeader } from "../../../components/Headers";

const RezCategoryScreen = ({ navigation, route }) => {
  const { res } = route.params;

  return (
    <Screen>
      <AppHeader title="Reservation Detail" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: res?.image }} style={styles.personImage} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Routes.MembersDetailScreen, {
              id: res.member_id,
            })
          }
          style={styles.nameContainer}
        >
          <Text style={styles.name}>{res?.memberName}</Text>
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          <Text style={styles.title}>Location</Text>
          <View style={styles.locationSubContainer}>
            <Text>{res?.location}</Text>
          </View>
        </View>

        <Field title="Time" value={res?.timing} />
        <Field title="Placement" value={res?.table} />
        <Field title="Employee" value={res?.employee} />
        <Field title="Size" value={res?.seats} />
        <Field title="Notes" value={res?.notes} />
      </ScrollView>
    </Screen>
  );
};

export default RezCategoryScreen;
