import React, {FC} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from '.';
import {Colors} from '../common';

interface FooterProps {
  title: string;
  highlightTitle: string;
  onPress: () => void;
}

const Footer: FC<FooterProps> = ({title, highlightTitle, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <Image
          style={styles.imgVector}
          source={require('../assets/images/Vector.png')}
        />
      </View>
      <View style={styles.accountContainer}>
        <Text>{title} </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{color: Colors.primary}}>{highlightTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  accountContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 2,
  },
  imgVector: {
    width: '30%',
    height: 2,
  },
  divider: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Footer;
