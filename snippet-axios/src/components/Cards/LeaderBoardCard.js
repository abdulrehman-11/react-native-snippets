import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {Colors} from '../../common';
import {Text} from '../index';

const LeaderBoardCard = ({name, points}) => {
  return (
    <View style={styles.container}>
      <View style={styles.highlighter} />
      <View style={styles.dataContainer}>
        <Text>{name}</Text>
        <View style={styles.pointsContainer}>
          <Image
            style={{marginRight: '2%'}}
            source={require('../../../assets/Images/ic_coins.png')}
          />
          <Text>+{points !== null ? points : 0}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.darkBlue,
    height: 70,
    flexDirection: 'row',
    marginVertical: 10,
  },
  pointsContainer: {
    flexDirection: 'row',
  },
  highlighter: {
    backgroundColor: Colors.darkBlue,
    height: '100%',
    width: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  dataContainer: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '5%',
  },
});

export default LeaderBoardCard;
