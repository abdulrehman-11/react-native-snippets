import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import {Colors} from '../common';
import {Text} from '.';

const ActivityIndicator = ({visible = false}) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      {/* <LottieView
        source={require("../../assets/animations/loader.json")}
        autoPlay
        loop
      /> */}

      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0.8,
  },

  loading: {
    color: Colors.darkBlue,
    fontSize: 40,
    alignSelf: 'center',
    marginTop: '90%',
  },
});

export default ActivityIndicator;
