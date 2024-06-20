/** @format */

import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useItems, useDeleteItem } from "../hooks/useItems";

const HomeScreen = ({ navigation }) => {
  const { data, error, isLoading } = useItems();
  const deleteItem = useDeleteItem();

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Button
        title="Add New Item"
        onPress={() => navigation.navigate("Detail")}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Edit"
                onPress={() => navigation.navigate("Detail", { id: item.id })}
              />
              <Button
                title="Delete"
                onPress={() => deleteItem.mutate(item.id)}
              />
            </View>
          </View>
        )}
      />
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
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginVertical: 20,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default HomeScreen;
