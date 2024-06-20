import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { Colors } from "../common";

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={{ ...styles.container, ...style }}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});

export default Screen;
