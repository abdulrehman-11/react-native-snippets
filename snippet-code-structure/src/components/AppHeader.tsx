import React, { FC } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from '.';
import { Colors, Icons } from '../common';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  showLogo?: boolean;
  showBack?: boolean;
}

const AppHeader: FC<Props> = ({ title, showLogo = false, showBack = false }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {showBack ? (
          <Icons.Entypo
            name='chevron-thin-left'
            size={20}
            style={{ marginRight: 16 }}
            color={Colors.black}
            onPress={() => {
              // @ts-ignore
              navigation.goBack();
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.openDrawer();
            }}
          >
            <Image source={require('../assets/images/menu.png')} style={styles.menu} />
          </TouchableOpacity>
        )}

        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menu: {
    width: 30,
    height: 30,
    objectFit: 'contain',
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 20,
    color: Colors.darkSapphire,
  },
  logo: {
    width: 37,
    height: 37,
  },
});

export default AppHeader;
