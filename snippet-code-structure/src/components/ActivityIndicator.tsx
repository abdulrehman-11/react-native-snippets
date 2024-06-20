import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import {Colors} from '../common';

interface Props {
  visible: boolean;
}

const ActivityIndicator: FC<Props> = ({visible = false}) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animation/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0.8,
  },
});

export default ActivityIndicator;
