import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";

import {
  ActivityIndicator,
  Screen,
  SearchBox,
  Text,
} from "../../../components";
import { Routes } from "../../../common";
import { MemberCard } from "../../../components/Cards";
import { AppHeader } from "../../../components/Headers";
import { recreateUrl } from "../../../utils/helpers";
import { getFilterItems } from "./helpers";
import styles from "./styles";

const FilterItemScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [filteredItems, setFilteredItems] = useState([]);
  const [searched, setSearched] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getFilterItems(id);
      setLoading(false);
      setFilteredItems(result);
    })();
  }, []);

  const handleSearch = (keyWords) => {
    setSearched(
      filteredItems.filter((item) =>
        item.name.toLowerCase().includes(keyWords.toLowerCase())
      )
    );
  };

  const List = ({ data }) => {
    if (!data.length) {
      return <Text style={styles.noText}>No Items</Text>;
    }

    return data.map((item) => {
      return (
        <MemberCard
          key={item.id}
          image={recreateUrl(item.image)}
          name={item.name}
          onPress={() =>
            navigation.navigate(Routes.ItemDetailScreen, {
              id: item.id,
            })
          }
        />
      );
    });
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <View style={styles.container}>
          <AppHeader title="Grouped Items" />
          <SearchBox
            value={search}
            onClearPress={() => {
              setSearch("");
              setSearched([]);
            }}
            onChangeText={(text) => {
              handleSearch(text);
              setSearch(text);
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <List data={search ? searched : filteredItems} />
            <View style={{ marginTop: 100 }} />
          </ScrollView>
        </View>
      </Screen>
    </>
  );
};

export default FilterItemScreen;
