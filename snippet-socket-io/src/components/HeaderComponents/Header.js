import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';

import FlagCustom from './FlagCustom';
import {useNavigation} from '@react-navigation/native';
import Avatar from './Avatar';
import {Colors} from '../../common';
import {useAuth, useNotify} from '../../hooks';

const Header = () => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState('none');
  const {currentUser} = useAuth();
  const {notification} = useNotify();
  const [notificationsNumber, setNotificationsNumber] = useState(0);

  useEffect(() => {
    calculateUnreadNotifications();
  }, [notification]);
  Feather.loadFont();
  const calculateUnreadNotifications = () => {
    let tempNum = 0;

    notification?.map(item => {
      if (item?.isRead) {
        return;
      }
      return (tempNum += 1);
    });
    setNotificationsNumber(tempNum);
  };
  return (
    <View style={styles.container}>
      <Feather
        name="menu"
        color={Colors.gray}
        size={30}
        onPress={() => {
          navigation.openDrawer();
          setToggle('none');
        }}
      />
      <FlagCustom setToggle={setToggle} toggle={toggle} />
      <TouchableOpacity style={styles.bellIcon}>
        <Feather
          name="bell"
          color={Colors.gray}
          size={25}
          onPress={() => {
            navigation.navigate('Notifications');
            setToggle('none');
          }}
        />
        {notificationsNumber !== 0 ? (
          <View style={styles.notifyContainer}>
            <Text style={styles.text}>{notificationsNumber}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
      <View style={styles.avatar}>
        <View>
          <Text style={styles.name}>{currentUser?.name}</Text>
          <Text style={styles.userText}>User</Text>
        </View>
        <Avatar
          setToggle={setToggle}
          toggle={toggle}
          onPress={() => {
            navigation.navigate('ChangePassword');
            setToggle('none');
          }}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    zIndex: 9,
  },
  bellIcon: {
    marginLeft: 20,
    paddingHorizontal: 2,
  },
  avatar: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameText: {
    color: Colors.black,
  },
  name: {
    color: Colors.black,
  },
  userText: {
    fontSize: 13,
    color: Colors.gray,
    textAlign: 'center',
  },
  notifyContainer: {
    minWidth: 16,
    minHeight: 17,
    position: 'absolute',
    backgroundColor: Colors.red,
    padding: 1,
    paddingHorizontal: 1.5,
    right: -4,
    top: -4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
