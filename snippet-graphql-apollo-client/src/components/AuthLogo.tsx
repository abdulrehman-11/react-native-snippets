import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';

const AuthLogo: FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../assets/images/LogoImage.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
});

export default AuthLogo;
