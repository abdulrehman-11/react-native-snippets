import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';

import {Text} from '.';
import {Colors, Fonts} from '../common';

interface Props {
  message: string;
}

const NoData: FC<Props> = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.noMessage}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '25%',
  },
  noMessage: {
    fontSize: 12,
    color: Colors.lightGray,
    fontFamily: Fonts.SemiBold,
  },
});

export default NoData;
