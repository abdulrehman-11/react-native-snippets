import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, TextSizes, Icons} from '../../common';
import {useUser} from '../../hooks';
import {Ribbon, Text} from '../index';

const MemberCard = ({image, name, onPress, comments, memberStatusColor}) => {
  const {user} = useUser();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {comments && user && !user.is_receptionist ? (
        <View style={styles.commentContainer}>
          <Icons.MaterialCommunityIcons
            name="message-text-outline"
            color={Colors.yellow}
            size={20}
          />
          <Text style={styles.comments}>{comments}</Text>
        </View>
      ) : null}
      <View style={styles.dataContainer}>
        <Image source={{uri: image}} style={styles.image} resizeMode="cover" />
        <View style={{width: '45%', marginLeft: '5%'}}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      {!!memberStatusColor && <Ribbon color={memberStatusColor} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    width: '90%',
    alignItems: 'center',
    marginVertical: '3%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: '2%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  name: {
    fontFamily: Fonts.SemiBold,
    fontSize: TextSizes.SubHeading,
    color: Colors.WHITE,
    marginLeft: '3%',
  },
  image: {
    width: '35%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  comments: {
    color: Colors.yellow,
    fontSize: TextSizes.intermediateMediumText,
    marginLeft: 5,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 40,
    top: 10,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});

export default MemberCard;
