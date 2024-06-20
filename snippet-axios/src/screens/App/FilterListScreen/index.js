import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

import { Screen, ActivityIndicator, Text } from "../../../components";
import { Routes } from "../../../common";
import { getGroups } from "./helpers";
import { FilterCard } from "../../../components/Cards";
import { AppHeader } from "../../../components/Headers";
import styles from "./styles";

const FilterListScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getGroups(type);
      setLoading(false);
      setGroups(result);
    })();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AppHeader title="Groups" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {groups.length ? (
            groups.map((item, key) => {
              return (
                <FilterCard
                  key={key}
                  name={item.filter}
                  image={item.filter_image}
                  onPress={() =>
                    navigation.navigate(
                      type !== "item"
                        ? Routes.FilteredMemberScreen
                        : Routes.FilteredItemsScreen,
                      {
                        id: item.id,
                      }
                    )
                  }
                />
              );
            })
          ) : (
            <Text style={styles.noData}>No groups added</Text>
          )}
        </ScrollView>
      </Screen>
    </>
  );
};

export default FilterListScreen;
