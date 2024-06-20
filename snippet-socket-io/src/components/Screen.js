import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Colors from '../common/Colors';

const Screen = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBackgroundColor,
    flex: 1,
  },
});

export default Screen;
