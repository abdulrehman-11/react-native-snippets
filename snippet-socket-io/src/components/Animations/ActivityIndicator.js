import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const ActivityIndicator = ({visible}) => {
  if (!visible) return null;

  return (
    <View style={styles.animation}>
      <LottieView
        autoPlay
        source={require('../../common/animations/loader.json')}
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    opacity: 0.8,
    backgroundColor: 'grey',
  },
});

export default ActivityIndicator;
