import React from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';

import {Colors, Fonts, TextSizes} from '../../common';
import {Ribbon, Text} from '../index';

const RezCard = ({
  name,
  time,
  onPress,
  image,
  location,
  placement,
  employee,
  memberStatusColor,
}) => {
  const CardInfo = ({label, value}) => {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.dataContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.informationContainer}>
          <Text style={styles.name}>{name}</Text>
          <CardInfo label="Time" value={time} />
          <CardInfo label="Location" value={location} />
          <CardInfo label="Placement" value={placement} />
          {!!employee && <CardInfo label="Employee" value={employee} />}
        </View>
      </View>
      {!!memberStatusColor && <Ribbon color={memberStatusColor} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: 10,
    paddingVertical: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  dataContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationContainer: {
    marginLeft: 10,
    width: '60%',
    marginVertical: 10,
  },
  name: {
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
  },
  value: {
    fontSize: TextSizes.mediumText,
    color: Colors.bettingMCQPageShadow,
  },
  label: {
    color: Colors.WHITE,
    fontSize: TextSizes.smallText,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RezCard;
