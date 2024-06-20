import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Colors, Icons, Routes } from '../common';
import CouponNavigation from './CouponNavigation';
import { ShopScreen } from '../screens/App';
import QRNavigation from './QRNavigation';
import LinearGradient from 'react-native-linear-gradient';
import LangKeys from '../i18n/translations/LangKeys';

const Tabs = createBottomTabNavigator();

const AppNavigation = () => {
  const { t } = useTranslation();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: styles.tabBarStyles,
      }}
    >
      <Tabs.Screen
        name={t(Routes.ShopStack)}
        component={ShopScreen}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <Icons.Fontisto
                name='shopping-store'
                size={size - 5}
                color={focused ? Colors.primary : Colors.grey}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name={Routes.QRScreen}
        component={QRNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => {
            return (
              <LinearGradient
                colors={[
                  'rgb(255, 190, 120)',
                  'rgb(234, 133, 20)',
                  'rgb(234, 133, 20)',
                  'rgb(255, 190, 120)',
                ]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.centerIconContainer}
              >
                <Icons.AntDesign name='qrcode' size={size} color={Colors.white} />
              </LinearGradient>
            );
          },
        }}
      />

      <Tabs.Screen
        name={t(Routes.CouponsStack)}
        component={CouponNavigation}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <Image
                source={
                  focused
                    ? require(`../assets/images/couponsActive.png`)
                    : require(`../assets/images/couponsInactive.png`)
                }
                style={{
                  objectFit: 'contain',
                  width: size + 5,
                  height: size + 5,
                }}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'transparent',
    height: 70,
    width: 70,
    borderRadius: 58,
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIconContainer: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: 70,
    borderRadius: 58,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 15,
    backgroundColor: Colors.primary,
  },
  centerImage: {
    width: 40,
    height: 40,
    tintColor: '#f1f6f9',
    alignContent: 'center',
  },
  tabBarStyles: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    position: 'absolute',
  },
});

export default AppNavigation;
