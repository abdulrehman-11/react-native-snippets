import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, Icons} from '../../../common';

const FloatButton = ({onPress, onMicPress}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icons.MaterialCommunityIcons
          name="message-text-outline"
          color={Colors.WHITE}
          size={20}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onMicPress} style={styles.container2}>
        <Icons.FontAwesome5 name="microphone" size={25} color={Colors.WHITE} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.blue,
    position: 'absolute',
    bottom: '5%',
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.blue,
    position: 'absolute',
    bottom: '15%',
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatButton;
