import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import {Screen} from '../../components';

const SplashScreen = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../Images/RoofingLogo.png')}
        />
      </View>
    </Screen>
  );
};

export default SplashScreen;
