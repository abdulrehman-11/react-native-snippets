import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

const MiniOfflineSign = () => {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
};

const MiniOnlineSign = () => {
  return (
    <View style={styles.onlineContainer}>
      <Text style={styles.onlineText}>Internet Connected</Text>
    </View>
  );
};

const OfflineNotice = ({setIsInternetConnected}) => {
  const {isConnected, isInternetReachable} = useNetInfo();

  useEffect(() => {
    setIsInternetConnected(isConnected);
  }, [isConnected]);
  const [hide, setHide] = useState(true);
  useEffect(() => {
    if (isInternetReachable === true) setHide(true);
    setTimeout(() => {
      setHide(false);
    }, 3000);
  }, [isInternetReachable]);
  if (!isInternetReachable || !isConnected) {
    return <MiniOfflineSign />;
  }

  return hide && <MiniOnlineSign />;
};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },

  offlineText: {color: '#fff'},
  onlineContainer: {
    backgroundColor: 'green',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },

  onlineText: {color: '#fff'},
});

export default OfflineNotice;
