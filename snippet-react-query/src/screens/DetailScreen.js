/** @format */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useItem, useCreateItem, useUpdateItem } from "../hooks/useItems";
import ItemForm from "../components/ItemForm";

const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const itemId = route.params?.id;
  const { data, isLoading } = useItem(itemId);
  const createItem = useCreateItem();
  const updateItem = useUpdateItem(itemId);

  const handleSubmit = (item) => {
    if (itemId) {
      updateItem.mutate(item, {
        onSuccess: () => navigation.goBack(),
      });
    } else {
      createItem.mutate(item, {
        onSuccess: () => navigation.goBack(),
      });
    }
  };

  if (isLoading && itemId)
    return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ItemForm onSubmit={handleSubmit} initialData={data || {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default DetailScreen;
