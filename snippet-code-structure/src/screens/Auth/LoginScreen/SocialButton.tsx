import React, {FC} from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';

import {Colors} from '../../../common';

interface Props {
  onPress: () => void;
  img: string;
}

const SocialButton: FC<Props> = ({onPress, img}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.googleContainer}>
        {/* @ts-ignore */}
        {img && <Image style={styles.imgGoogle} source={img} />}
        {/* <Text>Sign In with Google</Text> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  googleContainer: {
    backgroundColor: Colors.white,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 50,
  },
  imgGoogle: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
  },
});

export default SocialButton;
