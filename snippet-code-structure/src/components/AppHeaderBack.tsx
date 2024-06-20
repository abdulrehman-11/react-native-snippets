import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import CouponPoints from './CouponPoints';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../hooks';

const AppHeaderBack: FC = () => {
  const navigation = useNavigation();
  const {user} = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/images/chevron-left.png')}
          style={styles.img}
        />
      </TouchableOpacity>
      <CouponPoints points={user?.wallets.CP_TOKEN} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    position: 'absolute',
    top: Platform.OS === 'ios' ? '5%' : '2%',
    zIndex: 10,
    backgroundColor: 'transparent',
    width: '100%',
    padding: 16,
    alignSelf: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 24,
    height: 24,
    objectFit: 'contain',
  },
});

export default AppHeaderBack;
